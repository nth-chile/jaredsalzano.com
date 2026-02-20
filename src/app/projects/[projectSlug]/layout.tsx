import MakeProjectLinksOpenInNewTab from "@/components/MakeProjectLinksOpenInNewTab"
import NavLink from "@/components/NavLink"
import Footer from "@/components/Footer"
import { getNextProject } from "@/utils/getNextProject"

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  const { projectSlug } = await params
  const nextProject = await getNextProject(projectSlug)

  return (
    <div className="bg-white/90">
      <nav className="prose page-container pt-8 pb-10" style={{ maxWidth: "none" }}>
        <NavLink href="/">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </NavLink>
      </nav>
      <div className="page-container project pb-16">
        {children}
        <MakeProjectLinksOpenInNewTab />
      </div>
      {nextProject && (
        <div className="pr-10 sm:pr-16 pb-8 flex justify-end">
          <div className="prose">
            <NavLink href={`/projects/${nextProject.slug}`}>
              Next project
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </NavLink>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
