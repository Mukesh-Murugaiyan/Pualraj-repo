"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/products";
import ProductModal from "./ProductModal";

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Delete Confirmation State
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products for admin:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;
    const targetId = deletingProduct.id;
    setIsDeleting(true);

    // 1. Optimistically remove deleted product from UI state immediately
    setProducts((prev) => prev.filter((p) => p.id !== targetId));
    setDeletingProduct(null);

    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(targetId)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // 2. Fetch fresh products & revalidate Next.js cache
        await fetchProducts();
        router.refresh();
      } else {
        // Revert on failure
        await fetchProducts();
      }
    } catch (err) {
      console.error("Delete product error:", err);
      await fetchProducts();
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter products
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate Metrics
  const totalSubImages = products.reduce((acc, p) => acc + (p.gallery?.length || 0), 0);
  const totalVideos = products.filter((p) => Boolean(p.videoUrl)).length;

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans pb-20">
      
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-orange/20">
            P
          </div>
          <div>
            <h1 className="font-bold text-white text-base sm:text-lg leading-tight flex items-center gap-2">
              Pualraj Admin Dashboard
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-orange/20 text-brand-orange border border-brand-orange/30">
                v2.0 Neon + R2
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-light">
              Industrial Product Catalog & Cloud Storage Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>View Live Site</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-brand-orange hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-brand-orange/20 flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Machinery Product</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Metrics Dashboard Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Products</span>
            <div className="text-3xl font-extrabold text-white">{products.length}</div>
            <p className="text-[11px] text-slate-500">Live in Neon PostgreSQL DB</p>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Cloudflare R2 Photos</span>
            <div className="text-3xl font-extrabold text-brand-orange">{totalSubImages}</div>
            <p className="text-[11px] text-slate-500">High-Res Industrial Assets</p>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Factory Videos</span>
            <div className="text-3xl font-extrabold text-emerald-400">{totalVideos}</div>
            <p className="text-[11px] text-slate-500">Live Workshop Operation Clips</p>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Storage Bucket</span>
            <div className="text-sm font-bold text-slate-200 truncate">pualraj-bucket</div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Cloudflare R2 Active
            </p>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search product title or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange transition-colors"
            />
            <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter Pills & View Toggles */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-brand-orange text-white"
                      : "bg-slate-900 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
                }`}
                aria-label="Grid View"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "table" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
                }`}
                aria-label="Table View"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Product Cards Display Grid / Table */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-slate-400">Loading products from Neon PostgreSQL...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">No Machinery Products Found</h3>
            <p className="text-xs text-slate-400 font-light max-w-sm mx-auto">
              No product matches your search query or selected filter. Click below to add a new product.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Add New Product
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-slate-950 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                    
                    <div className="absolute top-3 left-3 bg-brand-orange/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {prod.category}
                    </div>

                    {prod.videoUrl && (
                      <div className="absolute top-3 right-3 bg-emerald-500/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Video
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 font-mono text-[11px] text-slate-400">
                      ID: {prod.id}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-white text-lg group-hover:text-brand-orange transition-colors line-clamp-1">
                      {prod.title}
                    </h3>
                    <p className="text-xs font-medium text-brand-orange/90 italic line-clamp-1">
                      {prod.subtitle}
                    </p>
                    <p className="text-xs text-slate-300 font-light line-clamp-2 leading-relaxed">
                      {prod.desc}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-900">
                      <span>{prod.gallery?.length || 0} Photos</span>
                      <span>{Object.keys(prod.specs || {}).length} Specs</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-900 mt-2">
                  <button
                    onClick={() => handleOpenEditModal(prod)}
                    className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition-colors border border-slate-700/80 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeletingProduct(prod)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs transition-colors cursor-pointer"
                    aria-label="Delete Product"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-900 text-slate-400 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Media</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img src={prod.image} alt={prod.title} className="w-10 h-8 rounded object-cover border border-slate-800" />
                        <div>
                          <div className="font-bold text-white text-sm">{prod.title}</div>
                          <div className="text-[10px] font-mono text-slate-500">ID: {prod.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-900 border border-slate-800 text-brand-orange px-2.5 py-1 rounded text-[10px] font-mono uppercase">
                        {prod.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {prod.gallery?.length || 0} Photos {prod.videoUrl ? "• Video" : ""}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded font-semibold text-xs border border-slate-700 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingProduct(prod)}
                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded font-semibold text-xs border border-red-500/30 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

      {/* Edit / Add Product Modal */}
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          editingProduct={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSaveSuccess={async () => {
            await fetchProducts();
            router.refresh();
          }}
        />
      )}

      {/* Delete Confirmation Dialog Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Delete Product Confirmation</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete <span className="text-white font-bold">{deletingProduct.title}</span> (ID: {deletingProduct.id}) from Neon PostgreSQL?
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeletingProduct(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Product</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
