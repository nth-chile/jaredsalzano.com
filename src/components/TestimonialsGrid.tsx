import { type Testimonial, testimonials } from "@/data/testimonials";

const gridOrder = [1234423, 2, 23, 4234, 54325, 1, 3];
const testimonialsById = new Map(testimonials.map((testimonial) => [testimonial.id, testimonial]));
const orderedTestimonials = gridOrder
    .map((id) => testimonialsById.get(id))
    .filter((testimonial): testimonial is Testimonial => testimonial !== undefined);

function TestimonialCard({ linkHref, linkText, name, shorterQuote, secondLine }: Testimonial) {
    return (
        <article className="mb-14 break-inside-avoid">
            <blockquote className="text-3xl font-black text-balance mb-4">
                <p>{shorterQuote}</p>
            </blockquote>
            <cite className="not-italic">
                <p className="font-bold text-base">{name}</p>
                {secondLine && <span className="text-sm text-gray-600 [&_.logo-link]:text-2xl [&_.logo-link>svg]:!align-middle [&_.logo-link>img]:!align-middle">{secondLine}</span>}
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
            <div className="prose prose-lg mb-10 lg:mb-14">
                <h2 className="!mt-0">Kind words from people I&apos;ve worked with</h2>
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
                {orderedTestimonials.map((t) => <TestimonialCard key={t.id} {...t} />)}
            </div>
        </div>
    );
}
