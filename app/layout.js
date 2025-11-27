import './globals.css'

export const metadata = {
  title: 'PasteBin by Bạn',
  description: 'Paste nhanh, chia sẻ nhanh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
