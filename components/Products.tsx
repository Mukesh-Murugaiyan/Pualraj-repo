"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, Product } from "@/lib/products";

interface ProductsProps {
  onOpenQuote: () => void;
}

export default function Products({ onOpenQuote }: ProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [visibleCards, setVisibleCards] = useState<number>(3);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>("");
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Responsive visible cards listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, PRODUCTS.length - visibleCards);

  // Reset index when screen size changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [visibleCards]);

  // Auto-play timer (paused when video modal is open)
  useEffect(() => {
    if (!isAutoPlaying || activeVideoUrl || PRODUCTS.length <= visibleCards) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, activeVideoUrl, visibleCards, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      handlePrev();
    }
  };

  return (
    <section id="products" className="py-24 bg-slate-900/60 border-y border-slate-800/60 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3.5 py-1.5 rounded-full border border-brand-orange/20 inline-block">
            Our Automation Machinery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Featured Product Lines
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto rounded-full" />
          <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed">
            Browse our custom-engineered machines, packing towers, conveyor systems, and factory workcells with live operation videos and real project photos.
          </p>
        </div>

        {/* Multi-Card Carousel Container */}
        <div 
          className="relative px-1 sm:px-2"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider Track Viewport */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out -mx-3"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
            >
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  {/* Product Card */}
                  <div className="bg-slate-950 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between h-full group shadow-xl hover:shadow-brand-orange/10">
                    
                    {/* Card Header & Image */}
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-brand-orange/90 text-white font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-md">
                            {product.category}
                          </span>
                        </div>

                        {/* Watch Video Overlay Button */}
                        {product.videoUrl && (
                          <button
                            onClick={() => {
                              setActiveVideoUrl(product.videoUrl || null);
                              setActiveVideoTitle(product.title);
                            }}
                            className="absolute top-3 right-3 bg-slate-950/85 hover:bg-brand-orange text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-brand-orange transition-all duration-200 flex items-center gap-1.5 shadow-lg group/vid cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5 fill-current text-brand-orange group-hover/vid:text-white" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            <span>Watch Video</span>
                          </button>
                        )}

                        {/* Model Ref */}
                        <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-400">
                          Model: TCP-{product.id.toUpperCase()}
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-orange transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                        
                        <p className="text-xs font-medium text-brand-orange/90 italic line-clamp-1">
                          {product.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-300 font-light line-clamp-2 leading-relaxed">
                          {product.desc}
                        </p>

                        {/* Feature bullets */}
                        <div className="pt-2 space-y-1.5 border-t border-slate-900">
                          {product.features.slice(0, 3).map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                              <svg className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-900 flex items-center justify-between gap-3 mt-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 py-2.5 px-3 bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-brand-orange text-white rounded-lg font-bold text-xs transition-all shadow-md shadow-brand-orange/15 hover:shadow-brand-orange/25 flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                      >
                        <span>View Product Details</span>
                        <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>

                      <button
                        onClick={onOpenQuote}
                        className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4 px-2">
            
            {/* Slide Indicators / Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-brand-orange shadow-md shadow-brand-orange/40"
                      : "w-2.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 mr-2">
                Showing <span className="text-white font-bold">{currentIndex + 1} - {Math.min(currentIndex + visibleCards, PRODUCTS.length)}</span> of {PRODUCTS.length}
              </span>
              <button
                onClick={handlePrev}
                aria-label="Previous Product Slide"
                className="p-3 rounded-xl bg-slate-950 hover:bg-brand-orange text-slate-300 hover:text-white border border-slate-800 transition-all duration-200 cursor-pointer shadow-md"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Product Slide"
                className="p-3 rounded-xl bg-slate-950 hover:bg-brand-orange text-slate-300 hover:text-white border border-slate-800 transition-all duration-200 cursor-pointer shadow-md"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Video Modal Lightbox */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <h3 className="font-bold text-white text-base sm:text-lg">
                  {activeVideoTitle} — Factory Operation Video
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800">
              <video
                src={activeVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Your browser does not support playing HTML5 video.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span className="font-mono">TCP Engineering Workshop Footage</span>
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="px-4 py-2 bg-brand-orange hover:bg-orange-500 text-white rounded-lg font-bold transition-colors cursor-pointer"
              >
                Close Video
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
