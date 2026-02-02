import Image from 'next/image'
import '@/styles/project.css'
import getContentBySlug from "@/utils/getContentBySlug"
import getPreviewsForAllPosts from "@/utils/getPreviewsForAllPosts"
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPreviewsForAllPosts()
  return posts
    .filter(post => post.hasContent)
    .map(post => ({
      projectSlug: post.slug
    }))
}

export async function generateMetadata({ params }: any) {
  try {
    const { projectSlug } = await params
    const content = await getContentBySlug(`posts/${projectSlug}`)

    let title = `Jared Salzano`

    if (content.frontMatter.title) {
      title = `${content.frontMatter.title} - ${title}`
    }

    return { title };
  } catch (err) {
    throw err
  }
}

export default async function ProjectPage({ params }: any) {
  let frontMatter
  let html
  
  const { projectSlug } = await params
  const content = await getContentBySlug(`posts/${projectSlug}`)
  frontMatter = content.frontMatter
  html = content.html

  if (!html || html.trim().length === 0) {
    notFound()
  }

  return (
    <>
      <main className='prose prose-img:rounded prose-img:shadow-lg'>
        {frontMatter.featuredImage && frontMatter.featuredImageCaption && (
          <figure>
            <Image className="featured-image" src={frontMatter.featuredImage} alt="Project featured image" width={640} height={400} />
            <figcaption>{frontMatter.featuredImageCaption}</figcaption>
          </figure>
        )}
        {frontMatter.featuredImage && !frontMatter.featuredImageCaption && (
          <Image className="featured-image" src={frontMatter.featuredImage} alt="Project featured image" width={640} height={400} />
        )}
        <h1 className="font-serif text-3xl">{frontMatter.title}</h1>
        <div className="post-markdown-container" dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    </>
  )
}
