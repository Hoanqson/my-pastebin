import { get } from '@vercel/edge-config'

export async function GET(request, { params }) {
  const { id } = params
  const EDGE_CONFIG_ITEM = 'pastes'

  // Đọc từ Edge Config (chỉ read, dùng get đơn giản)
  const pastes = await get(EDGE_CONFIG_ITEM) || {}

  if (!pastes || !pastes[id]) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(pastes[id], {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
