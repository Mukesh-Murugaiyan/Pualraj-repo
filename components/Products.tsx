"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import LazyImage from "@/components/LazyImage";
import CardSkeleton from "@/components/CardSkeleton";
import { getYouTubeEmbedUrl } from "@/lib/video";

interface ProductsProps {
  onOpenQuote: () => void;
}

export default function Products({ onOpenQuote }: ProductsProps) {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productList, setProductList] = useState<Product[]>([]);

  // Fetch live products from database API
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProductList(data.products);
        } else if (Array.isArray(data) && data.length > 0) {
          setProductList(data);
        }
      })
      .catch((err) => console.error("Error fetching live products:", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

        {/* Loading Skeleton State until products are fetched */}
        {isLoading ? (
          <CardSkeleton count={3} />
        ) : (
          /* Responsive Product Grid: 1 Column on Mobile (One-by-One), 2 on Tablet, 3 on Web View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productList.map((product) => (
              <div
                key={product.id}
                className="bg-slate-950 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between h-full group shadow-xl hover:shadow-brand-orange/10"
              >
                
                {/* Card Header & Lazy Loaded Image */}
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <LazyImage
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 pointer-events-none" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
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
                        className="absolute top-3 right-3 bg-slate-950/85 hover:bg-brand-orange text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-brand-orange transition-all duration-200 flex items-center gap-1.5 shadow-lg group/vid cursor-pointer z-10"
                      >
                        <svg className="w-3.5 h-3.5 fill-current text-brand-orange group-hover/vid:text-white" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Watch Video</span>
                      </button>
                    )}

                    {/* Model Ref */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-400 z-10">
                      Model: EWS-{product.id.toUpperCase()}
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
            ))}
          </div>
        )}

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
              {getYouTubeEmbedUrl(activeVideoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideoUrl)!}
                  title={activeVideoTitle}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support playing HTML5 video.
                </video>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span className="font-mono">Pualraj Engineering Workshop Footage</span>
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
