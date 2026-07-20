"use client";

import { useState, useEffect, useRef } from "react";
import { Product } from "@/lib/products";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
  editingProduct?: Product | null;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSaveSuccess,
  editingProduct,
}: ProductModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "media" | "specs">("general");

  // Form Fields
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [category, setCategory] = useState<string>("Custom Machinery");
  const [desc, setDesc] = useState<string>("");
  const [fullDescription, setFullDescription] = useState<string>("");

  // Media Fields
  const [image, setImage] = useState<string>("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");

  // Lists and Specs
  const [featuresText, setFeaturesText] = useState<string>("");
  const [applicationsText, setApplicationsText] = useState<string>("");
  const [benefitsText, setBenefitsText] = useState<string>("");
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([
    { key: "Cycle Time", value: "2.5 seconds" },
    { key: "Repeatability", value: "±0.01 mm" },
  ]);

  // Loading & Upload States
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isUploadingMain, setIsUploadingMain] = useState<boolean>(false);
  const [isUploadingSub, setIsUploadingSub] = useState<boolean>(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const subFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  // Populate form on Edit / Reset on Add
  useEffect(() => {
    if (editingProduct) {
      setId(editingProduct.id);
      setTitle(editingProduct.title);
      setSubtitle(editingProduct.subtitle || "");
      setCategory(editingProduct.category || "Custom Machinery");
      setDesc(editingProduct.desc || "");
      setFullDescription(editingProduct.fullDescription || editingProduct.desc || "");
      setImage(editingProduct.image || "");
      setGallery(Array.isArray(editingProduct.gallery) ? editingProduct.gallery : []);
      setVideoUrl(editingProduct.videoUrl || "");

      setFeaturesText(Array.isArray(editingProduct.features) ? editingProduct.features.join("\n") : "");
      setApplicationsText(Array.isArray(editingProduct.applications) ? editingProduct.applications.join("\n") : "");
      setBenefitsText(Array.isArray(editingProduct.benefits) ? editingProduct.benefits.join("\n") : "");

      if (editingProduct.specs && typeof editingProduct.specs === "object") {
        const specEntries = Object.entries(editingProduct.specs).map(([k, v]) => ({ key: k, value: v }));
        setSpecs(specEntries.length > 0 ? specEntries : [{ key: "", value: "" }]);
      } else {
        setSpecs([{ key: "", value: "" }]);
      }
    } else {
      // Add Mode Defaults
      setId("");
      setTitle("");
      setSubtitle("");
      setCategory("Custom Machinery");
      setDesc("");
      setFullDescription("");
      setImage("");
      setGallery([]);
      setVideoUrl("");
      setFeaturesText("Precision indexing timetable\nHigh-torque servo actuators\nIntegrated sensor quality checks");
      setApplicationsText("Automotive Assembly\nIndustrial Packaging");
      setBenefitsText("Reduces cycle time by 50%\nZero-defect inline verification");
      setSpecs([
        { key: "Cycle Time", value: "2.0 - 4.0 seconds" },
        { key: "Frame Structure", value: "Heavy Duty Steel" },
      ]);
    }
    setErrorMessage(null);
    setActiveTab("general");
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  // --- Main Image File Upload ---
  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMain(true);
    setErrorMessage(null);

    const currentProdId = editingProduct ? editingProduct.id : id.trim() || title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "main");
    if (currentProdId) formData.append("productId", currentProdId);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Main image upload failed");

      setImage(data.url);
      if (gallery.length === 0) {
        setGallery([data.url]);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload main image");
    } finally {
      setIsUploadingMain(false);
    }
  };

  // --- Sub-Images Batch File Upload (CRUD: Add Sub-Images) ---
  const handleSubImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingSub(true);
    setErrorMessage(null);

    const currentProdId = editingProduct ? editingProduct.id : id.trim() || title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("folder", "gallery");
    if (currentProdId) formData.append("productId", currentProdId);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sub-images upload failed");

      const newUrls: string[] = data.urls || [data.url];
      setGallery((prev) => [...prev, ...newUrls]);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload sub-images");
    } finally {
      setIsUploadingSub(false);
    }
  };

  // --- Sub-Images CRUD Operations ---
  const handleRemoveSubImage = (indexToRemove: number) => {
    setGallery((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetSubAsMain = (url: string) => {
    setImage(url);
  };

  // --- Single Video Upload Handler (CRUD: Single Video) ---
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingVideo(true);
    setErrorMessage(null);

    const currentProdId = editingProduct ? editingProduct.id : id.trim() || title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "videos");
    if (currentProdId) formData.append("productId", currentProdId);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Video upload failed");

      setVideoUrl(data.url);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload video");
    } finally {
      setIsUploadingVideo(false);
    }
  };

  // --- Specs CRUD Handlers ---
  const handleAddSpecRow = () => {
    setSpecs((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveSpecRow = (idx: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSpecChange = (idx: number, field: "key" | "value", val: string) => {
    setSpecs((prev) => {
      const updated = [...prev];
      updated[idx][field] = val;
      return updated;
    });
  };

  // --- Submit Form (Save Product) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage("Product title is required");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    // Convert specs array to object
    const specsObj: Record<string, string> = {};
    specs.forEach((item) => {
      if (item.key.trim()) {
        specsObj[item.key.trim()] = item.value.trim();
      }
    });

    const featuresList = featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const applicationsList = applicationsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const benefitsList = benefitsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    // Ensure main image is in gallery
    let finalGallery = [...gallery];
    if (image && !finalGallery.includes(image)) {
      finalGallery.unshift(image);
    }

    const payload = {
      id: editingProduct ? editingProduct.id : id || undefined,
      title: title.trim(),
      subtitle: subtitle.trim(),
      category: category.trim(),
      desc: desc.trim(),
      fullDescription: fullDescription.trim() || desc.trim(),
      image: image.trim() || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
      gallery: finalGallery,
      videoUrl: videoUrl.trim() || undefined,
      features: featuresList,
      specs: specsObj,
      applications: applicationsList,
      benefits: benefitsList,
    };

    try {
      const method = editingProduct ? "PUT" : "POST";
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");

      onSaveSuccess();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
              {editingProduct ? `Edit Product: ${editingProduct.title}` : "Add New Machinery Product"}
            </h2>
            <p className="text-xs text-slate-400 font-light mt-0.5">
              Manage product media assets (main image, sub-images, single video) & technical details
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-950/80 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center justify-between">
            <span>⚠️ {errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-red-200">✕</button>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/30 px-6 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${activeTab === "general"
              ? "border-brand-orange text-brand-orange bg-brand-orange/10 rounded-t-lg"
              : "border-transparent text-slate-400 hover:text-white"
              }`}
          >
            1. General Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("media")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === "media"
              ? "border-brand-orange text-brand-orange bg-brand-orange/10 rounded-t-lg"
              : "border-transparent text-slate-400 hover:text-white"
              }`}
          >
            <span>2. Media Assets</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded-full text-slate-300">
              Img: {gallery.length} | Vid: {videoUrl ? 1 : 0}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${activeTab === "specs"
              ? "border-brand-orange text-brand-orange bg-brand-orange/10 rounded-t-lg"
              : "border-transparent text-slate-400 hover:text-white"
              }`}
          >
            3. Specs & Features
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: GENERAL INFO */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Automated Bagging & Mill Packing Tower"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-brand-orange outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-brand-orange outline-none transition-colors"
                  >
                    <option value="Custom Machinery">Custom Machinery</option>
                    <option value="Packing Machinery">Packing Machinery</option>
                    <option value="Material Transport">Material Transport</option>
                    <option value="Dosing Machinery">Dosing Machinery</option>
                    <option value="Electrical & Controls">Electrical & Controls</option>
                    <option value="Robotics & Assembly">Robotics & Assembly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. High-Volume Grain, Rice & Powder Bagging Station"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-brand-orange outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Short Description (Card Summary)
                </label>
                <textarea
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Brief 1-2 sentence summary displayed on product cards..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-brand-orange outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Full Detailed Description (Product Detail Page)
                </label>
                <textarea
                  rows={4}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Comprehensive technical breakdown of engineering specs, architecture, and operation..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-brand-orange outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA ASSETS (Main Image, Sub-Images CRUD & Single Video CRUD) */}
          {activeTab === "media" && (
            <div className="space-y-6">

              {/* SECTION A: MAIN PRODUCT IMAGE */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-orange" />
                    Main Product Image
                  </h3>
                  <span className="text-[11px] text-slate-400">Primary preview thumbnail</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="relative aspect-[16/10] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
                    {image ? (
                      <img src={image} alt="Main Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-slate-500">No Image</span>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://... or /images/..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs font-mono outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={mainFileInputRef}
                        onChange={handleMainImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => mainFileInputRef.current?.click()}
                        disabled={isUploadingMain}
                        className="px-3 py-2 bg-brand-orange/20 hover:bg-brand-orange/30 text-brand-orange border border-brand-orange/40 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>{isUploadingMain ? "Uploading to Cloudflare R2..." : "Upload Main Image"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: SUB-IMAGES / GALLERY (CRUD) */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      Sub-Images Gallery ({gallery.length})
                    </h3>
                    <p className="text-[11px] text-slate-400">Add, view, remove, or set as main image</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={subFileInputRef}
                      onChange={handleSubImagesUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => subFileInputRef.current?.click()}
                      disabled={isUploadingSub}
                      className="px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>{isUploadingSub ? "Uploading Sub-Images..." : "+ Add Sub-Images"}</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Images Thumbnail Grid (CRUD UI) */}
                {gallery.length === 0 ? (
                  <div className="p-6 border border-dashed border-slate-800 rounded-xl text-center text-slate-500 text-xs">
                    No sub-images added yet. Click "+ Add Sub-Images" to select multiple photos.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {gallery.map((subImgUrl, idx) => (
                      <div
                        key={idx}
                        className={`group relative bg-slate-900 border rounded-xl overflow-hidden aspect-[4/3] flex flex-col justify-between ${subImgUrl === image ? "border-brand-orange ring-1 ring-brand-orange" : "border-slate-800"
                          }`}
                      >
                        <img src={subImgUrl} alt={`Sub-image ${idx + 1}`} className="w-full h-full object-cover" />

                        {subImgUrl === image && (
                          <span className="absolute top-1.5 left-1.5 bg-brand-orange text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow">
                            Main
                          </span>
                        )}

                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                          {subImgUrl !== image && (
                            <button
                              type="button"
                              onClick={() => handleSetSubAsMain(subImgUrl)}
                              className="w-full py-1 bg-brand-orange text-white text-[10px] font-bold rounded hover:bg-orange-500 transition-colors"
                            >
                              Set as Main
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveSubImage(idx)}
                            className="w-full py-1 bg-red-600/90 text-white text-[10px] font-bold rounded hover:bg-red-500 transition-colors"
                          >
                            Remove Sub-Image
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION C: SINGLE VIDEO (CRUD) */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Single Product Video ({videoUrl ? "Active" : "None"})
                    </h3>
                    <p className="text-[11px] text-slate-400">Upload factory demo video or enter MP4/video link</p>
                  </div>

                  {videoUrl && (
                    <button
                      type="button"
                      onClick={() => setVideoUrl("")}
                      className="px-2.5 py-1 bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Delete Video
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Video URL / Path</label>
                      <input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://... or /videos/real/video_1.mp4"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs font-mono outline-none focus:border-brand-orange"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={videoFileInputRef}
                        onChange={handleVideoUpload}
                        accept="video/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => videoFileInputRef.current?.click()}
                        disabled={isUploadingVideo}
                        className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>{isUploadingVideo ? "Uploading Video..." : "Upload Video File"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Video Player Preview Box */}
                  <div className="relative aspect-video bg-black border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
                    {videoUrl ? (
                      <video src={videoUrl} controls className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center p-4">
                        <svg className="w-8 h-8 text-slate-600 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs text-slate-500 block">No Video Attached</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: SPECS & FEATURES */}
          {activeTab === "specs" && (
            <div className="space-y-6">

              {/* Features List */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Key Features (One feature per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Custom multi-station rotary indexing...&#10;High-torque servo actuators...&#10;Integrated optical sensors..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-brand-orange outline-none transition-colors"
                />
              </div>

              {/* Technical Specifications Key-Value Editor */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Technical Specifications
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="px-2.5 py-1 bg-brand-orange/20 hover:bg-brand-orange/30 text-brand-orange border border-brand-orange/40 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    + Add Spec Row
                  </button>
                </div>

                <div className="space-y-2">
                  {specs.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.key}
                        onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                        placeholder="Spec Name (e.g. Cycle Time)"
                        className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs outline-none focus:border-brand-orange"
                      />
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                        placeholder="Value (e.g. 1.8 seconds)"
                        className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs outline-none focus:border-brand-orange"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecRow(idx)}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications & Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Target Applications (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={applicationsText}
                    onChange={(e) => setApplicationsText(e.target.value)}
                    placeholder="Automotive Assembly&#10;EV Battery Modules..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-brand-orange outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Key Benefits (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={benefitsText}
                    onChange={(e) => setBenefitsText(e.target.value)}
                    placeholder="65% cycle time reduction&#10;Zero defect output..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-brand-orange outline-none transition-colors"
                  />
                </div>
              </div>

            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              * R2 / Local Storage sync enabled
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 bg-brand-orange hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand-orange/20 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {isSaving ? "Saving Product..." : editingProduct ? "Update Product" : "Save New Product"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
