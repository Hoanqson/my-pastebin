import { notFound } from 'next/navigation'
import { kv } from '@vercel/kv'

// Kiểm tra id có hợp lệ không (chỉ cho phép chữ + số + dấu gạch ngang)
const isValidId = (id) => /^[a-zA-Z0-9_-]{5,20}$/.test(id)

export default async function Paste({ params }) {
  const { id } = params

  // Fix lỗi favicon.ico + bảo vệ
  if (!id || !isValidId(id)) {
    notFound()
  }

  const content = await kv.get(id)

  if (content === null) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-400">Paste: {id}</h1>
          <button
            onClick={() => navigator.clipboard.writeText(content)}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Copy nội dung
          </button>
        </div>
        <pre className="bg-gray-800 p-6 rounded-lg border border-gray-700 whitespace-pre-wrap break-all font-mono text-sm overflow-x-auto">
          {content}
        </pre>
        <div className="mt-4 text-right">
          <a href={`${id}/raw`} className="text-sm text-gray-400 hover:underline">
            Xem dạng raw →
          </a>
        </div>
      </div>
    </div>
  )
}
