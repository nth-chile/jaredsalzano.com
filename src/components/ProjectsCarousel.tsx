"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import ContinuousImage from "@/components/ContinuousImage";
import "@/styles/carousel.css";

interface Post {
  frontMatter: any;
  slug: string;
  hasContent?: boolean;
}

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function ProjectsCarousel({
  posts,
  className = "",
}: {
  posts: Post[];
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  // Close expanded card when tapping outside or scrolling
  useEffect(() => {
    if (expandedIndex === null) return;
    const el = scrollRef.current;
    const close = () => setExpandedIndex(null);
    el?.addEventListener("scroll", close, { passive: true });
    const handleTapOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".carousel-item")) close();
    };
    document.addEventListener("pointerdown", handleTapOutside);
    return () => {
      el?.removeEventListener("scroll", close);
      document.removeEventListener("pointerdown", handleTapOutside);
    };
  }, [expandedIndex]);

  const scroll = useCallback((direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }, []);

  const handleTouchTap = useCallback((e: React.MouseEvent, index: number, hasContent?: boolean) => {
    // Only intercept on touch devices
    if (window.matchMedia("(hover: hover)").matches) return;

    if (expandedIndex === index) {
      // Already expanded — let the link navigate (if it's a link)
      return;
    }

    // First tap: expand the overlay, don't navigate
    e.preventDefault();
    setExpandedIndex(index);
  }, [expandedIndex]);

  return (
    <div className={`carousel-wrapper ${className}`}>
      {/* Left fade + arrow */}
      <div
        className={`carousel-edge carousel-edge-left ${canScrollLeft ? "carousel-edge-visible" : ""}`}
      >
        <button
          className="carousel-arrow"
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          tabIndex={canScrollLeft ? 0 : -1}
        >
          <ArrowLeft />
        </button>
      </div>

      {/* Scrollable track */}
      <div ref={scrollRef} className="carousel-track">
        {posts.map((post, index) => {
          const { frontMatter, slug, hasContent } = post;
          const Wrapper = hasContent ? "a" : "div";
          const wrapperProps = hasContent
            ? { href: `/projects/${slug}` }
            : {};
          const isExpanded = expandedIndex === index;

          return (
            <Wrapper
              key={slug || index}
              {...wrapperProps}
              className={`carousel-item group ${isExpanded ? "carousel-item-expanded" : ""}`}
              onClick={(e: React.MouseEvent) => handleTouchTap(e, index, hasContent)}
            >
              <div className="carousel-item-image">
                <ContinuousImage
                  src={frontMatter.featuredImage}
                  alt={frontMatter.title}
                  fill
                  sizes="(min-width: 640px) 461px, 384px"
                  priority
                  className={`${frontMatter.imgClass || ""} object-cover`}
                  radius={0.06}
                  shadow
                  material3d
                >
                  {/* Solid black overlay (desktop hover) / touch expanded */}
                  <div className="carousel-overlay-bg absolute inset-0 z-20 bg-black/90 pointer-events-none transition-opacity duration-300" />
                  {/* Bottom gradient for touch title readability */}
                  <div
                    className="carousel-overlay-gradient absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)" }}
                  />
                  {/* Text overlay */}
                  <div
                    className="carousel-overlay-info absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
                  >
                    <div className="absolute inset-0 flex flex-col justify-end px-3 pt-3 pb-4 sm:p-5">
                      <h2 className="text-white font-semibold text-lg leading-snug">
                        {frontMatter.title}
                      </h2>
                      {/* Excerpt + Read more: visible on hover (desktop) or when expanded (touch) */}
                      <div className="carousel-overlay-details">
                        <div>
                          {frontMatter.excerpt && (
                            <p className="text-white/85 text-sm line-clamp-3 leading-snug pt-1">
                              {frontMatter.excerpt}
                            </p>
                          )}
                          {hasContent && (
                            <p className="text-white/85 text-sm font-medium mt-2 mb-0 hover:underline pointer-events-auto">
                              Read more{" "}
                              <svg
                                className="inline w-3 h-3 ml-0.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ContinuousImage>
              </div>
            </Wrapper>
          );
        })}
      </div>

      {/* Right fade + arrow */}
      <div
        className={`carousel-edge carousel-edge-right ${canScrollRight ? "carousel-edge-visible" : ""}`}
      >
        <button
          className="carousel-arrow"
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          tabIndex={canScrollRight ? 0 : -1}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
