import type { Metadata } from 'next'
import { GeistSans } from "geist/font/sans";
import './globals.css'


export const metadata: Metadata = {
  title: 'Briefr — AI Copilot for Remote Teams',
  description: 'Automatically summarize emails, Slack threads, and meetings into actionable 3-line briefs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} font-sans`}>{children}</body>
    </html>
  )
}

