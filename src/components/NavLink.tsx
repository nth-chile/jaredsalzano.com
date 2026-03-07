import Link from "next/link"

export default function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black hover:underline transition-colors no-underline">
      {children}
    </Link>
  )
}
