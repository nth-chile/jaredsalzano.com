"use client"

import { useCallback, useEffect, useState } from "react"

interface Section {
    id: string
    label: string
}

export default function BackgroundTOC({ sections }: { sections: Section[] }) {
    const [activeId, setActiveId] = useState<string | null>(null)

    useEffect(() => {
        const getActiveSection = () => {
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i].id)
                if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
                    return sections[i].id
                }
            }
            return null
        }

        const onScroll = () => {
            setActiveId(getActiveSection())
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        onScroll()

        return () => window.removeEventListener("scroll", onScroll)
    }, [sections])

    const handleClick = useCallback((id: string) => {
        setActiveId(id)
    }, [])

    return (
        <>
            {/* Mobile + tablet: sticky horizontal tabs */}
            <nav
                className="md:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md py-3 px-[20px] sm:px-[60px] flex gap-6 overflow-x-auto"
                aria-label="Table of contents"
            >
                {sections.map(({ id, label }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        onClick={() => handleClick(id)}
                        className={`text-sm font-medium py-1.5 no-underline whitespace-nowrap transition-all duration-200 border-b-2 ${
                            activeId === id
                                ? "text-black border-black"
                                : "text-gray-400 border-transparent hover:text-gray-600"
                        }`}
                    >
                        {label}
                    </a>
                ))}
            </nav>

            {/* Desktop: fixed left sidebar with active indicator */}
            <nav
                className="hidden md:block fixed top-1/2 -translate-y-1/2 z-30 w-[80px]"
                style={{ left: "calc(max(0px, (100vw - 1200px) / 2) + var(--toc-offset, 40px))" }}
                aria-label="Table of contents"
            >
                <ul className="list-none m-0 p-0 text-right">
                    {sections.map(({ id, label }) => (
                        <li key={id} className="my-1">
                            <a
                                href={`#${id}`}
                                onClick={() => handleClick(id)}
                                className={`text-[13px] no-underline transition-all duration-200 inline-block py-1 pr-3 border-r-2 ${
                                    activeId === id
                                        ? "text-black border-black"
                                        : "text-gray-300 hover:text-gray-500 border-transparent"
                                }`}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
