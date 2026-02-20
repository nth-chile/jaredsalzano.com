import Footer from "@/components/Footer"
import Link from "next/link"

export default async function OtherStuff() {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="page-container w-full grow">
          <Link aria-label="home" className="text-blue-700 underline inline-block mt-8 mb-10" href="/">Home</Link>
          <main className="relative">
            <ul className="text-blue-700 underline text-lg">
              <li>
                <a target="_blank" href="https://nth-chile.github.io/platos-search/">plato’s search (game)</a>
              </li>
              <li>
                <a href="page-mcconnell-lyrics">page lyrics</a>
              </li>
            </ul>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}
