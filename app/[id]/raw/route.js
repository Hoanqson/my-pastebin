import { kv } from '@vercel/kv'

export async function GET(req, { params }) {
  const content = await kv.get(params.id)
  if (!content) return new Response('Not found', { status: 404 })
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
