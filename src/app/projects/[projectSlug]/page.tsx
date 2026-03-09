import '@/styles/project.css'
import getContentBySlug from "@/utils/getContentBySlug"
import getPreviewsForAllPosts from "@/utils/getPreviewsForAllPosts"
import Image from "next/image"
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
    const { frontMatter } = await getContentBySlug(`posts/${projectSlug}`)
    const title = frontMatter.title ? `${frontMatter.title} - Jared Salzano` : 'Jared Salzano'
    return { title }
  } catch (err) {
    throw err
  }
}

export default async function ProjectPage({ params }: any) {
  const { projectSlug } = await params
  const { frontMatter, content, html } = await getContentBySlug(`posts/${projectSlug}`)

  if (!content || content.trim().length === 0) {
    notFound()
  }

  return (
    <main className='prose prose-img:rounded-lg prose-img:shadow-lg'>
      {frontMatter.featuredImageCaption && (
        <figure>
          <Image className="featured-image" src={frontMatter.featuredImage} alt="Project featured image" width={640} height={400} />
          <figcaption>{frontMatter.featuredImageCaption}</figcaption>
        </figure>
      )}
      {!frontMatter.featuredImageCaption && frontMatter.featuredImage && (
        <Image className="featured-image" src={frontMatter.featuredImage} alt="Project featured image" width={640} height={400} />
      )}
      <h1 className="font-serif text-3xl">{frontMatter.title}</h1>
      <div className="post-markdown-container" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
