export default function Home() {
  return (
    <>
      {/* Background gradient động + hiệu ứng pulse */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-pink-500/10 animate-pulse" />
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="text-center max-w-4xl mx-auto">

          {/* Tiêu đề siêu đẹp */}
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x hover:scale-105 transition-transform duration-500 select-none">
            my-paste
          </h1>

          <p className="text-2xl md:text-4xl font-light text-gray-300 mb-16">
            Private Pastebin • API Only • <span className="text-cyan-400 font-bold">Key Required</span>
          </p>

          {/* Nút Get Key đỉnh cao */}
          <div className="group relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 group-hover:scale-110 transition duration-1000" />
            <button className="relative px-16 py-8 text-3xl md:text-5xl font-bold rounded-3xl bg-gray-950 text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text hover:text-white transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:shadow-cyan-500/50">
              GET YOUR KEY
            </button>
          </div>

          <p className="text-gray-500 mt-20 text-lg">Click anywhere to feel the magic</p>

          {/* API example */}
          <div className="mt-20 bg-black/40 backdrop-blur-xl rounded-3xl p-10 border border-gray-800">
            <p className="text-cyan-400 mb-4 text-xl">API Usage:</p>
            <code className="block text-green-400 text-lg break-all">
              curl "https://my-pastebin-wine.vercel.app/api/create?key=<span className="text-yellow-300">YOUR_KEY</span>&content=Hello"
            </code>
          </div>

          <footer className="mt-20 text-gray-600 text-sm">
            Upstash Redis + Vercel • Made with love by hoanqson
          </footer>
        </div>
      </div>

      {/* Hiệu ứng click bắn hạt siêu đẹp */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', function(e) {
              const colors = ['#06b6d4', '#a855f7', '#ec4899', '#22c55e', '#f59e0b'];
              for(let i = 0; i < 18; i++) {
                const p = document.createElement('div');
                p.style.cssText = \`
                  position: fixed;
                  left: \${e.clientX}px;
                  top: \${e.clientY}px;
                  width: 12px;
                  height: 12px;
                  background: \${colors[Math.floor(Math.random() * colors.length)]};
                  border-radius: 50%;
                  pointer-events: none;
                  z-index: 9999;
                  animation: particle 1.2s ease-out forwards;
                \`;
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 1200);
              }
            });

            const style = document.createElement('style');
            style.innerHTML = \`
              @keyframes particle {
                to {
                  transform: translate(\${Math.random()*500-250}px, \${Math.random()*500-250}px);
                  opacity: 0;
                }
              }
              @keyframes gradient-x {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position:100% 50%; }
              }
              .animate-gradient-x {
                background-size: 200%;
                animation: gradient-x 10s ease infinite;
              }
            \`;
            document.head.appendChild(style);
          `,
        }}
      />
    </>
  )
}
