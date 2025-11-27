import { nanoid } from 'nanoid'
import { getEdgeConfig } from '@vercel/edge-config'

const EDGE_CONFIG_ITEM = 'pastes'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const content = searchParams.get('content')

  if (!content) {
    return Response.json({ error: 'Thiếu content' }, { status: 400 })
  }

  const id = nanoid(10) // tạo ID ngẫu nhiên 10 ký tự

  // Lưu vào Edge Config
  let pastes = (await getEdgeConfig(EDGE_CONFIG_ITEM)) || {}
  pastes[id] = content
  await fetch(`https://edge-config.vercel.com/ecfg_${process.env.EDGE_CONFIG_ID}?token=${process.env.EDGE_CONFIG_TOKEN}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ [EDGE_CONFIG_ITEM]: pastes })
  })

  const url = `${process.env.NEXT_PUBLIC_VERCEL_URL || 'https://' + request.headers.get('host')}/${id}`

  return Response.json({ url, id })
}
