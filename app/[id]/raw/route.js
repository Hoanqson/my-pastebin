import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function GET(req, { params }) {
  const content = await redis.get(params.id)
  if (!content) return new Response('Not found', { status: 404 })
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
