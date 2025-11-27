import { nanoid } from 'nanoid'
import { kv } from '@vercel/kv'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const content = searchParams.get('content')

  if (!content) return Response.json({ error: 'Thiếu content' }, { status: 400 })

  const id = nanoid(10)
  await kv.set(id, content)

  const url = `${process.env.NEXT_PUBLIC_VERCEL_URL || 'https://' + request.headers.get('host')}/${id}`
  return Response.json({ url, id })
}
