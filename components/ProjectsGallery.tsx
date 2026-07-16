"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    category: string;
    desc: string;
    categoryLabel: string;
    techs: string[];
  } | null>(null);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "spm", label: "Custom SPMs" },
    { id: "robotics", label: "Robotic Cells" },
    { id: "conveyor", label: "Conveyors" },
    { id: "panel", label: "Control Panels" },
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Automobile Engine Assembly SPM",
      category: "spm",
      categoryLabel: "Special Purpose Machine",
      src: "/images/spm_machine.png",
      desc: "An automated 6-station rotary index assembly machine built for a tier-1 auto component vendor. Includes integrated leak testing and laser height verification.",
      techs: ["Siemens S7-1500 PLC", "Keyence Laser", "Rotary Index Table"],
    },
    {
      id: 2,
      title: "6-Axis Robot Welding Cell",
      category: "robotics",
      categoryLabel: "Robotic Cell",
      src: "/images/robotic_arm.png",
      desc: "Synchronized dual-robot welding station with rotating headstock positioned for automotive body components, minimizing operator cycle loading times.",
      techs: ["KUKA Articulated Robots", "Fronius Welding Controller", "SafeOperation"],
    },
    {
      id: 3,
      title: "Automated FMCG Sorting Conveyor",
      category: "conveyor",
      categoryLabel: "Conveyor System",
      src: "/images/conveyor_system.png",
      desc: "Sorting distribution lines handling 45 packaging boxes per minute. Implements zero-pressure accumulation and pneumatic paddle selectors.",
      techs: ["SEW Drives", "SMC Pneumatics", "Photo-electric Sensors"],
    },
    {
      id: 4,
      title: "Automotive Welding & Assembly Line",
      category: "robotics",
      categoryLabel: "Robotic Integration",
      src: "/images/hero_factory.png",
      desc: "Turnkey body shop assembly line showing robotic arms performing spot welding on chassis panels under smart central SCADA monitor supervision.",
      techs: ["Fanuc Robots", "Profibus Comms", "SCADA Supervision"],
    },
    {
      id: 5,
      title: "Pharma Vial Inspection SPM",
      category: "spm",
      categoryLabel: "Special Purpose Machine",
      src: "/images/spm_machine.png",
      desc: "High-speed optical inspection machine tracking fill level, cap alignment, and barcode validation on vaccine vials at a sterile pharmaceutical facility.",
      techs: ["Cognex Vision", "Servo Indexing", "Cleanroom Structure"],
    },
    {
      id: 6,
      title: "Warehouse Box Palletizing Line",
      category: "conveyor",
      categoryLabel: "Conveyor System",
      src: "/images/conveyor_system.png",
      desc: "Automated pallet conveyor loops connected to high-payload stacking robotic cells with print-and-apply barcode labelling stations.",
      techs: ["Modular Roller Conveyor", "Barcode Applicator", "VFD Drives"],
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <section id="projects" className="py-24 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
              Project Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Bespoke Engineering Solutions In Action
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded" />
            <p className="text-slate-400 font-light leading-relaxed">
              Browse through our structural builds, robot integrations, and control arrays. Every machine was engineered to resolve a specific production bottleneck.
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" id="gallery">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                  activeFilter === filter.id
                    ? "bg-brand-orange text-white"
                    : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800"
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
                onClick={() => setLightboxImage(item)}
                className="group cursor-pointer bg-slate-950 border border-slate-850 rounded-xl overflow-hidden shadow-lg hover:border-brand-orange/30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image aspect box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 350px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-brand-orange/20 border border-brand-orange/40 rounded-full text-brand-orange scale-90 group-hover:scale-100 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-950/95 border border-slate-800 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-brand-ice rounded">
                    {item.categoryLabel}
                  </div>
                </div>

                {/* Content description card */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white tracking-wide group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded text-[9px] font-mono"
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

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setLightboxImage(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl z-10 animate-slide-up">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full z-20 transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[250px] bg-slate-900">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>

              {/* Specs info */}
              <div className="p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    {lightboxImage.categoryLabel}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {lightboxImage.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {lightboxImage.desc}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border-t border-slate-850 pt-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Systems Integrated
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {lightboxImage.techs.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded text-[10px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setLightboxImage(null);
                      // Scroll to contact form
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-2.5 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Inquire About A Similar Build
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
