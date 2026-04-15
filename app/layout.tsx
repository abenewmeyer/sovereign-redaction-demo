// app/layout.tsx — REPLACE ENTIRE FILE WITH THIS
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Sovereign AI Redaction Demo',
  description: 'Instantly branded, air-gapped PII redaction sandbox. Powered by Next.js App Router.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  )
}