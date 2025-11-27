'use client'

import { useState } from 'react'

export default function Home() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const createPaste = async () => {
    if (!content.trim()) return alert('Dán gì đi chứ để trống sao tạo được =))')
    
    setLoading(true)
    try {
      const res = await fetch(`/api/create?content=${encodeURIComponent(content)}`)
      const data = await res.json()

      if (data.url) {
        await navigator.clipboard.writeText(data.url)
        alert(`Đã tạo xong!\nLink đã được copy tự động:\n${data.url}`)
        setContent('') // xóa textarea sau khi tạo
      } else {
        alert('Lỗi: ' + (data.error || 'Không biết luôn'))
      }
    } catch (err) {
      alert('Lỗi mạng rồi bro: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="max-w-3xl w-full">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-10 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          PasteBin
        </h1>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-5 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none text-white font-mono text-sm resize-none"
          placeholder="Dán nội dung vô đây rồi bấm Create New Paste nha..."
        />

        <div className="mt-6 text-center">
          <button
            onClick={createPaste}
            disabled={loading}
            className={`px-10 py-4 text-lg font-bold rounded-lg transition-all
              ${loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-500 to-blue-600 hover:scale-105 shadow-lg'
              } text-white`}
          >
            {loading ? 'Đang tạo...' : 'Create New Paste'}
          </button>
        </div>
      </div>
    </div>
  )
}
