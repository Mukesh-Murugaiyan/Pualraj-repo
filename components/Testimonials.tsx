"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "TCP Automation designed and integrated our robotic pick-and-place cell. The system has been running 3 shifts a day for over a year with zero major breakdowns. Our cycle efficiency went up by 22%. They are our preferred automation partner.",
      author: "Robert Miller",
      title: "VP of Operations",
      company: "Apex Auto Components",
      rating: 5,
    },
    {
      quote: "We needed a custom conveyor indexing line for our pharmaceutical capping machine that complied with strict cleanroom standards. TCP delivered a stainless steel modular design that cleared validation on the first pass. Highly recommended.",
      author: "Dr. Sarah Lin",
      title: "Plant Manager",
      company: "BioMed Laboratories",
      rating: 5,
    },
    {
      quote: "Our aging packaging lines were bottlenecking output. TCP retrofitted the legacy controls with modern Siemens PLCs and wrote a custom SCADA dashboard. The process was completed within a week of scheduled downtime. Outstanding service.",
      author: "Marcus Vance",
      title: "Head of Engineering",
      company: "Nova Pack Foods",
      rating: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Customer Testimonials
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Trusted by Manufacturing Leaders
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded" />
        </div>

        {/* Carousel Card */}
        <div className="relative bg-slate-900/40 border border-slate-800 rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-xl" />
          
          {/* Quote Icon decorative */}
          <div className="text-slate-700/40 absolute top-6 left-6 text-7xl font-serif select-none pointer-events-none">
            “
          </div>

          <div className="relative z-10 space-y-6">
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-brand-orange fill-brand-orange" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed italic">
              &quot;{testimonials[activeIndex].quote}&quot;
            </p>
          </div>

          {/* Author info & controls */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-slate-850 mt-8">
            <div>
              <h4 className="text-base font-bold text-white tracking-wide">
                {testimonials[activeIndex].author}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {testimonials[activeIndex].title}, <span className="text-brand-orange">{testimonials[activeIndex].company}</span>
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-2 self-end sm:self-auto">
              <button
                onClick={handlePrev}
                className="p-2.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded hover:border-slate-600 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded hover:border-slate-600 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
