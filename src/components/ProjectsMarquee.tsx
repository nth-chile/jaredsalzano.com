import ContinuousImage from "@/components/ContinuousImage";
import "@/styles/marquee.css";

interface Post {
  frontMatter: any;
  slug: string;
  hasContent?: boolean;
}

export default function ProjectsMarquee({
  posts,
  className = "",
}: {
  className?: string;
  posts: Post[];
}) {
  const items = posts.map((post, index) => {
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
          sizes="(min-width: 640px) 461px, 384px" // depends on sm:h-72 (288px) and h-60 (240px) * aspectRatio 1.6
          priority
          className={`${frontMatter.imgClass || ""} object-cover`}
          radius={0.15}
          shadow
          material3d
        >
          {/* Hover Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/40 via-black/30 to-transparent pointer-events-none">
            <h2 className="text-white font-semibold text-xl mb-2 drop-shadow-sm">
              {frontMatter.title}
            </h2>
            {frontMatter.excerpt && (
              <p className="text-white/90 text-sm line-clamp-4 drop-shadow-sm">
                {frontMatter.excerpt}
              </p>
            )}
          </div>
        </ContinuousImage>
      </Wrapper>
    );
  });

  return (
    <div
      className={`marquee projects-marquee overflow-hidden flex gap-8 py-10 ${className}`}
      style={{ "--marquee-gap": "2rem" } as React.CSSProperties}
    >
      <div className="shrink-0 flex gap-8 marquee-group">{items}</div>
      <div aria-hidden className="shrink-0 flex gap-8 marquee-group">
        {items}
      </div>
    </div>
  );
}
