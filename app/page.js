'use client'

import { useState } from 'react'

export default function Home() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const createPaste = async () => {
    if (!content.trim()) {
      return alert('Dán gì đó vào đi chứ để trống sao tạo được')
    }

    setLoading(true)
    try {
      // DÙNG FULL URL ĐỂ TRÁNH LỖI /pipeline TRÊN VERCEL
      const fullUrl = `${window.location.origin}/api/create?content=${encodeURIComponent(content)}`

      const res = await fetch(fullUrl, {
        method: 'GET',
        cache: 'no-store',
      })

      if (!res.ok) {
        throw new Error('Server trả lỗi ' + res.status)
      }

      const data = await res.json()

      if (data.url) {
        await navigator.clipboard.writeText(data.url)
        alert('ĐÃ TẠO XONG!\nLink đã được copy vào clipboard:\n' + data.url)
        setContent('') // xóa textarea sau khi tạo thành công
      } else {
        alert('Lỗi: ' + (data.error || 'Không rõ'))
      }
    } catch (err) {
      console.error(err)
      alert('Lỗi mạng rồi: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-5xl md:text-7xl font-black mb-12 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          PasteBin Siêu Nhẹ
        </h1>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Dán nội dung của bạn vào đây rồi bấm Create..."
          className="w-full h-80 p-6 rounded-2xl bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:outline-none font-mono text-sm resize-none scrollbar-thin scrollbar-thumb-gray-600"
        />

        <div className="mt-8 text-center">
          <button
            onClick={createPaste}
            disabled={loading}
            className={`px-12 py-5 text-xl font-bold rounded-2xl transition-all shadow-lg
              ${loading 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-500 to-cyan-600 hover:scale-105 active:scale-95'
              }`}
          >
            {loading ? 'Đang tạo...' : 'Create New Paste'}
          </button>
        </div>

        <p className="text-center text-gray-500 mt-10 text-sm">
          Dùng Upstash Redis + Vercel – nhanh như chớp, không giới hạn
        </p>
      </div>
    </div>
  )
}
