import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <main className="relative bg-white/90 min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto px-10 sm:px-16 py-24">
          <div className="prose prose-lg">
            <h1 className="mt-0">Page not found</h1>
            <p>
              The page you&apos;re looking for doesn&apos;t exist or may have
              moved.
            </p>
            <Link href="/">Back to home</Link>
          </div>
        </div>
      </main>
      <div className="relative bg-white/90">
        <Footer />
      </div>
    </>
  );
}
