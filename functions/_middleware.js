// Fleet Command middleware: security headers on every response, public site.
// This surface is deliberately public and indexable (it is the hackathon
// showpiece), so there is no gate here. The five headers ride every response,
// including ones the Functions build by hand downstream.

const HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

async function fleetHandle(context) {
  const res = await context.next();
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(HEADERS)) out.headers.set(k, v);
  // Pages serves the document with max-age=0, which makes every visit a
  // full round trip. A short TTL with a day of stale-while-revalidate keeps
  // a judge's second click instant and still picks up a deploy within five
  // minutes (the fleet cache posture, BUILD SAFE in CLAUDE.md).
  const type = out.headers.get('Content-Type') || '';
  if (type.includes('text/html')) {
    out.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
  }
  return out;
}

// fleet pulse: fleetbrain's traffic beacon. No PULSE binding = silent no-op
// (the on-switch pattern), and a failed write never touches the request.
export async function onRequest(context) {
  const t0 = Date.now();
  const res = await fleetHandle(context);
  try {
    context.env.PULSE?.writeDataPoint({
      blobs: ["fleetcommand", new URL(context.request.url).pathname.slice(0, 96), String(res.status)],
      doubles: [Date.now() - t0, res.status >= 500 ? 1 : 0],
      indexes: ["fleetcommand"],
    });
  } catch {}
  return res;
}
