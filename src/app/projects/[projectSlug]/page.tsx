import ContinuousImage from '@/components/ContinuousImage'
import ArticleBody from '@/components/ArticleBody'
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
    const { frontMatter } = await getContentBySlug(`posts/${projectSlug}`)
    const title = frontMatter.title ? `${frontMatter.title} - Jared Salzano` : 'Jared Salzano'
    return { title }
  } catch (err) {
    throw err
  }
}

export default async function ProjectPage({ params }: any) {
  const { projectSlug } = await params
  const { frontMatter, content } = await getContentBySlug(`posts/${projectSlug}`)

  if (!content || content.trim().length === 0) {
    notFound()
  }

  return (
    <main className='prose'>
      {frontMatter.featuredImage && frontMatter.featuredImageWidth && (
        <figure>
          <div className="not-prose" style={{ position: 'relative', aspectRatio: `${frontMatter.featuredImageWidth} / ${frontMatter.featuredImageHeight}` }}>
            <ContinuousImage
              src={frontMatter.featuredImage}
              alt="Project featured image"
              fill
              sizes="(min-width: 820px) 65ch, 100vw"
              className="object-cover"
              radius={0.15}
              shadow
              material3d
            />
          </div>
          {frontMatter.featuredImageCaption && (
            <figcaption>{frontMatter.featuredImageCaption}</figcaption>
          )}
        </figure>
      )}
      <h1 className="font-serif text-3xl">{frontMatter.title}</h1>
      <ArticleBody content={content} />
    </main>
  )
}
