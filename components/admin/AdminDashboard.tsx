"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import ProductModal from "./ProductModal";

export default function AdminDashboard() {
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
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(deletingProduct.id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchProducts();
        setDeletingProduct(null);
      }
    } catch (err) {
      console.error("Delete product error:", err);
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
      
      {/* Top Header Bar */}
      <header className="bg-slate-950/80 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-orange-500 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-brand-orange/20">
                TCP
              </span>
              <div>
                <span className="text-lg font-bold text-white tracking-tight group-hover:text-brand-orange transition-colors">
                  TCP Automation
                </span>
                <span className="text-[10px] text-brand-orange font-mono uppercase tracking-wider block font-semibold">
                  Admin Management Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#products"
              target="_blank"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>View Live Website</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-brand-orange text-white rounded-xl font-bold text-xs shadow-lg shadow-brand-orange/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Banner & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-1 z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20 inline-block">
              Database & Storage Control
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Product Machinery Catalog Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Add products, upload main images & sub-images, attach video demos, and sync with Cloudflare R2 storage.
            </p>
          </div>

          <div className="flex items-center gap-2 z-10">
            <span className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Storage: Cloudflare R2 / Local API Active
            </span>
          </div>
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 border border-slate-800/90 p-5 rounded-2xl space-y-1">
            <span className="text-xs font-medium text-slate-400">Total Machinery Products</span>
            <div className="text-2xl font-bold text-white font-mono">{products.length}</div>
            <span className="text-[10px] text-slate-500 block">Stored in Database</span>
          </div>

          <div className="bg-slate-950 border border-slate-800/90 p-5 rounded-2xl space-y-1">
            <span className="text-xs font-medium text-slate-400">Sub-Images Gallery Total</span>
            <div className="text-2xl font-bold text-cyan-400 font-mono">{totalSubImages}</div>
            <span className="text-[10px] text-slate-500 block">Multi-angle gallery shots</span>
          </div>

          <div className="bg-slate-950 border border-slate-800/90 p-5 rounded-2xl space-y-1">
            <span className="text-xs font-medium text-slate-400">Products with Video</span>
            <div className="text-2xl font-bold text-red-400 font-mono">{totalVideos}</div>
            <span className="text-[10px] text-slate-500 block">Factory operation clips</span>
          </div>

          <div className="bg-slate-950 border border-slate-800/90 p-5 rounded-2xl space-y-1">
            <span className="text-xs font-medium text-slate-400">Active Categories</span>
            <div className="text-2xl font-bold text-brand-orange font-mono">{categories.length - 1}</div>
            <span className="text-[10px] text-slate-500 block">Product lines</span>
          </div>
        </div>

        {/* Search, Filter & View Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div className="flex flex-1 items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products by title, ID, or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-brand-orange transition-colors"
              />
            </div>

            {/* Category Dropdown Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-medium outline-none focus:border-brand-orange transition-colors cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Grid vs Table View Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-end sm:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "grid" ? "bg-slate-800 text-brand-orange" : "text-slate-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "table" ? "bg-slate-800 text-brand-orange" : "text-slate-400 hover:text-white"
              }`}
              title="Table View"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product List Content */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3 bg-slate-950 border border-slate-800 rounded-2xl">
            <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400 font-mono">Loading product catalog from database...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-slate-950 border border-slate-800 rounded-2xl">
            <div className="text-4xl">📦</div>
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No product matches your search query or selected filter. Click "Add New Product" to create one.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-brand-orange text-white font-bold text-xs rounded-xl hover:bg-orange-500 transition-colors"
            >
              + Add First Product
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-950 border border-slate-800 hover:border-brand-orange/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group"
              >
                <div>
                  {/* Product Thumbnail */}
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-brand-orange text-white font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded shadow">
                      {product.category}
                    </span>

                    {/* Media Indicators */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="bg-slate-950/85 backdrop-blur-md text-cyan-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-700/80">
                        📷 {product.gallery?.length || 0} Sub-Imgs
                      </span>
                      {product.videoUrl && (
                        <span className="bg-slate-950/85 backdrop-blur-md text-red-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-700/80">
                          🎬 Video
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <div className="text-[11px] font-mono text-slate-500 uppercase">
                      ID: {product.id}
                    </div>
                    <h3 className="font-bold text-white text-base group-hover:text-brand-orange transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                      {product.desc}
                    </p>
                  </div>
                </div>

                {/* Card Actions (CRUD) */}
                <div className="p-4 border-t border-slate-900 flex items-center justify-between gap-2 bg-slate-950/60">
                  <button
                    onClick={() => handleOpenEditModal(product)}
                    className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit Product</span>
                  </button>

                  <button
                    onClick={() => setDeletingProduct(product)}
                    className="py-2 px-3 bg-red-950/60 hover:bg-red-900/80 border border-red-900/60 text-red-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    title="Delete Product"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase font-mono border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Sub-Images</th>
                    <th className="py-3.5 px-4">Video</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-9 object-cover rounded bg-slate-900 border border-slate-800"
                        />
                        <div>
                          <div className="font-bold text-white text-sm line-clamp-1">{product.title}</div>
                          <div className="font-mono text-[10px] text-slate-500">{product.id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[11px]">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-cyan-400">
                        {product.gallery?.length || 0} photos
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {product.videoUrl ? (
                          <span className="text-red-400">Attached</span>
                        ) : (
                          <span className="text-slate-600">None</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg font-semibold transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeletingProduct(product)}
                            className="px-3 py-1.5 bg-red-950 hover:bg-red-900 text-red-300 border border-red-900 rounded-lg font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Product Add & Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveSuccess={fetchProducts}
        editingProduct={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-red-950 border border-red-800 text-red-400 flex items-center justify-center mx-auto text-xl font-bold">
                ⚠️
              </div>
              <h3 className="text-lg font-bold text-white">Delete Product?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete <span className="text-white font-bold">{deletingProduct.title}</span>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeletingProduct(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
