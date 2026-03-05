import getPreviewsForAllPosts from "@/utils/getPreviewsForAllPosts"

import { ALL_PROJECTS } from "@/data/projects"

export async function getNextProject(projectSlug: string) {
  const allProjectSlugs = ALL_PROJECTS
  const posts = await getPreviewsForAllPosts()

  const currentIndex = allProjectSlugs.indexOf(projectSlug as any)

  // Start from the next project and look for the first one that is an article (has content)
  for (let i = currentIndex + 1; i < allProjectSlugs.length; i++) {
    const nextSlug = allProjectSlugs[i]
    const nextPost = posts.find((p) => p.slug === nextSlug)

    if (nextPost && nextPost.hasContent) {
      return nextPost
    }
  }

  return null
}
