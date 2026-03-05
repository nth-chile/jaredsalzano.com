import "@/styles/page-lyrics.css"
import { ReactNode } from "react"
import type { Metadata } from "next"
import Head from "next/head"

export const metadata: Metadata = {
  title: "Page McConnell lyrics"
}

export default function PageMcConnellLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      <div className="page-mcconnell-lyrics min-h-full">
        {children}
      </div>
    </>
  )
}
