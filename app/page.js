export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Hiệu ứng gradient di chuyển nhẹ nhàng phía sau */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 animate-gradient-x" />
      </div>

      {/* Chữ chính – có hiệu ứng glow + hover scale + breathing */}
      <h1 className="relative text-7xl md:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
                     animate-breathing hover:scale-110 transition-transform duration-700 cursor-default select-none
                     drop-shadow-2xl shadow-cyan-500/50">
        Web GetKey
      </h1>
    </div>
  )
}
