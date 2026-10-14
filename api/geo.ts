/** Returns only Vercel's country-level estimate, used to display local pricing. */
export const config = { runtime: 'edge' }

export default function handler(request: Request): Response {
  if (request.method !== 'GET') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 })
  }

  const country = request.headers.get('x-vercel-ip-country')?.toUpperCase() ?? null
  return Response.json(
    { country: country && /^[A-Z]{2}$/.test(country) ? country : null },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
