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
              years: 15,
              projects: 150,
              engineers: 45,
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
      title: "Precision Engineering",
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
            Company Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Leading the Evolution in Industrial Automation
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded" />
          <p className="text-slate-400 font-light leading-relaxed">
            TCP Automation is a premium engineering firm specializing in custom-built Special Purpose Machines (SPM), conveyor networks, and robotic integration. We transform complex manufacturing workflows into highly efficient, high-performance automated systems.
          </p>
        </div>

        {/* Core Description + Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6 text-slate-300 font-light leading-relaxed">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Designing the Future of Manufacturing
            </h3>
            <p>
              Since our inception, we have partnered with market leaders in the automotive, pharmaceutical, FMCG, and warehousing sectors to solve bottleneck challenges. We offer a comprehensive suite of services ranging from initial system consultancy and 3D modeling to structural fabrication, electrical control wiring, and site commissioning.
            </p>
            <p>
              By implementing smart sensors and modular assembly architectures, our machines are fully optimized for data tracking, remote diagnostics, and energy conservation. Whether you require a standalone conveyor belt or a fully synchronized multi-axis robotic cell, TCP Automation delivers.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 text-center shadow-lg shadow-black/10 hover:border-brand-orange/30 transition-colors">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stats.years}+
              </span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Years of Excellence
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 text-center shadow-lg shadow-black/10 hover:border-brand-blue/30 transition-colors">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stats.projects}+
              </span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Automated Systems Built
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 text-center shadow-lg shadow-black/10 hover:border-brand-blue/30 transition-colors">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stats.engineers}+
              </span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Skilled Tech Experts
              </span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 text-center shadow-lg shadow-black/10 hover:border-brand-orange/30 transition-colors">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stats.satisfaction}%
              </span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Client Satisfaction
              </span>
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
