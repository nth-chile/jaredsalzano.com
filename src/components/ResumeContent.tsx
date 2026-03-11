import type { ResumeData } from '@/types/resume'
import L from '@/components/InlineLogo'
import type { ComponentProps, ReactNode } from 'react'

type LogoName = ComponentProps<typeof L>['name']

interface Props {
  resume: ResumeData
}

// Maps a name to its logo key if the name starts with a known company
const nameToLogo: Record<string, LogoName> = {
  'NBC': 'nbc',
  'Apple': 'apple',
  'OpenAI': 'openai',
  'Comcast': 'comcast',
  'Blackstone': 'blackstone',
  'Linode': 'linode',
  'Utility NYC': 'utility',
  'Hugo & Marie': 'hugoandmarie',
}

function logoForName(name: string): LogoName | null {
  for (const [prefix, logo] of Object.entries(nameToLogo)) {
    if (name.startsWith(prefix)) return logo
  }
  return null
}

// Patterns to logoify in bullet text — companies/brands only, not tech tools
const textLogos: [RegExp, LogoName][] = [
  [/\bPeacock\b/, 'peacock'],
  [/\bNike\b/, 'nike'],
  [/\bGucci\b/, 'gucci'],
  [/\bRihanna\b/, 'fenty'],
  [/\bWomen Deliver\b/, 'womendeliver'],
  [/\bWorld Food Programme\b/, 'wfp'],
  [/\bThe Luupe\b/, 'theluupe'],
  [/\bUniversity of Pittsburgh\b/, 'pitt'],
]

// Splits a plain text string into fragments with inline logos inserted
function logoifyText(text: string, keyOffset: number): ReactNode[] {
  const result: ReactNode[] = [text]
  let key = keyOffset

  for (const [pattern, logo] of textLogos) {
    const next: ReactNode[] = []
    for (const fragment of result) {
      if (typeof fragment !== 'string') {
        next.push(fragment)
        continue
      }
      let remaining = fragment
      let match: RegExpExecArray | null
      // Reset lastIndex for each fragment
      const re = new RegExp(pattern.source, 'g')
      let lastIdx = 0
      while ((match = re.exec(remaining)) !== null) {
        if (match.index > lastIdx) {
          next.push(remaining.slice(lastIdx, match.index))
        }
        next.push(
          <span key={`logo-${key++}`} className="whitespace-nowrap"><L name={logo} />{' '}{match[0]}</span>
        )
        lastIdx = match.index + match[0].length
      }
      if (lastIdx < remaining.length) {
        next.push(remaining.slice(lastIdx))
      }
    }
    result.length = 0
    result.push(...next)
  }
  return result
}

// Renders a string that may contain [text](url) markdown links, with inline logos
function renderWithLinks(text: string): ReactNode[] {
  const parts = text.split(/(\[.+?\]\(.+?\))/g)
  let key = 0
  const result: ReactNode[] = []
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const match = part.match(/^\[(.+?)\]\((.+?)\)$/)
    if (match) {
      result.push(<a key={i} href={match[2]} className="underline font-bold" target="_blank" rel="noopener noreferrer">{logoifyText(match[1], key)}</a>)
    } else {
      const fragments = logoifyText(part, key)
      key += fragments.length
      result.push(...fragments)
    }
  }
  return result
}

export default function ResumeContent({ resume }: Props) {
  return (
    <div className="font-sans text-gray-950/90">

      {resume.experience.map((job) => (
        <div key={job.company} className="mt-8 first:mt-0">
          <div className="flex justify-between items-baseline gap-4 mb-1">
            <h3 className="m-0 font-bold leading-tight">{(() => {
              if (job.company.startsWith('Huge')) {
                return <><L name="huge" /> <L name="elephant" />{' '}{job.company}</>
              }
              const logo = logoForName(job.company)
              return logo ? <><L name={logo} />{' '}{job.company}</> : job.company
            })()}</h3>
            <span className="text-sm font-bold tabular-nums shrink-0">{job.period}</span>
          </div>
          <p className="text-[14px] italic leading-snug mt-0.5 mb-1">{logoifyText(job.description, 0)}</p>

          {job.clients && (
            <ul className="list-disc ml-5 text-[15px] leading-snug space-y-0">
              {job.clients.map((client) => (
                <li key={client.name} className="italic">
{(() => {
                    const logo = logoForName(client.name)
                    return logo ? <><L name={logo} />{' '}{client.name}</> : client.name
                  })()}
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
        <h3 className="m-0 font-bold leading-tight mb-1">Other contract work</h3>
        <ul className="list-disc ml-5 text-[15px] leading-snug">
          {resume.otherWork.bullets.map((bullet, i) => (
            <li key={i}>{renderWithLinks(bullet)}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-baseline gap-4 mb-1">
          <h3 className="m-0 font-bold leading-tight">Passion projects</h3>
          <span className="text-sm font-bold tabular-nums shrink-0">{resume.passionProjects.period}</span>
        </div>
        <ul className="list-disc ml-5 text-[15px] leading-snug">
          {resume.passionProjects.items.map((item, i) => (
            <li key={i}>
              {logoifyText(item.text, 0)}{item.url && (
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
        <p><strong>Education:</strong> {logoifyText(resume.education, 0)}</p>
      </div>

    </div>
  )
}
