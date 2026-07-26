"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import QuoteModal from "@/components/QuoteModal";
import { Product } from "@/lib/products";

interface ProductsClientCatalogProps {
  initialProducts: Product[];
}

export default function ProductsClientCatalog({ initialProducts }: ProductsClientCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [quoteProductTitle, setQuoteProductTitle] = useState<string>("");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(initialProducts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [initialProducts]);

  // Filter products based on search & category
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product?.category === selectedCategory;
      const matchesSearch =
        product?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product?.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product?.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  const handleOpenQuoteForProduct = (title: string) => {
    setQuoteProductTitle(title);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col justify-between selection:bg-brand-orange selection:text-white">
      <Navbar onOpenQuote={() => handleOpenQuoteForProduct("")} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
              EWS Product Catalog & Engineering Lineup
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Industrial Weighing Machines & SPM Solutions
            </h1>
            <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full" />
            <p className="text-slate-400 font-light text-base leading-relaxed">
              Explore our comprehensive lineup of OIML-certified load cell systems, dynamic inline checkweighers, hopper batching systems, and custom automated weighing machinery built for heavy industry.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-12 shadow-xl backdrop-blur-md space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search products by title or spec..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange transition-colors"
                />
                <svg
                  className="w-5 h-5 text-slate-500 absolute left-3 top-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Counter badge */}
              <span className="text-xs font-mono text-slate-400">
                Showing <strong className="text-brand-orange font-bold">{filteredProducts.length}</strong> of {initialProducts.length} Products
              </span>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedCategory === cat
                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                    : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product?.id}
                  className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-brand-orange/40 transition-all duration-300 group flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                      {product?.image ? (
                        <Image
                          src={product?.image}
                          alt={product?.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs">
                          [EWS Product Image]
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[10px] font-mono font-bold text-brand-orange uppercase">
                        {product?.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <h2 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors">
                        {product?.title}
                      </h2>
                      {product?.subtitle && (
                        <p className="text-xs font-mono text-slate-400">
                          {product?.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-slate-400 line-clamp-3 font-light leading-relaxed">
                        {product?.desc}
                      </p>

                      {/* Specs Highlights */}
                      {product?.specs && (
                        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px] font-mono">
                          {Object.entries(product?.specs).slice(0, 2).map(([key, val]) => (
                            <span
                              key={key}
                              className="px-2.5 py-1 bg-slate-950 rounded border border-slate-850 text-slate-300"
                            >
                              <span className="text-slate-500">{key}:</span> {val}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 flex items-center gap-3">
                    <Link
                      href={`/products/${product?.id}`}
                      className="flex-1 text-center py-2.5 px-4 bg-slate-950 border border-slate-800 hover:border-brand-orange text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      View Specs & Details
                    </Link>
                    <button
                      onClick={() => handleOpenQuoteForProduct(product?.title)}
                      className="py-2.5 px-4 bg-brand-orange text-white text-xs font-bold rounded-xl hover:bg-orange-500 transition-colors cursor-pointer shadow-md shadow-brand-orange/20"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <h3 className="text-xl font-bold text-white">No products found</h3>
              <p className="text-slate-400 text-sm">
                No EWS product matched your filter &quot;{searchQuery}&quot;. Please try resetting your search or filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2 bg-brand-orange text-white font-bold text-xs rounded-lg hover:bg-orange-500 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <FloatingActions />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
