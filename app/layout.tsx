import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shreejan Prajapati',
  description: 'This is my glass effect portfolio.',
  icons: {
    icon: "/vercel.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
