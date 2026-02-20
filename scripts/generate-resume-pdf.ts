/**
 * Generates public/resume.pdf from src/data/resume.yaml.
 * See README for usage.
 */

import puppeteer from 'puppeteer'
import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
import os from 'os'

const FONT_DIR = '/System/Library/Fonts/Supplemental'

function fontFaces() {
  const variants = [
    { file: 'Arial.ttf',             weight: 'normal', style: 'normal' },
    { file: 'Arial Bold.ttf',        weight: 'bold',   style: 'normal' },
    { file: 'Arial Italic.ttf',      weight: 'normal', style: 'italic' },
    { file: 'Arial Bold Italic.ttf', weight: 'bold',   style: 'italic' },
  ]
  return variants.map(v => {
    const b64 = fs.readFileSync(path.join(FONT_DIR, v.file)).toString('base64')
    return `@font-face {
    font-family: "Arial";
    src: url("data:font/truetype;base64,${b64}") format("truetype");
    font-weight: ${v.weight};
    font-style: ${v.style};
  }`
  }).join('\n  ')
}

const OUTPUT_PATH = path.join(process.cwd(), 'public', 'resume.pdf')

// ---- types ----------------------------------------------------------------

interface ResumeClient { name: string; bullets: string[] }
interface ResumeExperience {
  company: string; period: string; description: string
  bullets?: string[]; clients?: ResumeClient[]
}
interface ResumeData {
  name: string; website: string; title: string
  experience: ResumeExperience[]
  otherWork: { bullets: string[] }
  passionProjects: { period: string; items: Array<{ text: string; url?: string | null }> }
  tools: string; education: string
}

// ---- helpers ---------------------------------------------------------------

function esc(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Renders [text](url) markdown links to HTML
function renderWithLinks(text: string) {
  return esc(text).replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
}

function bullets(items: string[]) {
  return `<ul>${items.map(b => `<li>${renderWithLinks(b)}</li>`).join('')}</ul>`
}

// ---- HTML template ---------------------------------------------------------

function buildHtml(r: ResumeData) {
  const experience = r.experience.map(job => {
    const clientList = job.clients
      ? `<ul>${job.clients.map(c =>
          `<li class="client-name">${esc(c.name)}<ul>${c.bullets.map(b =>
            `<li>${esc(b)}</li>`).join('')}</ul></li>`
        ).join('')}</ul>`
      : ''
    const bulletList = job.bullets ? bullets(job.bullets) : ''
    return `
      <div class="job">
        <div class="job-header">
          <strong>${esc(job.company)}</strong>
          <span>${esc(job.period)}</span>
        </div>
        <div class="description">${esc(job.description)}</div>
        ${clientList}${bulletList}
      </div>`
  }).join('')

  const passionItems = r.passionProjects.items.map(item => {
    const link = item.url ? ` <a href="${esc(item.url)}">(link)</a>` : ''
    return `<li>${esc(item.text)}${link}</li>`
  }).join('')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  /* Arial 10pt, line-height 1.1, margins from Pages-exported PDF */
  ${fontFaces()}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: "Arial", sans-serif;
    font-size: 10pt;
    line-height: 1.1;
    color: #000;
  }
  a { color: #1155CC; }
  .page { padding: 0.619in 0.5in; }

  .header { text-align: center; margin-bottom: 11.7pt; }

  .job { margin-bottom: 11pt; }
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0;
  }
  .job-header strong { font-weight: bold; }
  .job-header span { font-weight: bold; }
  .description { font-style: italic; margin-bottom: 0; }

  ul { padding-left: 18pt; margin: 0; }
  li { margin-bottom: 0; }
  li.client-name { font-style: italic; }
  li.client-name ul li { font-style: normal; }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0;
  }
  .section-header strong { font-weight: bold; }
  .section-header span { font-weight: bold; }

  .footer { margin-top: 11.7pt; }
  .footer p { margin-bottom: 3pt; }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="name">${esc(r.name)} · <a href="https://${esc(r.website)}">${esc(r.website)}</a></div>
    <div class="title">${esc(r.title)}</div>
  </div>

  ${experience}

  <div class="job">
    <div class="job-header"><strong>Other contract work</strong></div>
    ${bullets(r.otherWork.bullets)}
  </div>

  <div class="job">
    <div class="section-header">
      <strong>Passion projects</strong>
      <span>${esc(r.passionProjects.period)}</span>
    </div>
    <ul>${passionItems}</ul>
  </div>

  <div class="footer">
    <p><strong>Preferred development tools:</strong> ${esc(r.tools)}</p>
    <p><strong>Education:</strong> ${esc(r.education)}</p>
  </div>

</div>
</body>
</html>`
}

// ---- main ------------------------------------------------------------------

async function main() {
  const resumePath = path.join(process.cwd(), 'src/data/resume.yaml')
  const resume = yaml.parse(fs.readFileSync(resumePath, 'utf8')) as ResumeData

  const html = buildHtml(resume)
  const tmpFile = path.join(os.tmpdir(), 'resume-print.html')
  fs.writeFileSync(tmpFile, html)

  console.log('Generating resume PDF...')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`file://${tmpFile}`, { waitUntil: 'networkidle0' })
  await page.pdf({
    path: OUTPUT_PATH,
    format: 'Letter',
    printBackground: false,
  })
  await browser.close()

  fs.unlinkSync(tmpFile)
  console.log(`Done → ${OUTPUT_PATH}`)
}

main()
