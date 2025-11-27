export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-8">
          my-paste
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Pastebin private – chỉ dùng qua API
        </p>

        <div className="bg-gray-900 rounded-2xl p-8 max-w-3xl mx-auto font-mono text-left text-sm">
          <p className="text-cyan-400 mb-4">Cách dùng:</p>
          <code className="block bg-black/50 rounded-lg p-3 rounded mb-2 text-green-300">
            curl "https://my-pastebin-wine.vercel.app/api/create?content=Hello world"
          </code>
          <code className="block bg-black/50 rounded p-3 text-orange-300">
            → {"{url: 'https://my-pastebin-wine.vercel.app/AbCdE123'}"}
          </code>
        </div>

        <p className="text-gray-600 mt-16 text-sm">
          Made with ❤️ + Upstash Redis + Vercel
        </p>
      </div>
    </div>
  )
}
