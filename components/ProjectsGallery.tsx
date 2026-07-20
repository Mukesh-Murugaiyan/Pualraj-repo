"use client";

import { useState } from "react";
import Image from "next/image";

interface MediaItem {
  id: number;
  title: string;
  category: string;
  categoryLabel: string;
  src: string;
  isVideo?: boolean;
  videoUrl?: string;
  desc: string;
  techs: string[];
}

export default function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const filters = [
    { id: "all", label: "All Works" },
    { id: "videos", label: "▶ Live Videos" },
    { id: "conveyor", label: "Inclined Conveyors" },
    { id: "packing", label: "Mill Bagging Towers" },
    { id: "hopper", label: "Dosing Feeder Systems" },
    { id: "spm", label: "Custom SPMs & Rigs" },
  ];

  const galleryItems: MediaItem[] = [
    {
      id: 1,
      title: "Inclined Chevron Belt Conveyor System",
      category: "conveyor",
      categoryLabel: "Material Transport",
      src: "/images/real/img_1.jpg",
      isVideo: true,
      videoUrl: "/videos/real/video_3.mp4",
      desc: "Twin heavy-duty inclined chevron belt conveyors mounted on mobile caster chassis with adjustable screw jacks for grain sack and box transit.",
      techs: ["Chevron Belt", "SEW Eurodrive VFD", "Mobile Swivel Casters"],
    },
    {
      id: 2,
      title: "Automated Bagging & Rice Mill Tower",
      category: "packing",
      categoryLabel: "Packing Tower",
      src: "/images/real/img_3.jpg",
      isVideo: true,
      videoUrl: "/videos/real/video_2.mp4",
      desc: "High-capacity overhead storage hopper with pneumatic gate dosing and continuous motorized bag stitching conveyor for grain processing.",
      techs: ["Digital Load Cells", "Pneumatic Gates", "Bag Stitching Station"],
    },
    {
      id: 3,
      title: "Pneumatic Dosing & Hopper Feeder",
      category: "hopper",
      categoryLabel: "Dosing Machine",
      src: "/images/real/img_2.jpg",
      isVideo: true,
      videoUrl: "/videos/real/video_4.mp4",
      desc: "Stainless steel surge hopper with double-stage pneumatic slide gate valves and pneumatic vibrators preventing powder bridging.",
      techs: ["SS 304 Construction", "Festo Pneumatics", "PLC Metering"],
    },
    {
      id: 4,
      title: "Stainless Steel Screw Feeder Rig",
      category: "spm",
      categoryLabel: "Auger System",
      src: "/images/real/img_5.jpg",
      isVideo: true,
      videoUrl: "/videos/real/video_6.mp4",
      desc: "Heavy conical surge hopper direct-coupled to a shafted screw auger conveyor for dust-free bulk material transfer.",
      techs: ["Auger Screw Flighting", "Helical Gear Motor", "IP65 Controls"],
    },
    {
      id: 5,
      title: "Industrial Grain Packaging Station",
      category: "packing",
      categoryLabel: "Packing Station",
      src: "/images/real/img_4.jpg",
      isVideo: true,
      videoUrl: "/videos/real/video_1.mp4",
      desc: "Factory installation of automated rice mill packing line featuring continuous bag sewing and weighment platform.",
      techs: ["Weighment Platform", "Motorized Belt Loop", "Operator Station"],
    },
    {
      id: 6,
      title: "Precision Industrial Weighing & Dispensing",
      category: "hopper",
      categoryLabel: "Dispensing Station",
      src: "/images/real/img_6.jpg",
      isVideo: true,
      videoUrl: "/videos/real/video_5.mp4",
      desc: "Workshop testing of custom pneumatic chute dispenser and multi-stage hopper assembly built for bulk solids handling.",
      techs: ["Pneumatic Chute", "Digital Indicator", "Structural Steel Frame"],
    },
    {
      id: 7,
      title: "Mobile Heavy Material Conveyors",
      category: "conveyor",
      categoryLabel: "Conveyor System",
      src: "/images/real/img_7.jpg",
      desc: "High-angle green chevron rubber belt elevator engineered for grain, fertilizer, and agricultural sack movement.",
      techs: ["Chevron Traction", "Adjustable Legs", "Emergency E-Stop"],
    },
    {
      id: 8,
      title: "Custom Machinery Structural Assembly",
      category: "spm",
      categoryLabel: "Special Purpose Build",
      src: "/images/real/img_8.jpg",
      desc: "Precision fabrication of custom structural steel baseframes with anti-vibration leveling mounts and safety guarding.",
      techs: ["Heavy Channel Steel", "Powder Coating", "Precision Jig Welding"],
    },
    {
      id: 9,
      title: "PLC Automation & Control Enclosure",
      category: "spm",
      categoryLabel: "Control Systems",
      src: "/images/real/img_9.jpg",
      desc: "Certified IP65 electrical panel featuring Siemens S7 PLC, Omron relays, and touchscreen HMI interface for plant automation.",
      techs: ["Siemens PLC", "Schneider Breakers", "Touch HMI Screen"],
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : activeFilter === "videos"
      ? galleryItems.filter((item) => item.isVideo)
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <section id="projects" className="py-24 bg-slate-900/60 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3.5 py-1.5 rounded-full border border-brand-orange/20 inline-block">
              Factory Floor Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Real Builds & Live Operation Videos
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto rounded-full" />
            <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed">
              Explore authentic photos and high-definition operation footage from our engineering workshop and client factory floor installations.
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" id="gallery">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeFilter === filter.id
                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/25 scale-105"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-800/50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMedia(item)}
                className="group cursor-pointer bg-slate-950 border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image aspect box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* Play badge for videos */}
                  {item.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-brand-orange/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform border border-white/20">
                        <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-800 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-300 rounded-md">
                    {item.categoryLabel}
                  </div>

                  {item.isVideo && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Live Video
                    </div>
                  )}
                </div>

                {/* Content description card */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-brand-orange transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900">
                    {item.techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox / Video Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={() => setActiveMedia(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10 p-4 sm:p-6 space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-brand-orange font-bold">
                  {activeMedia.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {activeMedia.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Media Player / Image Viewer */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800">
              {activeMedia.isVideo && activeMedia.videoUrl ? (
                <video
                  src={activeMedia.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support HTML5 video.
                </video>
              ) : (
                <Image
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Footer description & CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-850">
              <p className="text-xs text-slate-300 font-light max-w-xl">
                {activeMedia.desc}
              </p>
              <button
                onClick={() => {
                  setActiveMedia(null);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Inquire For Your Factory
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
