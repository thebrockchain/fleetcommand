// Proves SHIP's registrar check parses a real name.com payload correctly.
//
// Same reason as tools/test-market.mjs: the live success branch needs a funded
// name.com account, and an unarmed demo must not ship a parser nobody ever ran.
// This feeds shape() a payload in name.com's documented core/v1 response shape,
// including the field that is CONDITIONAL in their own docs (purchasePrice only
// comes back for purchasable names), and asserts on the result.
//
//   node tools/test-domains.mjs

import { shape, formatDomains, domainRows, DOMAIN_SAMPLE, CANDIDATES } from '../functions/_lib/domains.js';

let failures = 0;
function check(label, cond, detail) {
  if (cond) console.log('  ok   ' + label);
  else { failures++; console.log('  FAIL ' + label + (detail ? '  -> ' + detail : '')); }
}

// name.com core/v1 checkAvailability, trimmed to the fields we read. Note the
// taken domain carries NO purchasePrice, which is exactly what their docs say
// and is the case a naive parser turns into "$0.00".
const REAL_SHAPE = {
  results: [
    { domainName: 'harborlanebakery.com', sld: 'harborlanebakery', tld: 'com', purchasable: true, premium: false, purchasePrice: 12.99, purchaseType: 'registration', renewalPrice: 18.99 },
    { domainName: 'harborlane.bakery', sld: 'harborlane', tld: 'bakery', purchasable: true, premium: true, purchasePrice: 340.0, purchaseType: 'registration', renewalPrice: 340.0 },
    { domainName: 'harborlanebakery.shop', sld: 'harborlanebakery', tld: 'shop', purchasable: false, reason: 'Domain is already registered' },
  ],
};

console.log('shape() against a real name.com payload');
const out = shape(REAL_SHAPE);
check('keeps all three candidates', out.candidates.length === 3, 'got ' + out.candidates.length);
check('reads purchasable true', out.candidates[0].purchasable === true);
check('reads purchasable false', out.candidates[2].purchasable === false);
check('carries a price when present', out.candidates[0].purchasePrice === 12.99);
check('carries the premium flag', out.candidates[1].premium === true);
check('OMITS price on a taken domain', !('purchasePrice' in out.candidates[2]),
  'a taken domain must not carry a price, or the UI prints $0.00');

console.log('shape() against junk');
for (const [label, junk] of [
  ['empty object', {}],
  ['null results', { results: null }],
  ['wrong type', { results: 'nope' }],
  ['result missing everything', { results: [{}] }],
  ['price as a string', { results: [{ domainName: 'x.com', purchasable: true, purchasePrice: '12.99' }] }],
]) {
  let ok = true, r;
  try { r = shape(junk); } catch { ok = false; }
  check('survives ' + label, ok && r && Array.isArray(r.candidates));
}
check('a string price is dropped, never printed', !('purchasePrice' in shape({ results: [{ domainName: 'x.com', purchasable: true, purchasePrice: '12.99' }] }).candidates[0]));
check('a nameless result is dropped', shape({ results: [{}] }).candidates.length === 0);
check('never exceeds the candidate list', shape({ results: Array.from({ length: 20 }, (_, i) => ({ domainName: 'd' + i + '.com', purchasable: true })) }).candidates.length === CANDIDATES.length);

console.log('honesty labels');
const liveBlock = formatDomains({ source: 'live', ...out });
const sampleBlock = formatDomains({ source: 'sample', ...DOMAIN_SAMPLE });
check('live block says live', liveBlock.includes('live name.com registrar lookup'));
check('sample block shouts SAMPLE', sampleBlock.includes('SAMPLE'));
check('sample block never claims live', !sampleBlock.includes('live name.com'));
check('both carry the not-cleared caveat', liveBlock.includes('NOT cleared for use') && sampleBlock.includes('NOT cleared for use'));

console.log('console rows');
const rows = domainRows({ source: 'live', ...out });
check('one row per candidate', rows.length === 3);
check('open rows are marked open', rows[0].startsWith('[open]'));
check('taken rows are marked taken', rows[2].startsWith('[taken]'));
check('taken rows carry no price', !rows[2].includes('$'));

console.log(failures ? '\n' + failures + ' FAILED' : '\nall passed');
process.exit(failures ? 1 : 0);
