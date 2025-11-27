import { nanoid } from 'nanoid'
import { kv } from '@vercel/kv'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const content = searchParams.get('content')

  if (!content) {
    return Response.json({ error: 'Thiếu content' }, { status: 400 })
  }

  const id = nanoid(10)
  await kv.set(id, content)

  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = request.headers.get('x-forwarded-proto') || 'http'
  const url = `${protocol}://${host}/${id}`

  return Response.json({ url, id })
}
