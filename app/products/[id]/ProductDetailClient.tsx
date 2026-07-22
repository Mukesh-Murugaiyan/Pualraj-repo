"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import QuoteModal from "@/components/QuoteModal";
import LazyImage from "@/components/LazyImage";
import { Product } from "@/lib/products";
import { getYouTubeEmbedUrl } from "@/lib/video";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [activeTab, setActiveTab] = useState<"video" | "specs" | "features" | "apps" | "benefits">(
    product.videoUrl ? "video" : "specs"
  );

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col justify-between selection:bg-brand-orange selection:text-white">
      {/* Header Navigation */}
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-grow pt-28 pb-20">
        
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
            <Link href="/" className="hover:text-brand-orange transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-brand-orange transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-brand-orange font-semibold line-clamp-1">{product.title}</span>
          </nav>
        </div>

        {/* Product Overview Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 bg-slate-950/90 border border-slate-800/80 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 blur-[100px] pointer-events-none rounded-full" />

            {/* Product Media Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Main Lazy Image Viewer */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group shadow-xl">
                <LazyImage
                  src={selectedImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-10">
                  <span className="bg-slate-900/90 border border-slate-800 text-slate-300 px-3 py-1 rounded">
                    Category: {product.category}
                  </span>
                  <span className="bg-brand-orange/20 border border-brand-orange/40 text-brand-orange px-3 py-1 rounded font-bold">
                    EWS Ref: {product.id.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Photo Gallery Thumbnails */}
              {product.gallery && product.gallery.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    Real Factory Photos ({product.gallery.length} Shots Available):
                  </span>
                  <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {product.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                          selectedImage === img
                            ? "border-brand-orange scale-105 shadow-md shadow-brand-orange/30"
                            : "border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600"
                        }`}
                      >
                        <LazyImage src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Spec Highlights grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                  <div key={key} className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-lg space-y-1">
                    <span className="text-[11px] text-slate-400 font-mono block uppercase">{key}</span>
                    <span className="text-sm font-bold text-white block">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Meta Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange rounded-full text-xs font-mono font-semibold uppercase">
                    Industrial Product Datasheet
                  </span>
                  {product.videoUrl && (
                    <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-mono font-semibold uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Operation Video Available
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                  {product.title}
                </h1>

                <p className="text-base sm:text-lg font-medium text-brand-orange/90 italic">
                  {product.subtitle}
                </p>

                <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Top Key Features List */}
              <div className="space-y-3 pt-4 border-t border-slate-850">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Core Engineering Capabilities
                </h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <svg className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inquiry & Action Buttons */}
              <div className="pt-6 flex flex-wrap gap-4 border-t border-slate-850">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="flex-1 min-w-[200px] px-6 py-3.5 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>Request Custom Quote</span>
                </button>
                <Link
                  href="/#contact"
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Contact Sales Team
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* Detailed Information Tabs Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          
          {/* Tab Selection */}
          <div className="flex border-b border-slate-800 overflow-x-auto mb-8 no-scrollbar">
            {product.videoUrl && (
              <button
                onClick={() => setActiveTab("video")}
                className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "video"
                    ? "border-brand-orange text-brand-orange"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Live Machine Video
              </button>
            )}
            <button
              onClick={() => setActiveTab("specs")}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeTab === "specs"
                  ? "border-brand-orange text-brand-orange"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeTab === "features"
                  ? "border-brand-orange text-brand-orange"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              All Features & Design
            </button>
            <button
              onClick={() => setActiveTab("apps")}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeTab === "apps"
                  ? "border-brand-orange text-brand-orange"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Target Applications
            </button>
            <button
              onClick={() => setActiveTab("benefits")}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeTab === "benefits"
                  ? "border-brand-orange text-brand-orange"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Performance & ROI Benefits
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-6 sm:p-8">
            
            {/* Video Tab */}
            {activeTab === "video" && product.videoUrl && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Live Factory Test & Operation Video
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Pualraj Workshop Footage</span>
                </div>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                  {getYouTubeEmbedUrl(product.videoUrl) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(product.videoUrl)!}
                      title={product.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={product.videoUrl}
                      controls
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support playing HTML5 video.
                    </video>
                  )}
                </div>
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === "specs" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Full Technical Datasheet</h3>
                  <span className="text-xs font-mono text-slate-400">Engineering Reference Manual</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm font-mono">
                    <tbody className="divide-y divide-slate-800">
                      {Object.entries(product.specs).map(([key, val], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? "bg-slate-900/40" : "bg-transparent"}>
                          <td className="py-3.5 px-4 text-slate-400 font-semibold w-1/3">{key}</td>
                          <td className="py-3.5 px-4 text-white font-medium">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === "features" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">Complete System Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-slate-800 p-4 rounded-lg flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-200 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === "apps" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">Key Industrial Applications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.applications.map((app, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-slate-800 p-5 rounded-lg space-y-2 hover:border-brand-orange/40 transition-colors">
                      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-brand-orange font-mono font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <h4 className="font-semibold text-white text-sm sm:text-base">{app}</h4>
                      <p className="text-xs text-slate-400 font-light">Custom adapted to site layout and duty cycles.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits Tab */}
            {activeTab === "benefits" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">Operational & Financial Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-slate-800 p-5 rounded-lg flex items-start gap-3">
                      <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-slate-200 leading-relaxed font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Related Products Carousel Section */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-850 pt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase text-brand-orange tracking-widest block mb-1">
                  Explore More Machinery
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Related Products</h2>
              </div>
              <Link href="/#products" className="text-xs sm:text-sm font-semibold text-brand-orange hover:text-white transition-colors">
                View All Products &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <div
                  key={relProduct.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <LazyImage
                        src={relProduct.image}
                        alt={relProduct.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-sm border border-slate-800 px-2.5 py-1 rounded text-[10px] font-mono uppercase text-slate-300 z-10">
                        {relProduct.category}
                      </div>
                    </div>
                    
                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-white text-lg group-hover:text-brand-orange transition-colors">
                        {relProduct.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                        {relProduct.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-900">
                    <span className="text-[11px] font-mono text-slate-500">Ref: EWS-{relProduct.id}</span>
                    <Link
                      href={`/products/${relProduct.id}`}
                      className="px-4 py-2 bg-slate-900 hover:bg-brand-orange text-slate-200 hover:text-white rounded text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
                    >
                      <span>View Details</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call & WhatsApp Widgets */}
      <FloatingActions />

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
