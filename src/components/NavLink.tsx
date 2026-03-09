"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`inline-flex items-center text-sm transition-colors hover:underline ${
        isActive
          ? "font-semibold text-gray-700 hover:text-gray-700 underline"
          : "font-medium text-gray-600 hover:text-gray-700 no-underline"
      }`}
    >
      {children}
    </Link>
  )
}
