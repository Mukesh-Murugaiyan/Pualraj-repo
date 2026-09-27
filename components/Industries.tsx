"use client";

export default function Industries() {
  const industriesList = [
    {
      title: "Rice Mills & Grain Processing",
      desc: "High-capacity automated bagging towers, 25kg and 50kg bag packing machines, inclined chevron sack conveyors, and automated bag stitching stations.",
      features: ["Auto rice packing machines", "Continuous bag stitching conveyors", "Loss-in-weight batching"],
      bgGlow: "group-hover:border-amber-500/20",
      accent: "text-amber-500 bg-amber-500/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: "Food, FMCG & Agro Packaging",
      desc: "Secondary packaging machinery, auto packing towers, multi-tier sorting conveyors, and food-grade SS304/SS316 contact surfaces built to hygienic standards.",
      features: ["Secondary packaging rigs", "Auto bag & pouch filling", "OIML Class C3/C6 precision"],
      bgGlow: "group-hover:border-emerald-500/20",
      accent: "text-emerald-500 bg-emerald-500/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Pharmaceuticals & Cleanrooms",
      desc: "High-speed dynamic inline checkweighers, cleanroom dispensing rigs, hermetically sealed IP68/IP69K load cells, and calibration audit logging.",
      features: ["Dynamic inline checkweighing", "IP68/IP69K stainless steel load cells", "Zero-point drift compensation"],
      bgGlow: "group-hover:border-cyan-500/20",
      accent: "text-cyan-500 bg-cyan-500/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: "Warehouse & Logistics",
      desc: "Inline checkweighing conveyors, high-speed sorting gates, automated vehicle truck loading conveyors, and weight discrepancy reject systems.",
      features: ["Truck loading conveyor systems", "Dynamic rejection air-blast/pusher", "Multi-belt parcel sorting"],
      bgGlow: "group-hover:border-brand-orange/20",
      accent: "text-brand-orange bg-brand-orange/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Chemicals, Cement & Silo Batching",
      desc: "Heavy-duty silo weighing automation, hopper dosing rigs, corrosive-resistant load cells up to 500 Tons, and PLC/SCADA batch management.",
      features: ["Silo & hopper batching rigs", "High-capacity 500-ton strain cells", "SCADA / ERP telemetry integration"],
      bgGlow: "group-hover:border-purple-500/20",
      accent: "text-purple-500 bg-purple-500/10",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="industries" className="py-24 bg-slate-900/40 border-t border-slate-800/60 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[300px] bg-brand-orange/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            Vertical Sectors
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Industries We Serve
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto rounded-full" />
          <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed">
            Every process manufacturing vertical has distinct compliance standards and cycle time objectives. We engineer systems customized to your exact plant workflow.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {industriesList.map((ind, index) => (
            <div
              key={index}
              className={`bg-slate-950/80 border border-slate-800/80 rounded-2xl p-7 hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/40 group flex flex-col justify-between`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${ind.accent}`}>
                  {ind.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                  {ind.title}
                </h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {ind.desc}
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-4 mt-2">
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
