export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          PasteBin Siêu Nhẹ
        </h1>
        <textarea
          id="content"
          className="w-full h-64 p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none text-white font-mono text-sm"
          placeholder="Dán nội dung của bạn vào đây rồi nhấn Create Paste..."
        ></textarea>
        <div className="mt-4 text-center">
          <button
            onClick={createPaste}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg font-semibold hover:scale-105 transition"
          >
            Create New Paste
          </button>
        </div>
      </div>
    </div>
  )
}

async function createPaste() {
  const content = document.getElementById('content').value
  if (!content.trim()) return alert('Nội dung trống!')

  const res = await fetch(`/api/create?content=${encodeURIComponent(content)}`)
  const data = await res.json()
  if (data.url) {
    navigator.clipboard.writeText(data.url)
    alert('Đã tạo! Link đã được copy vào clipboard:\n' + data.url)
  }
}
