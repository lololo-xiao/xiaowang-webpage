import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Xiao Wang",
  description: "Xiao Wang — NLP & AI builder.",
  metadataBase: new URL("https://xiaowang.lol"),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any', rel: 'icon' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Xiao Wang",
    description: "Personal site.",
    url: "https://xiaowang.lol",
    siteName: "Xiao Wang",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
