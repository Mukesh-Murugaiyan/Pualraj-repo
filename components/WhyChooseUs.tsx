"use client";

export default function WhyChooseUs() {
  const points = [
    {
      title: "100% In-House Execution",
      desc: "Unlike other integrators who outsource manufacturing, we handle mechanical structure fabrication, panel assembly, wiring, and programming in our own workshop. This ensures complete control over quality and timelines.",
    },
    {
      title: "Tier-1 Component Standard",
      desc: "We build all automation rigs using global standard parts. You receive full manufacturer documentation for motors, PLCs, valves, and sensors, making spare parts sourcing easy.",
    },
    {
      title: "Rigorous Testing & Dry Runs",
      desc: "Every machine undergoes a full dry-run integration test at our facility before dispatch. Clients are invited for Factory Acceptance Testing (FAT) to verify all cycle times and safety operations.",
    },
    {
      title: "Remote Support & IIoT Analytics",
      desc: "All control systems we commission include secure VPN routers. If you experience system alerts, our engineers can log in remotely to diagnose program logs instantly, saving on-site visit costs.",
    },
  ];

  const partners = [
    "SIEMENS",
    "KUKA",
    "SMC",
    "FANUC",
    "SCHNEIDER",
    "ALLEN BRADLEY",
    "OMRON",
    "KEYENCE",
  ];

  return (
    <section id="why-choose" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Content Points */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
                Why Choose TCP Automation
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
                Engineered for Reliability and Maximum Efficiency
              </h2>
              <div className="w-16 h-1 bg-brand-orange mt-4 rounded" />
            </div>

            <div className="space-y-6">
              {points.map((pt, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-1 bg-brand-orange/15 text-brand-orange rounded-full mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {pt.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed mt-1">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Premium partner collage & design elements */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl" />
              
              <h3 className="text-xl font-bold text-white tracking-tight mb-4">
                Global Integration Partners
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                We integrate component systems from global automation leaders to guarantee reliability and worldwide support.
              </p>

              {/* Grid of partner text badges */}
              <div className="grid grid-cols-2 gap-3">
                {partners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-800 bg-slate-950 py-3.5 px-4 text-center rounded text-xs font-mono font-bold tracking-widest text-slate-400 hover:text-brand-orange hover:border-brand-orange/30 transition-all select-none cursor-default"
                  >
                    {partner}
                  </div>
                ))}
              </div>

              {/* High-tech certificate assurance badge */}
              <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-ice/10 border border-brand-ice/20 rounded-full flex items-center justify-center text-brand-ice flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    ISO & CE Compliance Standard
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    All machines are manufactured to comply with regional safety norms and emergency cut-off protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
