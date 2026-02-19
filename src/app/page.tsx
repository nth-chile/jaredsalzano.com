import "@/styles/home.css";
import getPreviewsForAllPosts from "@/utils/getPreviewsForAllPosts";
import { EXPERIENCE_PROJECTS, CLIENT_PROJECTS, PASSION_PROJECTS } from "@/data/projects";
import Footer from "@/components/Footer";

import ArticlePreview from "@/components/ArticlePreview";
import ProjectsMarquee from "@/components/ProjectsMarquee";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import NavLink from "@/components/NavLink";
import ContactButton from "@/components/ContactButton";
import CTASection from "@/components/CTASection";
import ContinuousImage from "@/components/ContinuousImage";
import Image from "next/image";

export default async function Home() {
  const posts = await getPreviewsForAllPosts();
  const postsMap = new Map(posts.map((post) => [post.slug, post]));
  const getPostsBySlug = (slugs: string[]) =>
    slugs.map((slug) => postsMap.get(slug)).filter(Boolean);

  return (
    <>
      <main className="relative bg-white/90 ">
        <section className="pb-16" aria-label="Intro">
          <div className="page-container">
            <div className="pt-8 mb-8 flex gap-4 items-center justify-end">
              <NavLink href="/faq">FAQ</NavLink>
              <ContactButton />
            </div>
            <div className="mb-8">
              <ContinuousImage
                src="/linkedin.jpg"
                alt="Jared Salzano portrait"
                width={190}
                height={190}
                radius={0.25}
                shadow
                material3d
              />
            </div>
            <div className="prose prose-lg">
              <p>
                <b className="font-[500]">
                  Hi. I&apos;m a front-end-leaning full-stack developer
                </b>{" "}
                with 8+ years of experience shipping maintainable,
                high-performance web apps for fast-moving startups, creative
                agencies, and FAANG & Fortune 50 companies. I take ownership of
                projects from planning to deployment, collaborate effectively
                across teams, and love solving complex technical challenges.
                Lately, I&apos;ve been exploring LLMs and emerging AI cloud
                services.
              </p>
              <p>
                I&apos;m{" "}
                <b className="font-[500]">
                  actively looking for a full-time role
                </b>{" "}
                at a thoughtful, purpose-driven startup—NYC or remote—as a
                senior front-end or full-stack developer. I&apos;m also{" "}
                <b className="font-[500]">
                  currently taking on select freelance projects
                </b>
                , always excited to work with new people on fresh challenges.
              </p>
              <p>
                You can see my full resume{" "}
                <a target="_blank" href="/resume.pdf">
                  here
                </a>
                .
              </p>
            </div>
          </div>
        </section>
        <section className="py-16" aria-label="Experience">
          <div className="page-container">
            <div className="prose prose-lg">
              <h1>Experience</h1>
              <div className="not-prose mt-16 -mb-10">
                <ContinuousImage
                  src="/clients/huge-logo.png"
                  alt="Huge Inc. logo"
                  width={120}
                  height={40}
                  radius={0.25}
                />
              </div>
              <h2>Huge Inc. & Elephant</h2>
              <p>
                Over the past several years, I&apos;ve been fortunate to work with
                sister companies{" "}
                <a href="https://www.hugeinc.com/" target="_blank">
                  Huge Inc.
                </a>{" "}
                &{" "}
                <a href="https://www.elephant.is/" target="_blank">
                  Elephant
                </a>{" "}
                on a variety of contract projects. Each engagement has brought new
                challenges, creative problem-solving, and the opportunity to
                collaborate with talented designers, developers, and strategists.
              </p>
            </div>
          </div>
          <div className="my-8">
            <ProjectsMarquee
              posts={getPostsBySlug([...EXPERIENCE_PROJECTS]).filter(
                (post) => post !== undefined
              )}
            />
          </div>
          <div className="page-container mt-16 mb-12">
            <div className="prose prose-lg">
              <h2>Direct Client Work</h2>
              <p>
                Over the years, I&apos;ve worked with a range of companies and
                organizations on projects spanning web development, design
                systems, and creative technology.
              </p>
            </div>
          </div>
          <div className="page-container space-y-8 my-8">
            {getPostsBySlug([...CLIENT_PROJECTS])
              .filter((post) => post !== undefined)
              .map((post, index) => (
                <ArticlePreview
                  key={index}
                  frontMatter={post.frontMatter}
                  slug={post.slug}
                  hasContent={post.hasContent}
                />
              ))}
          </div>
        </section>

        <section className="page-container py-16" aria-label="Passion Projects">
          <div className="prose prose-lg">
            <h1>Passion Projects</h1>
          </div>
          <div className="space-y-8 my-8">
            {getPostsBySlug([...PASSION_PROJECTS])
              .filter((post) => post !== undefined)
              .map((post, index) => (
                <ArticlePreview
                  key={index}
                  frontMatter={post.frontMatter}
                  slug={post.slug}
                  hasContent={post.hasContent}
                />
              ))}
          </div>
        </section>

        <section className="page-container py-16" aria-label="Resume">
          <div className="prose prose-lg">
            <h1>Resume</h1>
            <p>
              You can see my full resume{" "}
              <a target="_blank" href="/resume.pdf">
                here
              </a>
              .
            </p>
          </div>
        </section>
        <section className="bg-white py-8 lg:py-16 border-t border-b border-gray-400" aria-label="Testimonials">
          <TestimonialsSlider />
        </section>
        <CTASection
          heading="Let's work together"
          description={
            <>
              I&apos;m{" "}
              <b className="font-[500]">
                actively looking for a full-time role
              </b>{" "}
              at a thoughtful, purpose-driven startup—NYC or remote—as a senior
              front-end or full-stack developer. I&apos;m also{" "}
              <b className="font-[500]">
                currently taking on select freelance projects
              </b>
              , always excited to work with new people on fresh challenges.
            </>
          }
        />
      </main>
      <div className="relative bg-white/90">
        <Footer />
      </div>
    </>
  );
}
