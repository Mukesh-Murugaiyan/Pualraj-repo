"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductsProps {
  onOpenQuote: () => void;
}

export default function Products({ onOpenQuote }: ProductsProps) {
  const [activeTab, setActiveTab] = useState("spm");

  const productsList = [
    {
      id: "spm",
      title: "Special Purpose Machines (SPM)",
      subtitle: "Custom-Engineered Manufacturing Equipment",
      desc: "Our Special Purpose Machines are designed from the ground up to automate single or multi-stage tasks that cannot be accomplished with standard tooling. Each SPM is built to optimize cycle time, guarantee safety, and maintain high repeatability.",
      image: "/images/spm_machine.png",
      features: [
        "Fully custom multi-station rotary indexing tables",
        "Pneumatic, hydraulic, and servo-driven actuators",
        "Integrated leak testing and laser inspection sensors",
        "Automated reject sorting mechanisms",
      ],
      specs: {
        "Cycle Time": "Up to 3 seconds/part",
        "Frame Structure": "Heavy structural steel (powder coated)",
        "Control System": "Siemens S7-1500 / Rockwell CompactLogix",
        "Sensor Integration": "Keyence inspection & measurement sensors",
      },
    },
    {
      id: "plc",
      title: "PLC Automation & Control Panels",
      subtitle: "The Brain of Industrial Systems",
      desc: "We design and assemble certified electrical panels and write clean, modular PLC software that connects your plant floor to your enterprise systems. From retrofits of legacy machines to greenfield automation architectures.",
      image: "/images/robotic_arm.png", // Re-using robotic arm highlighting the panel
      features: [
        "Certified electrical enclosure design (UL 508A standard compliant)",
        "HMIs (Human Machine Interfaces) with clean, high-visibility layout",
        "SCADA and IIoT gateway integration for plant-wide tracking",
        "Remote diagnostics and network security switches built-in",
      ],
      specs: {
        "Enclosure Rating": "IP65 / NEMA 4X options",
        "PLC Platforms": "Siemens, Rockwell, Mitsubishi, Omron",
        "Safety Integration": "Integrated safety PLCs and light curtains",
        "Communication": "Profinet, EtherNet/IP, Modbus TCP",
      },
    },
    {
      id: "conveyors",
      title: "Conveyor Systems & Materials Handling",
      subtitle: "Seamless Flow of Production Parts",
      desc: "Our modular conveyor lines are constructed for smooth assembly flow, high-speed sorting, and heavy-duty logistics operations. We construct belt, roller, modular chain, and palletized systems with intelligent sorting logic.",
      image: "/images/conveyor_system.png",
      features: [
        "Multi-lane sorting with automated pneumatic pushers",
        "Variable speed control via variable frequency drives (VFD)",
        "Zero-pressure accumulation (ZPA) sorting logic",
        "Food-grade and pharmaceutical-clean standard compliance",
      ],
      specs: {
        "Load Capacity": "Up to 5000 kg / meter",
        "Chassis Material": "Extruded Aluminium profile / Stainless Steel",
        "Motor Drives": "SEW Eurodrive / Nord Gearbox",
        "Sorting Rate": "Up to 60 parcels per minute",
      },
    },
    {
      id: "robotics",
      title: "Robotic Automation & Integration",
      subtitle: "High-Speed Handling, Welding, and Assembly",
      desc: "We integrate 6-axis articulated robots, SCARA arms, and collaborative cobots (cobots) for high-speed assembly, pick-and-place, welding, and machine tending operations, complete with bespoke end-of-arm-tooling (EOAT).",
      image: "/images/hero_factory.png",
      features: [
        "Custom designed vacuum, magnetic, and mechanical grippers",
        "Advanced 3D vision cameras for random part sorting",
        "Collaborative robot integrations for operator-shared workspace",
        "Offline cycle time simulations for optimization",
      ],
      specs: {
        "Robot Brands": "KUKA, FANUC, ABB, Universal Robots",
        "Payload Range": "3 kg to 600 kg supported",
        "Accuracy": "Repeatability up to ±0.02 mm",
        "Safety Logic": "SafeOperation zoning / area scanner safety",
      },
    },
  ];

  const currentProduct = productsList.find((p) => p.id === activeTab) || productsList[0];

  return (
    <section id="products" className="py-24 bg-slate-900/60 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            High-Performance Automation Machinery
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded" />
          <p className="text-slate-400 font-light leading-relaxed">
            We build industrial machines designed for robust performance in extreme factory environments. Each product category is customizable to your plant layout.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {productsList.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveTab(product.id)}
              className={`px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === product.id
                  ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20"
                  : "bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {product.id === "spm" && "SPM Machines"}
              {product.id === "plc" && "PLC & Panels"}
              {product.id === "conveyors" && "Conveyors"}
              {product.id === "robotics" && "Robotic Integration"}
            </button>
          ))}
        </div>

        {/* Selected Product Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-6 sm:p-8 lg:p-12 shadow-2xl">
          
          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-ice">
                {currentProduct.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {currentProduct.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {currentProduct.desc}
              </p>

              {/* Key Features */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {currentProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                      <svg className="w-5 h-5 text-brand-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Datasheet Table snippet */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded p-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-mono">
                {Object.entries(currentProduct.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-500">{key}:</span>
                    <span className="text-white text-right font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 bg-brand-orange hover:bg-orange-500 text-white rounded font-bold transition-all shadow-md shadow-brand-orange/15 flex items-center gap-2 group cursor-pointer"
              >
                Inquire About This Product
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-slate-850 bg-slate-900 group shadow-lg">
              <Image
                src={currentProduct.image}
                alt={currentProduct.title}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-[10px] uppercase font-mono tracking-widest text-slate-400 bg-slate-950/90 border border-slate-800 px-2.5 py-1 rounded">
                TCP Engineering Reference
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
