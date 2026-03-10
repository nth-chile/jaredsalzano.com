import linkedinImg from "../../public/linkedin.jpg";
import getPreviewsForAllPosts from "@/utils/getPreviewsForAllPosts";
import { EXPERIENCE_PROJECTS, CLIENT_PROJECTS, PASSION_PROJECTS } from "@/data/projects";
import Footer from "@/components/Footer";

import ProjectsMarquee from "@/components/ProjectsMarquee";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import NavLink from "@/components/NavLink";
import ContactButton from "@/components/ContactButton";
import CTASection from "@/components/CTASection";
import ContinuousImage from "@/components/ContinuousImage";
import L from "@/components/InlineLogo";

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
              <NavLink href="/">Overview</NavLink>
              <NavLink href="/resume">Resume</NavLink>
              <ContactButton />
            </div>
            <div className="mb-8">
              <ContinuousImage
                src={linkedinImg}
                alt="Jared Salzano portrait"
                width={190}
                height={190}
                placeholder="blur"
                radius={0.12}
                shadow
                material3d
                priority
              />
            </div>
            <div className="prose prose-lg [&_p]:font-black">
              <p>
                Hi. I&apos;m a front-end-leaning full-stack developer based in
                NYC with 8+ years of experience shipping maintainable,
                high-performance web apps for fast-moving startups, creative
                agencies, and companies like{" "}
                <span className="logo-group"><span className="logo-link"><L name="apple" /></span>{" "}Apple</span>,{" "}
                <span className="logo-group"><span className="logo-link"><L name="openai" /></span>{" "}OpenAI</span>,
                and{" "}<span className="logo-group"><span className="logo-link"><L name="comcast" /></span>{" "}Comcast</span>. I take ownership of
                projects from planning to deployment, collaborate effectively
                across teams, and love solving complex technical challenges.
                Lately, I&apos;ve been exploring LLMs and emerging AI cloud
                services.
              </p>
              <p>
                I&apos;m actively looking for a full-time role at a thoughtful,
                purpose-driven startup—NYC or remote—as a senior front-end or
                full-stack developer. I&apos;m also currently taking on select
                freelance projects, always excited to work with new people on
                fresh challenges.
              </p>
              <p>
                <a
                  href="/resume"
                  className="inline-block no-underline font-medium text-sm tracking-[0.01em] py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Read more
                </a>
              </p>
            </div>
          </div>
        </section>
        <section className="py-16" aria-label="Experience">
          <div className="page-container">
            <div className="prose prose-lg">
              <h1>Experience</h1>
              <h2 className="">Huge & Elephant</h2>
              <p>
                I&apos;ve been fortunate to work with
                sister companies{" "}
                <span className="logo-group"><a href="https://www.hugeinc.com/" target="_blank" className="logo-link" aria-label="Huge"><L name="huge" /></a>{" "}<a href="https://www.hugeinc.com/" target="_blank" className="logo-text">Huge</a></span>{" "}
                &{" "}
                <span className="logo-group"><a href="https://www.elephant.is/" target="_blank" className="logo-link" aria-label="Elephant"><L name="elephant" /></a>{" "}<a href="https://www.elephant.is/" target="_blank" className="logo-text">Elephant</a></span>{" "}
                on a variety of contract projects. Each engagement has brought new
                challenges, creative problem-solving, and the opportunity to
                collaborate with talented designers, developers, and strategists.
              </p>
            </div>
          </div>
          <ProjectsMarquee
            posts={getPostsBySlug([...EXPERIENCE_PROJECTS]).filter(
              (post) => post !== undefined
            )}
            gridOrder={['apple', 'comcast', 'openai', 'elephant-website', 'blackstone']}
          />
          <div className="page-container mt-4">
            <div className="prose prose-lg">
              <h2 className="">Direct Client Work</h2>
              <p>
                Over the years, I&apos;ve worked with a range of companies and
                organizations on projects spanning web development, design
                systems, and creative technology.
              </p>
            </div>
          </div>
          <ProjectsMarquee
            posts={getPostsBySlug([...CLIENT_PROJECTS]).filter(
              (post) => post !== undefined
            )}
            gridOrder={[...CLIENT_PROJECTS]}
            duration={36}
          />
          <div className="page-container mt-4">
            <div className="prose prose-lg">
              <h2>Passion Projects</h2>
            </div>
          </div>
          <ProjectsMarquee
            posts={getPostsBySlug([...PASSION_PROJECTS]).filter(
              (post) => post !== undefined
            )}
            gridOrder={[...PASSION_PROJECTS]}
          />
        </section>

        <section className="bg-white py-12 lg:py-20" aria-label="Testimonials">
          <TestimonialsGrid />
        </section>
        <CTASection
          heading="Let's work together"
          description={
            <>
              I&apos;m actively looking for a full-time role at a thoughtful,
              purpose-driven startup—NYC or remote—as a senior front-end or
              full-stack developer. I&apos;m also currently taking on select
              freelance projects, always excited to work with new people on
              fresh challenges.
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
