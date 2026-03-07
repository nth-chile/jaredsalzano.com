"use client"

import { useEffect, useState } from "react"

interface Section {
    id: string
    label: string
}

export default function BackgroundTOC({ sections }: { sections: Section[] }) {
    const [activeId, setActiveId] = useState<string | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id)
                }
            },
            { rootMargin: "-10% 0px -80% 0px" }
        )

        sections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [sections])

    return (
        <>
            {/* Mobile + tablet: sticky horizontal bar */}
            <nav
                className="xl:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-200 py-3 px-5 flex gap-2 overflow-x-auto"
                aria-label="Table of contents"
            >
                {sections.map(({ id, label }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className={`text-sm font-medium py-1 px-3 rounded-full border transition-colors duration-200 no-underline whitespace-nowrap ${
                            activeId === id
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-600 border-gray-300"
                        }`}
                    >
                        {label}
                    </a>
                ))}
            </nav>

            {/* Desktop (xl+): fixed left sidebar, right-aligned text with right border */}
            <nav
                className="hidden xl:block fixed top-1/2 -translate-y-1/2 z-30"
                style={{ left: "max(1rem, calc((100vw - 1200px) / 2 - 7rem))" }}
                aria-label="Table of contents"
            >
                <ul className="list-none m-0 p-0 border-r-2 border-gray-200 pr-3 text-right">
                    {sections.map(({ id, label }) => (
                        <li key={id} className="my-2">
                            <a
                                href={`#${id}`}
                                className={`text-sm no-underline transition-colors duration-200 ${
                                    activeId === id
                                        ? "text-black font-semibold"
                                        : "text-gray-400 hover:text-gray-600"
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
