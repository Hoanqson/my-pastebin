import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function GET(request, { params }) {
  const { id } = params

  // Chặn favicon.ico và các request rác
  if (!id || id.length < 5 || id.includes('.') || id === 'favicon.ico') {
    return new Response('Not Found', { status: 404 })
  }

  const content = await redis.get(id)

  if (!content) {
    return new Response('Not Found', { status: 404 })
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
