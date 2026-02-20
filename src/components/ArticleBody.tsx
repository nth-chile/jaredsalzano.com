'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import ContinuousImage from './ContinuousImage'

export default function ArticleBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        p({ node, children }) {
          // Unwrap paragraphs that only contain an image so we don't get div-in-p
          const onlyChild = node?.children?.[0]
          if (node?.children?.length === 1 && onlyChild?.type === 'element' && (onlyChild as any).tagName === 'img') {
            return <>{children}</>
          }
          return <p>{children}</p>
        },
        img({ src, alt }) {
          if (!src) return null
          return (
            <div className="not-prose my-8">
              <ContinuousImage
                src={src}
                alt={alt ?? ''}
                width={0}
                height={0}
                sizes="(min-width: 820px) 65ch, 100vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                radius={0.15}
                shadow
                material3d
                block
              />
            </div>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
