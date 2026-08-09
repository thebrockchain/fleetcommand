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

export async function onRequest(context) {
  const res = await context.next();
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(HEADERS)) out.headers.set(k, v);
  return out;
}
