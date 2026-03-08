import Footer from "@/components/Footer"
import NavLink from "@/components/NavLink"
import ContactButton from "@/components/ContactButton"
import CTASection from "@/components/CTASection"
import ResumeContent from "@/components/ResumeContent"
import { getResume } from "@/lib/getResume"
import getContentBySlug from "@/utils/getContentBySlug"
import { logoifyHtml } from "@/components/InlineLogo"

const faqFilenames = [1, 2, 3, 4, 5, 6]
const SHOW_FAQ = false

export function generateMetadata() {
    return { title: "Resume - Jared Salzano" }
}

export default async function BackgroundPage() {
    const resume = getResume()

    const faq: { question: string, answer: string, filename: number }[] = []
    if (SHOW_FAQ) {
        await Promise.all(faqFilenames.map(async (filename) => {
            const content = await getContentBySlug(`faq/${filename}`)
            faq.push({
                filename,
                question: content.frontMatter.question,
                answer: content.html
            })
        }))
        faq.sort((a, b) => a.filename - b.filename)
    }

    return (
        <>
            <main className="relative bg-white/90">
                <div className="page-container">
                    <div className="pt-8 mb-8 flex gap-4 items-center justify-end">
                        <NavLink href="/">Overview</NavLink>
                        <NavLink href="/background">Resume</NavLink>
                        <ContactButton />
                    </div>
                </div>

                {SHOW_FAQ && (
                    <section className="page-container py-16 scroll-mt-4" aria-label="FAQ">
                        <div className="prose prose-lg">
                            <h2>Frequently asked questions</h2>
                            {faq.map(({ question, answer }, index) => (
                                <div key={index}>
                                    <h3>{question}</h3>
                                    <div dangerouslySetInnerHTML={{ __html: logoifyHtml(answer) }} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="page-container py-16">
                    <div className="mb-10">
                        <a
                            target="_blank"
                            href="/resume.pdf"
                            className="font-sans text-xs uppercase tracking-widest hover:underline inline-flex items-center gap-1 mb-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            view as pdf
                        </a>
                        <div className="prose prose-lg max-w-none">
                            <h1 className="m-0">Resume</h1>
                        </div>
                    </div>
                    <ResumeContent resume={resume} />
                </section>

                <CTASection
                    heading="Let's work together"
                    description={
                        <>
                            I&apos;m{" "}
                            <b className="font-[500]">
                                actively looking for a full-time role
                            </b>{" "}
                            at a thoughtful, purpose-driven startup—NYC or remote—as a senior
                            front-end or full-stack developer. I&apos;m also{" "}
                            <b className="font-[500]">
                                currently taking on select freelance projects
                            </b>
                            , always excited to work with new people on fresh challenges.
                        </>
                    }
                />
            </main>
            <div className="relative bg-white/90">
                <Footer />
            </div>
        </>
    )
}
