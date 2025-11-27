import { notFound } from 'next/navigation'

export default async function Paste({ params }) {
  const { id } = params
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL || ''}/${id}/raw`, { next: { revalidate: 0 } })
  
  if (!res.ok) notFound()
  
  const content = await res.text()

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Paste: {id}</h1>
          <button
            onClick={() => navigator.clipboard.writeText(content)}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
        <pre className="bg-gray-800 p-6 rounded-lg border border-gray-700 whitespace-pre-wrap break-all font-mono text-sm">
          {content}
        </pre>
      </div>
    </div>
  )
}
