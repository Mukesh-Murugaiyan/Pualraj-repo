"use client";

export default function Industries() {
  const industriesList = [
    {
      title: "Automotive & EV",
      desc: "Robust robot cells for automated MIG/spot welding, custom chassis conveyors, windshield gluing stations, and leak testing jigs for lithium batteries.",
      features: ["Robot welding integration", "Press-fit assembly lines", "EV battery leak testing"],
      bgGlow: "group-hover:border-red-500/20",
      accent: "text-red-500 bg-red-500/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17h14a2 2 0 002-2v-3a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "FMCG & F&B",
      desc: "High-speed primary packaging, flow wrapping conveyors, automatic cartoning machines, and custom rotary liquid filling units designed for extreme sanitation.",
      features: ["Clean-in-Place (CIP) panels", "Delta robot pick & place", "Modular box packing"],
      bgGlow: "group-hover:border-amber-500/20",
      accent: "text-amber-500 bg-amber-500/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: "Pharmaceuticals",
      desc: "Aseptic packaging assembly systems, automated liquid syringe filling equipment, and cleanroom sorting conveyors complying with FDA specifications.",
      features: ["FDA cleanroom compliance", "High-accuracy dosing", "Vision code validation"],
      bgGlow: "group-hover:border-emerald-500/20",
      accent: "text-emerald-500 bg-emerald-500/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: "Warehouse & Logistics",
      desc: "Sorting systems with dynamic pneumatic swing arms, weight check gates, high-speed gantry palletizers, and smart parcel line dispatch control systems.",
      features: ["Bar-code print & apply", "Multi-belt parcel sorting", "End-of-line palletizing"],
      bgGlow: "group-hover:border-brand-ice/20",
      accent: "text-brand-ice bg-brand-ice/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Electronics & Semis",
      desc: "Electrostatic discharge (ESD) safe workspaces, high-speed automatic micro-screwing robots, and multi-sensor functional PCB test beds.",
      features: ["ESD-safe design standards", "Automatic micro-screwing", "Dual-camera optical inspection"],
      bgGlow: "group-hover:border-purple-500/20",
      accent: "text-purple-500 bg-purple-500/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="industries" className="py-24 bg-slate-900/60 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Tailored Automation by Vertical Sector
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded" />
          <p className="text-slate-400 font-light leading-relaxed">
            Every manufacturing vertical has distinct compliance standards and cycle time objectives. We engineer systems customized to your industry regulations.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {industriesList.map((ind, index) => (
            <div
              key={index}
              className={`bg-slate-950 border border-slate-850 rounded-xl p-6 sm:p-8 hover:bg-slate-900/40 hover:-translate-y-1 transition-all duration-300 shadow-xl group flex flex-col justify-between ${ind.bgGlow}`}
            >
              <div>
                <div className={`p-3 rounded-lg w-fit mb-6 ${ind.accent}`}>
                  {ind.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {ind.title}
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                  {ind.desc}
                </p>
              </div>

              <div className="border-t border-slate-900 pt-4 mt-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Core Integrations
                </h4>
                <ul className="space-y-1.5">
                  {ind.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <svg className="w-4 h-4 text-brand-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
