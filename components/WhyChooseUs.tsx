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
    <section id="why-us" className="py-24 bg-slate-950 border-t border-slate-800/60 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[300px] bg-brand-orange/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Content Points */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                Engineering Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-4">
                Why Choose Electra Weighing Systems
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-brand-orange to-transparent mt-4 rounded-full" />
            </div>

            <div className="space-y-6">
              {points.map((pt, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl hover:border-brand-orange/30 transition-colors">
                  <div className="w-9 h-9 bg-brand-orange/15 text-brand-orange rounded-xl mt-0.5 flex-shrink-0 flex items-center justify-center border border-brand-orange/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                      {pt.title}
                    </h3>
                    <p className="text-sm text-slate-300 font-light leading-relaxed mt-1">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Premium partner collage & design elements */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-xl pointer-events-none" />
              
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Global Component Standards
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                We integrate standard certified sub-assemblies from world leaders in motion control, sensors, and pneumatics.
              </p>

              {/* Grid of partner text badges */}
              <div className="grid grid-cols-2 gap-3">
                {partners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-800/80 bg-slate-950/80 py-3.5 px-4 text-center rounded-xl text-xs font-mono font-bold tracking-widest text-slate-400 hover:text-brand-orange hover:border-brand-orange/40 transition-all select-none cursor-default shadow-md"
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
