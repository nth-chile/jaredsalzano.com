"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "@/styles/testimonials.css";

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    small?: boolean;
    secondLine?: string;
    linkHref?: string;
    linkText?: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1234423,
        quote: "Jared was a pleasure to work with at our shared time at Elephant. We worked alongside each other with a wide range of web technologies, including React and React Native. I could count on Jared to raise important UX, engineering and feasibility considerations. Any team would be lucky to have him.",
        name: "Brittney Kernan",
        small: true,
        secondLine: "Team Leader & Software Engineer at Notion",
    },
    {
        id: 4234,
        quote: "Jared is one of the most creative and determined developers you will ever meet. He brings an all-world mindset to his programming, and is unflappable against challenges and roadblocks as they come up. He is an excellent choice for a development project.",
        name: "Adam Spunberg",
        small: true,
        secondLine: "Global Head of Operations, 100+ Accelerator, AB InBev"
    },
    {
        id: 1,
        quote: "Jared was a smart choice to develop my personal portfolio. He accomplished all the things I was worried wouldn't work and was very patient with all my questions and feedback! He was very responsive and quick with updates. He even met with me in person to show me how to use the custom template he built in WordPress. The project met my vision and I am very happy with it. Thank you!",
        name: "Denise M.",
        small: true,
        secondLine: "Graphic design portfolio client",
    },
    {
        id: 54325,
        quote: "Jared was an outstanding software engineer on our team—technically sharp, collaborative, and always focused on delivering high-quality solutions. He consistently took initiative to solve complex problems and improve our product experience, often going above and beyond expectations. Any team would be lucky to have Jared's combination of technical excellence and strong communication skills.",
        name: "David Skara",
        small: true,
        secondLine: "Product Manager at Elephant",
    },
    {
        id: 2,
        quote: "Incredibly professional and nice guy to work with. Genuinely went above and beyond the product requirements.",
        name: "Avi Muchnick",
        secondLine: "Cofounder of Aviary (acquired by Adobe)",
    },
    {
        id: 3,
        quote: "Jared was easy to get a hold of and plan out the project with. He was flexible as we had to change things around mid-project and stuck to timelines and budget.",
        name: "Zach Holub",
        secondLine: "Physical therapy website client",
    },
    {
        id: 23,
        quote: "Jared has been a great resource for our firm. He promptly executes on updates to our site and is a pleasure to work with.",
        name: "Susie Baker",
        linkHref: "https://spearstreetcapital.com/",
        linkText: "spearstreetcapital.com"
    }
];

// Chunk into pairs for two-per-slide layout
const slides: Testimonial[][] = [];
for (let i = 0; i < testimonials.length; i += 2) {
    slides.push(testimonials.slice(i, i + 2));
}

export default function TestimonialsSlider() {
    return (
        <div className="testimonials-slider">
            <Swiper
                autoHeight
                effect={'fade'}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                modules={[A11y, Autoplay, EffectFade, Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
                grabCursor={true}
            >
                {slides.map((pair, slideIndex) => (
                    <SwiperSlide key={slideIndex}>
                        <div className={`pb-16 px-6 sm:px-20 grid gap-0 text-gray-800 ${pair.length > 1 ? 'max-lg:divide-y max-lg:divide-gray-400 lg:grid-cols-2 lg:[grid-template-rows:1fr_auto] lg:divide-x lg:divide-gray-400' : ''}`}>
                            {pair.map(({ linkHref, linkText, id, name, quote, secondLine, small = false }) => (
                                <article key={id} className={`items-start px-4 lg:px-10 max-lg:py-8 ${pair.length > 1 ? 'lg:row-span-2 lg:grid lg:[grid-template-rows:subgrid]' : 'flex flex-col'}`}>
                                    <blockquote className={`font-serif italic text-balance mb-6 ${pair.length > 1 ? 'text-xl' : small ? 'text-2xl' : 'text-3xl'}`} style={{ maxWidth: pair.length > 1 ? undefined : small ? "800px" : "700px" }}>
                                        <p>"{quote}"</p>
                                    </blockquote>
                                    <cite className="not-italic self-start">
                                        <p className="font-bold text-xl">{name}</p>
                                        {secondLine && <span className="not-italic">{secondLine}</span>}
                                        {linkHref && <a href={linkHref} target="_blank" className="text-nowrap hover:border-b border-b-gray-800">{linkText}
                                            <svg className="inline ml-1" style={{ marginTop: -1 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.31787 9.18188L7.97472 3.52503" stroke="black" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M3.73242 2.81812L8.68217 2.81812L8.68217 7.76786" stroke="black" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" />
                                            </svg>
                                        </a>}
                                    </cite>
                                </article>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}
