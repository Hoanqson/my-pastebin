import { Redis } from '@upstash/redis'
import { nanoid } from 'nanoid'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function GET(request) {
  const content = new URL(request.url).searchParams.get('content')
  if (!content) return Response.json({ error: 'empty' }, { status: 400 })

  const id = nanoid(10)
  await redis.set(id, content)

  // Fix URL 100% không lỗi nữa
  let origin = request.headers.get('origin')
  if (!origin) {
    const host = request.headers.get('host') || 'my-pastebin-lime.vercel.app'
    origin = `https://${host}`
  }

  const url = `${origin}/${id}`

  return Response.json({ url })
}
