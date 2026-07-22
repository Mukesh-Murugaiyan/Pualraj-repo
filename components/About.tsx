"use client";

import { useEffect, useState, useRef } from "react";

export default function About() {
  const [stats, setStats] = useState({
    years: 0,
    projects: 0,
    engineers: 0,
    satisfaction: 0,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || hasAnimated) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom >= 0;

      if (inViewport) {
        setHasAnimated(true);
        const duration = 1500;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);

          // Easing function outQuad
          const easeProgress = progress * (2 - progress);

          setStats({
            years: Math.floor(easeProgress * 15),
            projects: Math.floor(easeProgress * 150),
            engineers: Math.floor(easeProgress * 45),
            satisfaction: Math.floor(easeProgress * 99),
          });

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setStats({
              years: 5,
              projects: 150,
              engineers: 15,
              satisfaction: 99,
            });
          }
        };

        requestAnimationFrame(animate);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated]);

  const values = [
    {
      title: "Advanced Engineering",
      desc: "Our designs are engineered down to the micron. We ensure that components align perfectly for highly repeatable, high-accuracy operation.",
      svg: (
        <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Innovative Design",
      desc: "By combining advanced 3D CAD modeling with custom PLC scripting, we build intelligent machine systems ready for Industry 4.0 IoT analytics.",
      svg: (
        <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Unmatched Reliability",
      desc: "We use only industrial-grade parts from tier-1 global suppliers (Siemens, Kuka, SMC, Allen Bradley) to minimize down-time and repair costs.",
      svg: (
        <svg className="w-8 h-8 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Company Profile & Engineering Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Electra Weighing Systems (EWS)
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded" />
          <p className="text-slate-400 font-light leading-relaxed">
            Electra Weighing Systems (EWS) is an ISO 9001:2015 certified engineering pioneer specializing in high-accuracy industrial weighing machines, digital strain gauge load cell technology, dynamic inline checkweighers, hopper batching rigs, and custom Special Purpose Machines (SPM).
          </p>
        </div>

        {/* Core Description + Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6 text-slate-300 font-light leading-relaxed">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Pioneering Heavy Industrial & Automated Weighing Solutions
            </h3>
            <p>
              Founded with a mission to deliver zero-error mass measurement across process manufacturing, Electra Weighing Systems (EWS) designs bespoke weighing systems for pharmaceutical cleanrooms, chemical batching plants, agricultural grain processing mills, and heavy metal foundries.
            </p>
            <p>
              By combining IP68/IP69K hermetically sealed stainless steel load cells, ultra-fast 4800Hz digital ADCs, and custom PLC/SCADA control algorithms, EWS machines ensure legal-for-trade OIML Class III & NTEP accuracy under extreme thermal and mechanical vibration conditions.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 text-center shadow-lg shadow-black/10 hover:border-brand-orange/30 transition-colors">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stats.years}+
              </span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Years of Innovation
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 text-center shadow-lg shadow-black/10 hover:border-brand-blue/30 transition-colors">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stats.projects}+
              </span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                EWS Systems Installed
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 text-center shadow-lg shadow-black/10 hover:border-brand-blue/30 transition-colors">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stats.engineers}+
              </span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Weighing Specialists
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 text-center shadow-lg shadow-black/10 hover:border-brand-orange/30 transition-colors">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stats.satisfaction}%
              </span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Calibration Accuracy Pass Rate
              </span>
            </div>
          </div>
        </div>

        {/* Deep Explanation Section for Electra Weighing Systems (EWS) */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 sm:p-12 mb-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest">
                  Technical Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  Full Explanation of Electra Weighing Systems (EWS) Technology
                </h3>
              </div>
              <span className="px-3 py-1 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold rounded-full whitespace-nowrap">
                ISO 9001:2015 & OIML R60
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-300 leading-relaxed font-light">
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  1. High-Accuracy Digital Load Cell Sensor Network
                </h4>
                <p>
                  EWS utilizes premium strain-gauge and quartz piezo load sensors capable of micro-gram sensitivity. Each cell is coupled to an EWS multi-channel digital transducer that performs active temperature compensation, anti-vibration FFT filtering, and zero-point drift suppression.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  2. Dynamic High-Speed Inline Checkweighers
                </h4>
                <p>
                  Built for high-volume production lines, EWS dynamic weighers weigh items on moving belts at speeds exceeding 220 packs per minute with a standard deviation under ±0.1g. Integrated rejection mechanisms (pneumatic arm, air blast, drop belt) eliminate non-conforming items instantly.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  3. Automated Batching, Hopper & Silo Systems
                </h4>
                <p>
                  EWS Loss-in-Weight and Gain-in-Weight micro-dosing systems meter precise ratios of powders, liquids, and bulk solids. Outfitted with electro-pneumatic slide gates, screw feeders, and pneumatic vibrators, EWS hoppers deliver repeatable ingredient blending.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  4. Industry 4.0 Telemetry & ERP Integration
                </h4>
                <p>
                  Every EWS weighing terminal supports Ethernet/IP, Profinet, Modbus TCP, and OPC UA protocols. Real-time batch logs, weight histograms, and calibration audit trails are pushed automatically to SAP, Oracle ERP, or cloud monitoring dashboards.
                </p>
              </div>
            </div>

            {/* EWS Specifications Summary Matrix */}
            <div className="mt-8 pt-8 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                EWS Standard Engineering Specifications
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CAPACITY RANGE</span>
                  <span className="text-white font-bold">10 g to 500 Tons</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">ACCURACY CLASS</span>
                  <span className="text-brand-orange font-bold">OIML C3 / C6 Class</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">INGRESS PROTECTION</span>
                  <span className="text-white font-bold">IP68 / IP69K (SS316L)</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">SAMPLING RATE</span>
                  <span className="text-brand-ice font-bold">4,800 conv/sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:bg-slate-900/80 hover:border-brand-orange/20 transition-all duration-300 shadow-md flex flex-col items-start gap-4 group"
            >
              <div className="p-3 bg-brand-orange/10 rounded-lg group-hover:scale-110 transition-transform">
                {val.svg}
              </div>
              <h4 className="text-lg font-bold text-white tracking-wide">
                {val.title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
