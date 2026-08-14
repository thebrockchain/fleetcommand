// SHIP's pre-deploy domain check, through the name.com API.
//
// WHY THIS EXISTS. SHIP stages a deploy and names the risks before a human
// decides. "Where does this actually land" is one of those risks, and for a
// small business it is the one nobody checks: the crew is about to ship an
// ORDERING flow onto a site whose own name may not belong to the owner. A shop
// taking payments on a name it does not hold is a real exposure, and it is
// exactly the kind of thing a deploy agent should surface at the gate rather
// than after the fact.
//
// So before SHIP stages, it asks name.com whether the target's own name is
// still sitting unregistered, and reports what it finds as part of the risk
// summary the human reads.
//
// AVAILABLE IS NOT CLEAR. `purchasable` from a registrar means registrable, not
// safe to use. Trademark is a separate question and this crew does not answer
// it. SHIP is instructed to say so rather than tell anyone a name is theirs.
//
// ON-SWITCH (fleet pattern): real lookups run only when NAMECOM_USER and
// NAMECOM_TOKEN are both armed as Pages secrets. Until then SHIP gets clearly
// labelled SAMPLE data and every surface says so.
//   npx wrangler pages secret put NAMECOM_USER
//   npx wrangler pages secret put NAMECOM_TOKEN
// Set NAMECOM_ENV=dev to point at the sandbox host instead of production.
//
// QUOTA: one lookup per mission at most, and the candidate list is fixed, so the
// result caches in KV for 12 hours exactly like the market lens. A public Run
// button never turns into a stream of registrar calls.

const HOST_PROD = 'https://api.name.com';
const HOST_DEV = 'https://api.dev.name.com';
const PATH = '/core/v1/domains:checkAvailability';

// Derived from the target's own trading name. The crew is shipping an order
// flow for Harbor Lane Bakery, so the question is whether Harbor Lane Bakery
// owns Harbor Lane Bakery.
export const CANDIDATES = [
  'harborlanebakery.com',
  'harborlane.bakery',
  'harborlanebakery.shop',
];

const CACHE_KEY = 'domains:v1:' + CANDIDATES.join(',');
const CACHE_TTL = 43200; // 12 hours
const TIMEOUT_MS = 8000;

// Sample, not a recording. Fictional target, fictional posture, and it is never
// presented as a real registrar answer.
export const DOMAIN_SAMPLE = {
  candidates: [
    { domainName: 'harborlanebakery.com', purchasable: true, premium: false, purchasePrice: 12.99 },
    { domainName: 'harborlane.bakery', purchasable: true, premium: false, purchasePrice: 34.99 },
    { domainName: 'harborlanebakery.shop', purchasable: false, premium: false },
  ],
};

// Exported so tools/test-domains.mjs can prove the success branch without a key.
export function shape(data) {
  const rows = (Array.isArray(data.results) ? data.results : [])
    .slice(0, CANDIDATES.length)
    .map(r => {
      const out = {
        domainName: String(r.domainName || '').slice(0, 100),
        purchasable: !!r.purchasable,
        premium: !!r.premium,
      };
      // purchasePrice only comes back for purchasable names, so only carry it
      // when it is really there instead of printing a confident zero.
      if (typeof r.purchasePrice === 'number') out.purchasePrice = r.purchasePrice;
      return out;
    })
    .filter(r => r.domainName);
  return { candidates: rows };
}

function sample(env, note) {
  const base = { source: 'sample', cache: env.MARKET_CACHE ? 'kv' : 'none', ...DOMAIN_SAMPLE };
  return note ? { ...base, note } : base;
}

// Returns { source: 'live' | 'sample', cache: 'kv' | 'none', cached?: boolean,
//           note?: string, candidates[] }. Never throws and never blocks the
// mission: if the registrar is unreachable SHIP still stages, on sample.
export async function domainCheck(env) {
  const cache = env.MARKET_CACHE || null;
  const where = cache ? 'kv' : 'none';

  // Both halves of the credential or nothing. A half-armed integration that
  // 401s on every mission is worse than an honestly labelled sample.
  if (!env.NAMECOM_USER || !env.NAMECOM_TOKEN) return sample(env);

  if (cache) {
    try {
      const hit = await cache.get(CACHE_KEY, 'json');
      if (hit && Array.isArray(hit.candidates)) return { source: 'live', cache: where, cached: true, ...hit };
    } catch {
      // A cache read failure is not a mission failure.
    }
  }

  const host = env.NAMECOM_ENV === 'dev' ? HOST_DEV : HOST_PROD;
  const auth = btoa(env.NAMECOM_USER + ':' + env.NAMECOM_TOKEN);

  let data;
  try {
    const res = await fetch(host + PATH, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Basic ' + auth },
      body: JSON.stringify({ domainNames: CANDIDATES, purchaseType: 'registration' }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return sample(env, 'name.com returned ' + res.status + ', sample served');
    data = await res.json();
  } catch {
    return sample(env, 'name.com unreachable, sample served');
  }

  const out = shape(data || {});
  if (!out.candidates.length) return sample(env, 'name.com returned no results, sample served');

  if (cache) {
    try {
      await cache.put(CACHE_KEY, JSON.stringify(out), { expirationTtl: CACHE_TTL });
    } catch {
      // Losing the write costs a lookup next time, not this mission.
    }
  }
  return { source: 'live', cache: where, cached: false, ...out };
}

// Compact text for SHIP's prompt. The honesty label rides inside the block so
// the model cannot report sample data as a real registrar answer, and the
// trademark caveat rides with it so SHIP never tells anyone a name is theirs.
export function formatDomains(d) {
  const lines = [
    d.source === 'live'
      ? 'DEPLOY TARGET DOMAIN CHECK (live name.com registrar lookup):'
      : 'DEPLOY TARGET DOMAIN CHECK (SAMPLE data, no registrar key armed, treat as illustrative):',
  ];
  for (const c of d.candidates) {
    const price = typeof c.purchasePrice === 'number' ? ' at $' + c.purchasePrice.toFixed(2) : '';
    lines.push('  ' + c.domainName + ': ' + (c.purchasable ? 'UNREGISTERED, available' + price : 'already taken') + (c.premium ? ' (premium)' : ''));
  }
  lines.push('Available means registrable, NOT cleared for use. Say so; never tell the owner a name is theirs.');
  return lines.join('\n');
}

// The same check rendered for the mission console.
export function domainRows(d) {
  return d.candidates.map(c => {
    const price = typeof c.purchasePrice === 'number' ? ' $' + c.purchasePrice.toFixed(2) : '';
    return (c.purchasable ? '[open] ' : '[taken] ') + c.domainName + (c.purchasable ? price : '');
  });
}
