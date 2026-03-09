import { type ReactNode } from "react";
import L from "@/components/InlineLogo";

interface Testimonial {
    id: number;
    quote: string;
    name: string;
    secondLine?: ReactNode;
    linkHref?: string;
    linkText?: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1234423,
        quote: "Jared was a pleasure to work with at our shared time at Elephant. We worked alongside each other with a wide range of web technologies, including React and React Native. I could count on Jared to raise important UX, engineering and feasibility considerations. Any team would be lucky to have him.",
        name: "Brittney Kernan",
        secondLine: <>Team Leader & Software Engineer at <span className="logo-link"><L name="notion" /></span></>,
    },
    {
        id: 2,
        quote: "Incredibly professional and nice guy to work with. Genuinely went above and beyond the product requirements.",
        name: "Avi Muchnick",
        secondLine: <>Cofounder of Aviary (acquired by <span className="logo-link"><L name="adobe" /></span>)</>,
    },
    {
        id: 23,
        quote: "Jared has been a great resource for our firm. He promptly executes on updates to our site and is a pleasure to work with.",
        name: "Susie Baker",
        secondLine: <><span className="logo-link"><L name="spearstreet" /></span></>,
        linkHref: "https://spearstreetcapital.com/",
        linkText: "spearstreetcapital.com",
    },
    {
        id: 4234,
        quote: "Jared is one of the most creative and determined developers you will ever meet. He brings an all-world mindset to his programming, and is unflappable against challenges and roadblocks as they come up. He is an excellent choice for a development project.",
        name: "Adam Spunberg",
        secondLine: <>Global Head of Operations, 100+ Accelerator, <span className="logo-link"><L name="abinbev" /></span></>,
    },
    {
        id: 54325,
        quote: "Jared was an outstanding software engineer on our team—technically sharp, collaborative, and always focused on delivering high-quality solutions. He consistently took initiative to solve complex problems and improve our product experience, often going above and beyond expectations. Any team would be lucky to have Jared's combination of technical excellence and strong communication skills.",
        name: "David Skara",
        secondLine: <>Product Manager at <span className="logo-link"><L name="elephant" /></span></>,
    },
    {
        id: 1,
        quote: "Jared was a smart choice to develop my personal portfolio. He accomplished all the things I was worried wouldn't work and was very patient with all my questions and feedback! He was very responsive and quick with updates. He even met with me in person to show me how to use the custom template he built in WordPress. The project met my vision and I am very happy with it. Thank you!",
        name: "Denise M.",
        secondLine: "Graphic design portfolio client",
    },
    {
        id: 3,
        quote: "Jared was easy to get a hold of and plan out the project with. He was flexible as we had to change things around mid-project and stuck to timelines and budget.",
        name: "Zach Holub",
        secondLine: "Physical therapy website client",
    }
];

function TestimonialCard({ linkHref, linkText, name, quote, secondLine }: Testimonial) {
    return (
        <article className="mb-8 break-inside-avoid">
            <blockquote className="font-serif italic text-2xl text-gray-800 text-balance mb-4">
                <p>{quote}</p>
            </blockquote>
            <cite className="not-italic">
                <p className="font-bold text-base">{name}</p>
                {secondLine && <span className="text-sm text-gray-600 [&_.logo-link]:text-lg">{secondLine}</span>}
                {linkHref && <a href={linkHref} target="_blank" className="text-sm text-nowrap hover:border-b border-b-gray-800">{linkText}
                    <svg className="inline ml-1" style={{ marginTop: -1 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.31787 9.18188L7.97472 3.52503" stroke="black" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" />
                        <path d="M3.73242 2.81812L8.68217 2.81812L8.68217 7.76786" stroke="black" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" />
                    </svg>
                </a>}
            </cite>
        </article>
    );
}

export default function TestimonialsGrid() {
    return (
        <div className="page-container">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800 mb-10 lg:mb-14 text-balance max-w-4xl">
                Kind words from people I&apos;ve worked with
            </p>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
                {testimonials.map((t) => <TestimonialCard key={t.id} {...t} />)}
            </div>
        </div>
    );
}
