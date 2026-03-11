import "@/styles/global.css"
import type { Metadata } from "next"
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import CookiePopup from "@/components/CookiePopup"

// https://beta.nextjs.org/docs/api-reference/metadata
export const metadata: Metadata = {
  title: "Jared Salzano",
  description: "Jared Salzano is a front-end-leaning full-stack developer with 8+ years of experience building high-performance web apps.",
  icons: {
    apple: [
      {
        sizes: "180x180",
        type: "image/png",
        url: "/apple-touch-icon.png"
      }
    ],
    other: [
      {
        rel: "icon",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      }
    ]
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Jared Salzano",
    description: "Jared Salzano is a front-end-leaning full-stack developer with 8+ years of experience building high-performance web apps.",
    images: [
      {
        url: "https://jaredsalzano.com/meta-img.png",
        height: 1573,
        width: 1631
      }
    ],
    type: "website",
    url: "https://jaredsalzano.com/"
  },
  twitter: {
    card: "summary_large_image",
    description: "Jared Salzano is a front-end-leaning full-stack developer with 8+ years of experience building high-performance web apps.",
    images: ["https://jaredsalzano.com/meta-img.png"],
    title: "Jared Salzano"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookiePopup />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://cdn.counter.dev/script.js"
          data-id="588e79c0-02ae-4811-b033-59f6034fd66f"
          data-utcoffset="-4"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
