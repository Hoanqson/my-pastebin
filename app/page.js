'use client' // Thêm dòng này để dùng useState/useEffect nếu cần, nhưng giữ đơn giản

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          PasteBin
        </h1>
        <textarea
          id="content"
          className="w-full h-64 p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none text-white font-mono text-sm resize-none"
          placeholder="Dán nội dung của bạn vào đây rồi nhấn Create Paste..."
        ></textarea>
        <div className="mt-4 text-center">
          <button
            id="createBtn" // Thêm ID để dễ select
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            Create New Paste
          </button>
        </div>
      </div>
    </div>
  )
}

// Script ở cuối (hoặc dùng useEffect nếu 'use client')
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('createBtn')
    const textarea = document.getElementById('content')
    btn.addEventListener('click', async () => {
      const content = textarea.value.trim()
      if (!content) return alert('Nội dung trống!')

      btn.disabled = true
      btn.textContent = 'Đang tạo...'

      try {
        const res = await fetch(`/api/create?content=${encodeURIComponent(content)}`)
        const data = await res.json()
        if (data.url) {
          await navigator.clipboard.writeText(data.url)
          alert(`Đã tạo! Link đã copy vào clipboard:\n${data.url}`)
          textarea.value = '' // Clear sau khi tạo
        } else {
          alert('Lỗi: ' + (data.error || 'Không biết'))
        }
      } catch (error) {
        alert('Lỗi kết nối: ' + error.message)
      } finally {
        btn.disabled = false
        btn.textContent = 'Create New Paste'
      }
    })
  })
}
