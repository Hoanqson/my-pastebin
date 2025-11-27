import { kv } from '@vercel/kv'
import { nanoid } from 'nanoid'

export async function GET(request) {
  const content = new URL(request.url).searchParams.get('content')
  if (!content) return Response.json({ error: 'empty' }, { status: 400 })

  const id = nanoid(10)
  await kv.set(id, content)

  const url = `${request.headers.get('origin')}/${id}`
  return Response.json({ url })
}
