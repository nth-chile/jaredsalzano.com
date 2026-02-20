"use client"

import { useState, useEffect, useMemo } from 'react';
import useMediaQuery from '@/utils/useMediaQuery';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadSlim } from "@tsparticles/slim";
import "@/styles/marquee.css";

const emitterDefaults = {
    rate: { delay: 2, quantity: 3 },
    particles: {
        shape: { type: "star" },
        color: { value: "random" },
        size: {
            value: { min: 5, max: 10 },
            random: true
        },
        move: { speed: 2, outMode: "destroy" }
    }
};

export default function TestimonialsMarquee() {
    const [init, setInit] = useState(false);
    const { sm, md, lg } = useMediaQuery();

    const starsXVals = useMemo(() => {
        let left = -2.5, right = 102.5

        if (sm) {
            left = -1.7;
            right = 101.7;
        }

        if (md) {
            left = -1.3;
            right = 101.3;
        }

        if (lg) {
            left = -0.74;
            right = 100.74;
        }

        return { left, right }
    }, [sm, md, lg]);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadEmittersPlugin(engine);
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);


    const items = [
        {
            id: 2,
            quote: "Incredibly professional and nice guy to work with. Genuinely went above and beyond the product requirements.",
            name: "Avi Muchnick",
            secondLine: "Cofounder of Aviary (acquired by Adobe)"
        },
        {
            id: 1,
            quote: "Jared was a smart choice to develop my personal portfolio. He accomplished all the things I was worried wouldn’t work and was very patient with all my questions and feedback! He was very responsive and quick with updates. He even met with me in person to show me how to use the custom template he built in WordPress. The project met my vision and I am very happy with it. Thank you!",
            name: "Denise M.",
            small: true
        },
        {
            id: 23,
            quote: "Jared has been a great resource for our firm. He promptly executes on updates to our site and is a pleasure to work with.",
            name: "Susie Baker",
            linkHref: "https://spearstreetcapital.com/",
            linkText: "spearstreetcapital.com"
        },
        {
            id: 3,
            quote: "Jared was easy to get a hold of and plan out the project with. He was flexible as we had to change things around mid-project and stuck to timelines and budget.",
            name: "Zach Holub",
        }
    ]
        .map(({ linkHref, linkText, id, name, quote, secondLine, small = false }) =>
            <article
                key={id}
                className="bg-white/80 rounded-ss p-4 sm:px-6 flex flex-col justify-between shadow text-(--tw-prose-body) max-w-[65ch]"
            >
                <blockquote className={`${small ? 'text-md leading-(--text-md--line-height)' : 'text-2xl leading-(--text-2xl--line-height)'} font-[500] mb-2`}>
                    <p>&#x201C;{quote}&#x201D;</p>
                </blockquote>
                <cite>
                    <p className="not-italic font-bold">{name}</p>
                    {secondLine && <span className="not-italic text-sm">{secondLine}</span>}
                    {linkHref && <a href={linkHref} target="_blank" className="text-sm text-nowrap not-italic hover:border-b focus:border-b">{linkText}
                        <svg className="inline ml-1" style={{ marginTop: -1 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.31787 9.18188L7.97472 3.52503" stroke="black" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" />
                            <path d="M3.73242 2.81812L8.68217 2.81812L8.68217 7.76786" stroke="black" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" />
                        </svg>
                    </a>}
                </cite>
            </article>
        )

    return (
        <div className='marquee overflow-hidden flex gap-4 py-4'>
            <div className='shrink-0 flex gap-4 marquee-group'>{items}</div>
            <div aria-hidden className='shrink-0 flex gap-4 marquee-group'>{items}</div>
            {/* {init && <Particles
                className="particles sm:rounded-2xl overflow-hidden"
                options={{
                    fpsLimit: 60,
                    fullScreen: { enable: false },
                    particles: {
                        move: { enable: true, outModes: { default: "destroy" } },
                        number: { value: 0 },
                        opacity: {
                            animation: {
                                count: 1,
                                // decay: .5,
                                delay: { min: 0, max: 2 },
                                destroy: "min",
                                enable: true,
                                mode: "decrease",
                                speed: 2,
                                startValue: "max"
                            },
                            value: { max: 0.3, min: 0 }
                        }
                    },
                    emitters: [
                        {
                            ...emitterDefaults,
                            direction: "top-right",
                            position: { x: starsXVals.left, y: 50 },
                        },
                        {
                            ...emitterDefaults,
                            direction: "top-left",
                            position: { x: starsXVals.right, y: 50 },
                        }
                    ]
                }}
            />
            } */}
        </div>
    );

}