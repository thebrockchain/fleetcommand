// SCOUT's market lens: real Google results through SerpApi.
//
// WHY THIS EXISTS. The site snapshot tells SCOUT what the target IS. It cannot
// tell SCOUT what the target is UP AGAINST. Real reconnaissance is both. This
// module supplies the second half: who actually ranks for the work this target
// wants, and what buyers are actually asking. That is a search problem, and
// SerpApi is the search layer.
//
// ON-SWITCH (fleet pattern). Real searches run only when SERPAPI_KEY is armed as
// a Pages secret. Until then SCOUT is handed a SAMPLE and every surface says so.
// The sample is NOT a recording of a live SerpApi call. It is shape-accurate
// placeholder data in the same fictional world as the target, and it is never
// presented as real. Arm the key and the same code path returns real results.
//   npx wrangler pages secret put SERPAPI_KEY
//
// QUOTA DISCIPLINE. SerpApi's free plan is 100 searches a month. This is a
// public page with a Run button on it, so one uncached search per mission would
// burn the month in an afternoon. The query is fixed and the result is cached in
// KV for 12 hours, which holds real usage near 60 searches a month worldwide no
// matter how many people press the button. If the KV binding is missing the
// module still works, it just stops being cheap, so the binding is checked and
// never assumed.

const ENDPOINT = 'https://serpapi.com/search.json';

// Derived from the target's own trade, not hardcoded trivia: Harbor Lane is a
// bakery whose order route is broken, so the market question that matters is
// who is winning bakery ordering.
export const MARKET_QUERY = 'bakery online ordering';

const CACHE_KEY = 'market:v1:' + MARKET_QUERY;
const CACHE_TTL = 43200; // 12 hours, in seconds
const TIMEOUT_MS = 8000;

// Sample, not a recording. Fictional competitors to match the fictional target,
// so nothing invented can ever be mistaken for real search data.
export const MARKET_SAMPLE = {
  query: MARKET_QUERY,
  competitors: [
    { position: 1, title: 'Stonemill Bread Co. - Order ahead, pick up in 20 minutes', link: 'https://example.com/stonemill', snippet: 'Order online for pickup or local delivery. Live order tracking and same day slots.' },
    { position: 2, title: 'Corner Loaf - Online Bakery Ordering', link: 'https://example.com/cornerloaf', snippet: 'Skip the line. Pay in the browser, collect at the counter. Open Sundays.' },
    { position: 3, title: 'How small bakeries take orders online in 2026', link: 'https://example.com/guide', snippet: 'A guide to order forms, payment links and pickup scheduling for independent shops.' },
  ],
  questions: [
    'How do I set up online ordering for a small bakery?',
    'Do customers abandon bakery order forms?',
    'What hours should a bakery publish online?',
  ],
};

// Keep only what SCOUT can actually use, and cap it. The raw SerpApi payload is
// large; sending all of it into a 500 token completion would crowd out the work.
// Exported so tools/test-market.mjs can prove the success branch without a key.
export function shape(data) {
  const competitors = (Array.isArray(data.organic_results) ? data.organic_results : [])
    .slice(0, 3)
    .map((r, i) => ({
      position: typeof r.position === 'number' ? r.position : i + 1,
      title: String(r.title || 'untitled').slice(0, 120),
      link: String(r.link || ''),
      snippet: String(r.snippet || '').slice(0, 160),
    }));
  const questions = (Array.isArray(data.related_questions) ? data.related_questions : [])
    .map(q => q && q.question)
    .filter(q => typeof q === 'string' && q.length)
    .slice(0, 3)
    .map(q => q.slice(0, 140));
  return { query: MARKET_QUERY, competitors, questions };
}

function sample(env, note) {
  const base = { source: 'sample', cache: env.MARKET_CACHE ? 'kv' : 'none', ...MARKET_SAMPLE };
  return note ? { ...base, note } : base;
}

// Returns { source: 'live' | 'sample', cache: 'kv' | 'none', cached?: boolean,
//           note?: string, query, competitors[], questions[] }. Never throws and
// never blocks the mission: if search is unavailable for any reason SCOUT still
// runs, on sample. `cache` reports whether the quota guard is actually bound in
// this environment, because a cache everyone assumes exists is not a guard.
export async function marketIntel(env) {
  const cache = env.MARKET_CACHE || null;
  const where = cache ? 'kv' : 'none';

  if (!env.SERPAPI_KEY) return sample(env);

  if (cache) {
    try {
      const hit = await cache.get(CACHE_KEY, 'json');
      if (hit && Array.isArray(hit.competitors)) return { source: 'live', cache: where, cached: true, ...hit };
    } catch {
      // A cache read failure is not a mission failure. Fall through and search.
    }
  }

  const url = new URL(ENDPOINT);
  url.searchParams.set('engine', 'google');
  url.searchParams.set('q', MARKET_QUERY);
  url.searchParams.set('hl', 'en');
  url.searchParams.set('gl', 'us');
  url.searchParams.set('api_key', env.SERPAPI_KEY);

  let data;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) return sample(env, 'serpapi returned ' + res.status + ', sample served');
    data = await res.json();
  } catch {
    return sample(env, 'serpapi unreachable, sample served');
  }

  // SerpApi reports quota exhaustion and bad keys in the body with HTTP 200.
  if (data && data.error) return sample(env, 'serpapi: ' + String(data.error).slice(0, 120));

  const out = shape(data || {});
  if (!out.competitors.length) return sample(env, 'serpapi returned no results, sample served');

  if (cache) {
    try {
      await cache.put(CACHE_KEY, JSON.stringify(out), { expirationTtl: CACHE_TTL });
    } catch {
      // Losing the cache write costs a search next time, not this mission.
    }
  }
  return { source: 'live', cache: where, cached: false, ...out };
}

// Compact text for SCOUT's prompt. The honesty label goes in the block itself so
// the model cannot mistake sample data for live data and report it as fact.
export function formatMarket(m) {
  const lines = [
    m.source === 'live'
      ? 'MARKET SEARCH (live Google results via SerpApi):'
      : 'MARKET SEARCH (SAMPLE data, no live search key armed, treat as illustrative):',
    'Query: ' + m.query,
  ];
  if (m.competitors.length) {
    lines.push('Who ranks for it:');
    for (const c of m.competitors) lines.push('  ' + c.position + '. ' + c.title + ' - ' + c.snippet);
  }
  if (m.questions.length) {
    lines.push('What buyers ask:');
    for (const q of m.questions) lines.push('  - ' + q);
  }
  return lines.join('\n');
}

// The same intel rendered for the mission console, so a visitor sees the search
// layer working and not just its effect on SCOUT's prose.
export function marketRows(m) {
  const rows = m.competitors.map(c => c.position + '. ' + c.title);
  for (const q of m.questions) rows.push('? ' + q);
  return rows;
}
