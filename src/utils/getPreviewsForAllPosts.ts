import matter from "gray-matter"
import { readSync } from "to-vfile"
import fsPromises from "fs/promises"
import path from "path"

export default async function getPreviewsForAllPosts() {
  const pathToContentFolder = path.join(process.cwd(), `src/content/posts/`)

  const fileNames = await fsPromises.readdir(pathToContentFolder)

  return fileNames.map((fileName) => {
    const vFile = readSync(`${pathToContentFolder}${fileName}`)
    const { data: frontMatter, content } = matter(String(vFile))
    const slug = fileName.replace(/\.md$/, '')
    const hasContent = content.trim().length > 0
    return { frontMatter, slug, hasContent }
  })
}