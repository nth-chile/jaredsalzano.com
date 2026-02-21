import matter from "gray-matter"
import { read } from "to-vfile"
import path from "path"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"

export default async function getContentBySlug(slug: string) {
  const filePath = path.join(process.cwd(), `src/content/${slug}.md`)

  const vFile = await read(filePath)

  const { content, data: frontMatter } = matter(String(vFile))

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content)

  const html = String(processed)

  return {
    frontMatter,
    content,
    html,
  }
}
