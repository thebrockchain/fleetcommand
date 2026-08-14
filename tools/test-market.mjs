// Proves SCOUT's market lens parses a real SerpApi payload correctly.
//
// Why this file exists: the live success branch cannot be reached without a
// funded SerpApi key, and an unarmed demo must not ship a parser nobody ever
// ran. This feeds shape() a payload in SerpApi's documented Google Search shape
// (organic_results, related_questions) plus the ugly cases a real response
// throws, and asserts on the result.
//
//   node tools/test-market.mjs

import { shape, formatMarket, marketRows, MARKET_SAMPLE, MARKET_QUERY } from '../functions/_lib/market.js';

let failures = 0;
function check(label, cond, detail) {
  if (cond) {
    console.log('  ok   ' + label);
  } else {
    failures++;
    console.log('  FAIL ' + label + (detail ? '  -> ' + detail : ''));
  }
}

// A SerpApi Google Search response, trimmed to the fields we read, including
// the awkward parts: more results than we want, a missing snippet, a missing
// position, and a related_questions entry with no question text.
const REAL_SHAPE = {
  search_metadata: { status: 'Success' },
  organic_results: [
    { position: 1, title: 'Square Online Ordering for Bakeries', link: 'https://squareup.com/us/en/online-ordering', snippet: 'Take bakery orders online with pickup and local delivery. No monthly fee to start.' },
    { position: 2, title: 'Toast for Bakeries', link: 'https://pos.toasttab.com/bakery', snippet: 'Online ordering built for bakeries, with pickup scheduling and pre-orders.' },
    { position: 3, title: 'How to sell baked goods online', link: 'https://example.org/how-to' },
    { title: 'A fourth result with no position field', link: 'https://example.org/four', snippet: 'Should be dropped by the slice, not crash the parser.' },
    { position: 5, title: 'Fifth', link: 'https://example.org/five', snippet: 'Also dropped.' },
  ],
  related_questions: [
    { question: 'How do I take bakery orders online?', snippet: '...' },
    { question: 'What is the best online ordering system for a small bakery?' },
    { snippet: 'An entry with no question at all.' },
    { question: 'Do bakeries need a website to sell online?' },
    { question: 'A fourth question that should be dropped by the slice.' },
  ],
};

console.log('shape() against a real SerpApi payload');
const out = shape(REAL_SHAPE);
check('keeps exactly 3 competitors', out.competitors.length === 3, 'got ' + out.competitors.length);
check('keeps the top result first', out.competitors[0].title.includes('Square'));
check('carries the link through', out.competitors[0].link === 'https://squareup.com/us/en/online-ordering');
check('tolerates a missing snippet', out.competitors[2].snippet === '');
check('keeps exactly 3 questions', out.questions.length === 3, 'got ' + out.questions.length);
check('drops the entry with no question text', out.questions.every(q => typeof q === 'string' && q.length));
check('stamps the query', out.query === MARKET_QUERY);

console.log('shape() against junk');
for (const [label, junk] of [
  ['empty object', {}],
  ['null fields', { organic_results: null, related_questions: null }],
  ['wrong types', { organic_results: 'nope', related_questions: 42 }],
  ['result missing everything', { organic_results: [{}] }],
]) {
  let ok = true;
  let r;
  try { r = shape(junk); } catch (e) { ok = false; }
  check('survives ' + label, ok && r && Array.isArray(r.competitors));
}

console.log('caps that keep the prompt small');
const longOne = shape({ organic_results: [{ position: 1, title: 'T'.repeat(500), link: 'https://x.test', snippet: 'S'.repeat(500) }] });
check('title capped at 120', longOne.competitors[0].title.length === 120, String(longOne.competitors[0].title.length));
check('snippet capped at 160', longOne.competitors[0].snippet.length === 160, String(longOne.competitors[0].snippet.length));

console.log('honesty labels');
const liveBlock = formatMarket({ source: 'live', ...out });
const sampleBlock = formatMarket({ source: 'sample', ...MARKET_SAMPLE });
check('live block says live', liveBlock.includes('live Google results via SerpApi'));
check('sample block shouts SAMPLE', sampleBlock.includes('SAMPLE'));
check('sample block never claims live', !sampleBlock.includes('live Google results'));
check('console rows render', marketRows({ source: 'live', ...out }).length === 6);

console.log(failures ? '\n' + failures + ' FAILED' : '\nall passed');
process.exit(failures ? 1 : 0);
