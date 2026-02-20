import getContentBySlug from "@/utils/getContentBySlug"
import Footer from "@/components/Footer"
import NavLink from "@/components/NavLink"
import CTASection from "@/components/CTASection"

const faqFilenames = [1, 2, 3, 4, 5, 6]

export function generateMetadata() {
    return { title: "FAQ - Jared Salzano" }
}

export default async function FAQPage() {
    const faq: { question: string, answer: string, filename: number }[] = []

    try {
        await Promise.all(faqFilenames.map(async (filename) => {
            try {
                const content = await getContentBySlug(`faq/${filename}`)
                faq.push({
                    filename,
                    question: content.frontMatter.question,
                    answer: content.html
                })
            } catch (err) {
                throw err
            }
        }))
    } catch (err) {
        throw err
    }

    faq.sort((a, b) => a.filename - b.filename)

    return (
        <>
            <main className="relative bg-orange-50">
                <nav className="prose page-container pt-8 pb-10" style={{ maxWidth: "none" }}>
                    <NavLink href="/">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to home
                    </NavLink>
                </nav>

                <div className="page-container pb-8">
                    <div className="prose prose-lg">
                        <h2>Frequently asked questions</h2>
                        {faq.map(({ question, answer }, index) => (
                            <div key={index}>
                                <h3>{question}</h3>
                                <div dangerouslySetInnerHTML={{ __html: answer }} />
                            </div>
                        ))}
                    </div>
                </div>

                <CTASection
                    heading="Still have questions?"
                    description="I'd love to hear from you."
                />
            </main>
            <div className="relative bg-orange-50">
                <Footer />
            </div>
        </>
    )
}
