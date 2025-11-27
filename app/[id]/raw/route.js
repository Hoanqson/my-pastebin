import { kv } from '@vercel/kv'

export async function GET(request, { params }) {
  const { id } = params
  const content = await kv.get(id)

  if (content === null) return new Response('Not Found', { status: 404 })

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
