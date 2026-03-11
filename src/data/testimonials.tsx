import { type ReactNode } from "react";
import L from "@/components/InlineLogo";

export interface Testimonial {
    id: number;
    quote: ReactNode;
    shorterQuote: ReactNode;
    name: string;
    secondLine?: ReactNode;
    linkHref?: string;
    linkText?: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 1234423,
        quote: <>Jared was a pleasure to work with at our shared time at <span className="logo-group"><span className="logo-link"><L name="elephant" /></span>{" "}Elephant</span>. We worked alongside each other with a wide range of web technologies, including <span className="logo-group"><span className="logo-link"><L name="react" /></span>{" "}React</span> and <span className="logo-group"><span className="logo-link"><L name="react" /></span>{" "}React Native</span>. I could count on Jared to raise important UX, engineering and feasibility considerations. Any team would be lucky to have him.</>,
        shorterQuote: <>Jared was a pleasure to work with at our shared time at <span className="logo-group"><span className="logo-link"><L name="elephant" /></span>{" "}Elephant</span>. We worked alongside each other with a wide range of web technologies, including <span className="logo-group"><span className="logo-link"><L name="react" /></span>{" "}React</span> and <span className="logo-group"><span className="logo-link"><L name="react" /></span>{" "}React Native</span>. I could count on Jared to raise important UX, engineering and feasibility considerations. Any team would be lucky to have him.</>,
        name: "Brittney Kernan",
        secondLine: <>Team Leader & Software Engineer at <span className="logo-link"><L name="notion" /></span></>,
    },
    {
        id: 2,
        quote: "Incredibly professional and nice guy to work with. Genuinely went above and beyond the product requirements.",
        shorterQuote: "Incredibly professional and nice guy to work with. Genuinely went above and beyond the product requirements.",
        name: "Avi Muchnick",
        secondLine: <>Cofounder of Aviary (acquired by <span className="logo-link"><L name="adobe" /></span>)</>,
    },
    {
        id: 23,
        quote: "Jared has been a great resource for our firm. He promptly executes on updates to our site and is a pleasure to work with.",
        shorterQuote: "Jared has been a great resource for our firm. He promptly executes on updates to our site and is a pleasure to work with.",
        name: "Susie Baker",
        secondLine: <>Chief Operating Officer at <a href="https://spearstreetcapital.com/" target="_blank" className="logo-link"><L name="spearstreet" /><svg className="inline ml-1" style={{ marginTop: -1 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.31787 9.18188L7.97472 3.52503" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" /><path d="M3.73242 2.81812L8.68217 2.81812L8.68217 7.76786" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" /></svg></a></>,
    },
    {
        id: 4234,
        quote: "Jared is one of the most creative and determined developers you will ever meet. He brings an all-world mindset to his programming, and is unflappable against challenges and roadblocks as they come up. He is an excellent choice for a development project.",
        shorterQuote: "Jared is one of the most creative and determined developers you will ever meet. He brings an all-world mindset to his programming, and is unflappable against challenges and roadblocks as they come up. He is an excellent choice for a development project.",
        name: "Adam Spunberg",
        secondLine: <>Global Head of Operations, 100+ Accelerator, <span className="logo-link"><L name="abinbev" /></span></>,
    },
    {
        id: 54325,
        quote: "Jared was an outstanding software engineer on our team—technically sharp, collaborative, and always focused on delivering high-quality solutions. He consistently took initiative to solve complex problems and improve our product experience, often going above and beyond expectations. Any team would be lucky to have Jared's combination of technical excellence and strong communication skills.",
        shorterQuote: "Jared was an outstanding software engineer on our team—technically sharp, collaborative, and always focused on delivering high-quality solutions. He consistently took initiative to solve complex problems and improve our product experience, often going above and beyond expectations. Any team would be lucky to have Jared's combination of technical excellence and strong communication skills.",
        name: "David Skara",
        secondLine: <>Product Manager at <a href="https://www.elephant.is/" target="_blank" className="logo-link"><L name="elephant" /><svg className="inline ml-1" style={{ marginTop: -1 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.31787 9.18188L7.97472 3.52503" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" /><path d="M3.73242 2.81812L8.68217 2.81812L8.68217 7.76786" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" strokeLinejoin="round" /></svg></a></>,
    },
    {
        id: 1,
        quote: <>Jared was a smart choice to develop my personal portfolio. He accomplished all the things I was worried wouldn&apos;t work and was very patient with all my questions and feedback! He was very responsive and quick with updates. He even met with me in person to show me how to use the custom template he built in <span className="logo-group"><span className="logo-link"><L name="wordpress" /></span>{" "}WordPress</span>. The project met my vision and I am very happy with it. Thank you!</>,
        shorterQuote: <>Jared was a smart choice to develop my personal portfolio. He accomplished all the things I was worried wouldn&apos;t work and was very patient with all my questions and feedback! He was very responsive and quick with updates. He even met with me in person to show me how to use the custom template he built in <span className="logo-group"><span className="logo-link"><L name="wordpress" /></span>{" "}WordPress</span>. The project met my vision and I am very happy with it. Thank you!</>,
        name: "Denise M.",
        secondLine: "Graphic design portfolio client",
    },
    {
        id: 3,
        quote: "Jared was easy to get a hold of and plan out the project with. He was flexible as we had to change things around mid-project and stuck to timelines and budget.",
        shorterQuote: "Jared was easy to get a hold of and plan out the project with. He was flexible as we had to change things around mid-project and stuck to timelines and budget.",
        name: "Zach Holub",
        secondLine: "Physical therapy website client",
    }
];
