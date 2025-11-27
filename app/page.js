'use client'

import { useState } from 'react'

export default function Home() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const createPaste = async () => {
    if (!content.trim()) return alert('Dán gì đi chứ =))')

    setLoading(true)
    try {
      // DÙNG FULL URL LUÔN ĐỂ TRÁNH LỖI /pipeline
      const res = await fetch(`/api/create?content=${encodeURIComponent(content)}`, {
        method: 'GET',
        cache: 'no-store'
      })

      const data = await res.json()

      if (data.url) {
        await navigator.clipboard.writeText(data.url)
        alert('Tạo thành công! Link đã copy:\n' + data.url)
        setContent('')
      } else {
        alert('Lỗi: ' + (data.error || 'Không biết'))
      }
    } catch (err) {
      alert('Lỗi mạng rồi: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-10 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
          PasteBin Siêu Nhẹ
        </h1>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Dán nội dung vào đây..."
          className="w-full h-64 p-5 rounded-xl bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white font-mono text-sm resize-none"
        />

        <div className="mt-6 text-center>
          <button
            onClick={createPaste}
            disabled={loading}
            className={`mt-6 px-12 py-4 text-xl font-bold rounded-xl transition-all ${
              loading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-cyan-600 hover:scale-105 shadow-xl'
            } text-white`}
          >
            {loading ? 'Đang tạo...' : 'Create New Paste'}
          </button>
        </div>
      </div>
    </div>
  )
}
