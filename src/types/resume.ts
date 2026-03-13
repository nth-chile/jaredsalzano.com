export interface ResumeClient {
  name: string
  bullets: string[]
}

export interface ResumeBullet {
  text: string
  logo?: string
}

export interface ResumeExperience {
  company: string
  period: string
  description: string
  bullets?: (string | ResumeBullet)[]
  clients?: ResumeClient[]
}

export interface ResumePassionProject {
  text: string
  url?: string | null
}

export interface ResumeData {
  name: string
  website: string
  title: string
  experience: ResumeExperience[]
  otherWork: {
    bullets: string[]
  }
  passionProjects: {
    period: string
    items: ResumePassionProject[]
  }
  tools: string
  education: string
}
