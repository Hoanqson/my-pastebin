import { nanoid } from 'nanoid'
import { createClient } from '@vercel/edge-config'

const EDGE_CONFIG_ITEM = 'pastes'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const content = searchParams.get('content')

  if (!content) {
    return Response.json({ error: 'Thiếu content' }, { status: 400 })
  }

  const id = nanoid(10) // ID ngẫu nhiên 10 ký tự

  // Tạo client với token (có quyền write)
  const client = createClient({
    edgeConfig: process.env.EDGE_CONFIG // Đây là env var chứa ID của Edge Config (ecfg_abc123)
  }, {
    // Authorization với token write
    headers: {
      Authorization: `Bearer ${process.env.EDGE_CONFIG_TOKEN}`
    }
  })

  // Đọc data hiện tại
  let pastes = await client.get(EDGE_CONFIG_ITEM) || {}
  if (typeof pastes !== 'object') pastes = {}

  // Ghi mới
  pastes[id] = content
  await client.set(EDGE_CONFIG_ITEM, pastes)

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || `https://${request.headers.get('host')}`
  const url = `${baseUrl}/${id}`

  return Response.json({ url, id })
}
