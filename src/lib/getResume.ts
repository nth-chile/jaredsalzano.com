import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import type { ResumeData } from '@/types/resume'

export function getResume(): ResumeData {
  const filePath = path.join(process.cwd(), 'src/data/resume.yaml')
  const content = fs.readFileSync(filePath, 'utf8')
  return yaml.parse(content) as ResumeData
}
