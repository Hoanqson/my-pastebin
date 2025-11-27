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

  const url = `${request.headers.get('origin')}/${id}`
  return Response.json({ url })
}
