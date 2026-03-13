import ContinuousImage from "@/components/ContinuousImage";
import Link from "next/link";
import "@/styles/home.css";

export default function ArticlePreview({
  frontMatter,
  slug,
  hasContent,
}: {
  frontMatter: any;
  slug: string;
  hasContent?: boolean;
}) {
  const overlay = (
    <>
      {/* Desktop hover overlay: solid black with white text */}
      <div className="article-preview-overlay absolute inset-0 z-20 bg-black/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      <div className="article-preview-overlay absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <h3 className="text-white font-semibold text-lg leading-snug mb-1">
            {frontMatter.title}
          </h3>
          {frontMatter.excerpt && (
            <p className="text-white/85 text-sm line-clamp-3 mb-0 leading-snug">
              {frontMatter.excerpt}
            </p>
          )}
          {hasContent && (
            <p className="text-white/85 text-sm font-medium mt-2 mb-0 hover:underline pointer-events-auto">
              Read more <svg className="inline w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </p>
          )}
        </div>
      </div>
    </>
  );

  const tile = (
    <div className="article-preview group">
      <div
        className="relative w-full"
        style={{ aspectRatio: "16 / 9" }}
      >
        <ContinuousImage
          src={frontMatter.featuredImage}
          alt={frontMatter.title}
          fill
          sizes="(min-width: 1024px) 540px, calc(100vw - 40px)"
          className={`${frontMatter.imgClass || ""} object-cover`}
          radius={0.06}
          shadow
          material3d
        >
          {overlay}
        </ContinuousImage>
      </div>
      {/* Touch fallback: shown below image on no-hover devices */}
      <div className="article-preview-below mt-3">
        <h3 className="text-lg font-semibold m-0">{frontMatter.title}</h3>
        {frontMatter.excerpt && (
          <p className="text-sm text-gray-600 mt-1 mb-0 line-clamp-3">
            {frontMatter.excerpt}
          </p>
        )}
        {hasContent && (
          <p className="text-sm text-gray-600 mt-2 mb-0">
            Read more <svg className="inline w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </p>
        )}
      </div>
    </div>
  );

  if (hasContent) {
    return (
      <Link href={`/projects/${slug}`} className="block no-underline text-inherit">
        {tile}
      </Link>
    );
  }

  return tile;
}
