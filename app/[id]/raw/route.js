import { getEdgeConfig } from '@vercel/edge-config'

export async function GET(request, { params }) {
  const { id } = params
  const pastes = (await getEdgeConfig('pastes')) || {}

  if (!pastes[id]) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(pastes[id], {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
