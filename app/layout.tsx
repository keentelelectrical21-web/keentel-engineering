import type { Metadata } from 'next'
import './globals.css'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: 'Keentel Engineering | Electrical Power Engineering',
  description: 'Keentel Engineering delivers expert electrical power engineering services — substation design, NERC compliance, POI interconnection, and utility-scale renewable energy across the U.S.',
  keywords: 'electrical engineering, power system studies, NERC compliance, substation design, POI interconnection, renewable energy engineering',
  openGraph: {
    title: 'Keentel Engineering | Electrical Power Engineering',
    description: 'Expert electrical power engineering — NERC compliance, substation design, and renewable energy across the U.S.',
    url: 'https://keentelengineering.com',
    siteName: 'Keentel Engineering',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="font-jost antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
