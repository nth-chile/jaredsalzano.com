import ContinuousImage from "@/components/ContinuousImage";
import Link from "next/link";

export default function ArticlePreview({
  frontMatter,
  slug,
  hasContent,
}: {
  frontMatter: any;
  slug: string;
  hasContent?: boolean;
}) {
  const inner = (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-6">
      {frontMatter.featuredImage && (
        <div className="relative w-full lg:flex-shrink-0 lg:w-[420px]" style={{ aspectRatio: "16/9" }}>
          <ContinuousImage
            src={frontMatter.featuredImage}
            alt={frontMatter.title}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) calc(100vw - 120px), calc(100vw - 40px)" // depends on lg:w-[420px] and page-container padding (60px/20px)
            className="object-cover"
            radius={0.15}
            shadow
            material3d
          />
        </div>
      )}
      <div className="prose prose-lg flex-1">
        <h3 className="text-2xl font-semibold mt-0 group-hover:underline">{frontMatter.title}</h3>
        <p>{frontMatter.excerpt}</p>
      </div>
    </div>
  );

  if (hasContent) {
    return (
      <Link href={`/projects/${slug}`} className="block no-underline group">
        {inner}
      </Link>
    );
  }

  return inner;
}
