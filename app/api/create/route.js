// app/api/create/route.js  (hoặc app/new/route.js)
import { Redis } from '@upstash/redis'
import { nanoid } from 'nanoid'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Danh sách key được phép (cách nhau bằng dấu phẩy)
const ALLOWED_KEYS = process.env.PASTEBIN_API_KEY?.split(',') || []

export async function GET(request) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key') || request.headers.get('x-api-key')
  const content = url.searchParams.get('content')

  // Check key
  if (!key || !ALLOWED_KEYS.includes(key.trim())) {
    return new Response('Forbidden – API key sai hoặc thiếu', { 
      status: 403,
      headers: { 'Content-Type': 'text/plain' }
    })
  }

  // Check content
  if (!content) {
    return new Response('Missing content', { status: 400 })
  }

  const id = nanoid(10)
  await redis.set(id, content)

  const origin = request.headers.get('origin') || `https://${request.headers.get('host')}`
  const pasteUrl = `${origin}/${id}`

  return Response.json({ url: pasteUrl, id })
}
