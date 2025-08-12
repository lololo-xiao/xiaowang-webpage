import type { Metadata } from "next"
import "./globals.css"
import Nav from "@/components/Nav"

export const metadata: Metadata = {
  title: "Xiao Wang",
  description: "Xiao Wang — NLP & AI builder. Personal site and work log.",
  metadataBase: new URL("https://xiaowang.lol"),
  openGraph: {
    title: "Xiao Wang — NLP & AI builder",
    description: "Projects, writing, and a living work log.",
    url: "https://xiaowang.lol",
    siteName: "Xiao Wang",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
