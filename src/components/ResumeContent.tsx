import type { ResumeData } from '@/types/resume'
import L from '@/components/InlineLogo'

interface Props {
  resume: ResumeData
}

// Renders a string that may contain [text](url) markdown links
function renderWithLinks(text: string) {
  const parts = text.split(/(\[.+?\]\(.+?\))/g)
  return parts.map((part, i) => {
    const match = part.match(/^\[(.+?)\]\((.+?)\)$/)
    if (match) {
      return <a key={i} href={match[2]} className="underline font-bold" target="_blank" rel="noopener noreferrer">{match[1]}</a>
    }
    return part
  })
}

export default function ResumeContent({ resume }: Props) {
  return (
    <div className="font-sans">

      {resume.experience.map((job) => (
        <div key={job.company} className="mt-8 first:mt-0">
          <div className="flex justify-between items-baseline gap-4 mb-1">
            <h3 className="m-0 text-xl font-bold leading-tight">{job.company}</h3>
            <span className="text-sm font-bold tabular-nums shrink-0">{job.period}</span>
          </div>
          <p className="text-[14px] italic leading-snug mt-0.5 mb-1">{job.description}</p>

          {job.clients && (
            <ul className="list-disc ml-5 text-[15px] leading-snug space-y-0">
              {job.clients.map((client) => (
                <li key={client.name} className="italic">
{client.name}
                  <ul className="list-disc ml-5 not-italic">
                    {client.bullets.map((bullet, i) => (
                      <li key={i}>{renderWithLinks(bullet)}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          {job.bullets && (
            <ul className="list-disc ml-5 text-[15px] leading-snug">
              {job.bullets.map((bullet, i) => (
                <li key={i}>{renderWithLinks(bullet)}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="mt-8">
        <h3 className="m-0 text-xl font-bold leading-tight mb-1">Other contract work</h3>
        <ul className="list-disc ml-5 text-[15px] leading-snug">
          {resume.otherWork.bullets.map((bullet, i) => (
            <li key={i}>{renderWithLinks(bullet)}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-baseline gap-4 mb-1">
          <h3 className="m-0 text-xl font-bold leading-tight">Passion projects</h3>
          <span className="text-sm font-bold tabular-nums shrink-0">{resume.passionProjects.period}</span>
        </div>
        <ul className="list-disc ml-5 text-[15px] leading-snug">
          {resume.passionProjects.items.map((item, i) => (
            <li key={i}>
              {item.text}{item.url && (
                <>{" "}<a href={item.url} className="underline font-bold" target="_blank" rel="noopener noreferrer">(link)</a></>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-[15px] leading-snug space-y-1">
        <p><strong>Preferred development tools:</strong>{" "}
          <span className="whitespace-nowrap"><L name="react" /> React</span>,{" "}
          <span className="whitespace-nowrap"><L name="react" /> React Native</span>,{" "}
          <span className="whitespace-nowrap"><L name="typescript" /> TypeScript</span>,{" "}
          <span className="whitespace-nowrap"><L name="nextjs" /> Next.js</span>,{" "}
          <span className="whitespace-nowrap"><L name="tailwind" /> Tailwind</span>,{" "}
          <span className="whitespace-nowrap"><L name="graphql" /> GraphQL</span>,{" "}
          <span className="whitespace-nowrap"><L name="electron" /> Electron</span>,{" "}
          <span className="whitespace-nowrap"><L name="gcp" /> GCP</span>,{" "}
          <span className="whitespace-nowrap"><L name="postgresql" /> PostgreSQL</span>
        </p>
        <p><strong>Education:</strong> {resume.education}</p>
      </div>

    </div>
  )
}
