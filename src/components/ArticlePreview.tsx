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
    <div className="flex gap-8">
      <div className="relative flex-shrink-0 w-[500px]" style={{ aspectRatio: "16/9" }}>
        <ContinuousImage
          src={
            frontMatter.featuredImage ||
            "https://via.placeholder.com/800x450/e5e7eb/9ca3af?text=Project"
          }
          alt={frontMatter.title}
          fill
          className="object-cover"
          radius={0.15}
          shadow
          material3d
        />
      </div>
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
