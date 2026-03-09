import ContinuousImage from "@/components/ContinuousImage";
import ArticlePreview from "@/components/ArticlePreview";
import Marquee from "@/components/Marquee";
import "@/styles/marquee.css";
import "@/styles/home.css";

interface Post {
  frontMatter: any;
  slug: string;
  hasContent?: boolean;
}

export default function ProjectsMarquee({
  posts,
  gridOrder,
  className = "",
}: {
  className?: string;
  posts: Post[];
  gridOrder?: string[];
}) {
  const marqueeItems = posts.map((post, index) => {
    const { frontMatter, slug, hasContent } = post;
    const Wrapper = hasContent ? "a" : "div";
    const wrapperProps = hasContent ? { href: `/projects/${slug}` } : {};

    return (
      <Wrapper
        key={index}
        {...wrapperProps}
        className="block relative h-60 sm:h-72 flex-shrink-0 group cursor-default"
        style={{ aspectRatio: "1.6 / 1" }}
      >
        <ContinuousImage
          src={frontMatter.featuredImage}
          alt={frontMatter.title}
          fill
          sizes="(min-width: 640px) 461px, 384px"
          priority
          className={`${frontMatter.imgClass || ""} object-cover`}
          radius={0.15}
          shadow
          material3d
        >
          {/* Hover Overlay */}
          <div
            className="absolute inset-0 z-20 backdrop-blur-[0.5px] transition-[backdrop-filter] duration-300 group-hover:backdrop-blur-[6px] pointer-events-none"
            style={{
              mask: "linear-gradient(to top, white 0%, white 30%, transparent 90%)",
            }}
          />
          <div className="absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" style={{ transform: "translateZ(0)" }}>
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
              <h2 className="text-white font-semibold text-lg mb-1" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                {frontMatter.title}
              </h2>
              {frontMatter.excerpt && (
                <p className="text-white/85 text-sm line-clamp-3 leading-snug">
                  {frontMatter.excerpt}
                </p>
              )}
              {hasContent && (
                <p className="text-white/85 text-sm mt-2 mb-0">
                  Read more <svg className="inline w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </p>
              )}
            </div>
          </div>
        </ContinuousImage>
      </Wrapper>
    );
  });

  return (
    <>
      {/* Hover devices: scrolling marquee */}
      <Marquee
        className={`marquee-hover marquee projects-marquee flex gap-8 py-10 ${className}`}
        style={{ "--marquee-gap": "2rem" } as React.CSSProperties}
      >
        <div className="shrink-0 flex gap-8 marquee-group">{marqueeItems}</div>
        <div aria-hidden className="shrink-0 flex gap-8 marquee-group">
          {marqueeItems}
        </div>
      </Marquee>

      {/* Touch devices: static grid with text below */}
      <div className="marquee-touch-grid page-container grid-cols-1 lg:grid-cols-2 gap-8 py-8">
        {(gridOrder
          ? gridOrder.map((slug) => posts.find((p) => p.slug === slug)).filter(Boolean) as Post[]
          : posts
        ).map((post, index) => (
          <ArticlePreview
            key={index}
            frontMatter={post.frontMatter}
            slug={post.slug}
            hasContent={post.hasContent}
          />
        ))}
      </div>
    </>
  );
}
