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
import { type Testimonial, testimonials } from "@/data/testimonials";

const sliderOrder = [1234423, 4234, 1, 54325, 2, 3, 23];
const compactQuoteIds = new Set([1234423, 4234, 1, 54325]);
const testimonialsById = new Map(testimonials.map((testimonial) => [testimonial.id, testimonial]));
const orderedTestimonials = sliderOrder
    .map((id) => testimonialsById.get(id))
    .filter((testimonial): testimonial is Testimonial => testimonial !== undefined);

// Chunk into pairs for two-per-slide layout
const slides: Testimonial[][] = [];
for (let i = 0; i < orderedTestimonials.length; i += 2) {
    slides.push(orderedTestimonials.slice(i, i + 2));
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
                            {pair.map(({ linkHref, linkText, id, name, quote, secondLine }) => (
                                <article key={id} className={`items-start px-4 lg:px-10 max-lg:py-8 ${pair.length > 1 ? 'lg:row-span-2 lg:grid lg:[grid-template-rows:subgrid]' : 'flex flex-col'}`}>
                                    <blockquote className={`font-serif italic text-balance mb-6 ${pair.length > 1 ? 'text-xl' : compactQuoteIds.has(id) ? 'text-2xl' : 'text-3xl'}`} style={{ maxWidth: pair.length > 1 ? undefined : compactQuoteIds.has(id) ? "800px" : "700px" }}>
                                        <p>"{quote}"</p>
                                    </blockquote>
                                    <cite className="not-italic self-start">
                                        <p className="font-bold text-xl">{name}</p>
                                        {secondLine && <span className="not-italic [&_.logo-link]:text-xl">{secondLine}</span>}
                                        {linkHref && <a href={linkHref} target="_blank" className="text-nowrap hover:border-b border-b-gray-800">{linkText}</a>}
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
