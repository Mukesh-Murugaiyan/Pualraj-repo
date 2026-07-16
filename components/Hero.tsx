"use client";

import Image from "next/image";

interface HeroProps {
  onOpenQuote: () => void;
}

export default function Hero({ onOpenQuote }: HeroProps) {
  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-dark"
    >
      {/* Background Image with dark blue/black overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_factory.png"
          alt="Automated factory floor"
          fill
          priority
          className="object-cover object-center opacity-30 select-none scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#0B192C]/90 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-slate-950/90" />
        
        {/* Glow decorative balls */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-ice/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Area */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
              </span>
              Industry 4.0 Pioneers
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight select-none">
              Smart Industrial <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-ice glow-text-blue">
                Automation Solutions
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              We Design and Manufacture Special Purpose Machines (SPM), PLC Automation, Conveyor Systems, Robotic Automation and Custom Industrial Machines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-orange-500 text-white font-bold rounded shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
              >
                Get Quote
              </button>
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 font-semibold rounded hover:border-slate-500 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
              >
                Contact Us
              </a>
            </div>

            {/* Micro Feature highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">15+</p>
                <p className="text-xs text-slate-400 font-medium uppercase mt-0.5">Years Exp</p>
              </div>
              <div className="border-x border-slate-800/80 px-4">
                <p className="text-2xl font-bold text-white tracking-tight">150+</p>
                <p className="text-xs text-slate-400 font-medium uppercase mt-0.5">Machines Built</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">100%</p>
                <p className="text-xs text-slate-400 font-medium uppercase mt-0.5">Custom Design</p>
              </div>
            </div>
          </div>

          {/* Decorative Telemetry Panel */}
          <div className="lg:col-span-5 hidden lg:block animate-slide-up">
            <div className="relative mx-auto max-w-sm rounded-xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-black/80 backdrop-blur-md overflow-hidden group hover:border-brand-blue/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-ice/5 rounded-full blur-xl group-hover:bg-brand-ice/15 transition-all" />
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    System Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-brand-ice bg-brand-ice/10 px-2 py-0.5 rounded">
                  ONLINE
                </span>
              </div>

              {/* Body stats */}
              <div className="space-y-4 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>PLC STATUS</span>
                  <span className="text-green-400 font-semibold">CONNECTED [OK]</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ROBOT COORDINATES</span>
                  <span className="text-slate-400">X: 184.2, Y: -93.8, Z: 512.4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>CYCLE EFFICIENCY</span>
                  <span className="text-brand-orange font-bold">98.7%</span>
                </div>

                {/* Progress bar mock */}
                <div>
                  <div className="flex items-center justify-between mb-1 text-[10px] text-slate-500">
                    <span>ASSEMBLY LINE SPEED</span>
                    <span>1.2 m/s</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-blue to-brand-ice h-full w-[80%] animate-pulse" />
                  </div>
                </div>

                {/* Diagnostics logs */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded p-3 text-[10px] text-slate-400 space-y-1">
                  <div className="text-brand-ice">[15:19:02] Initializing PLC logic...</div>
                  <div className="text-slate-300">[15:19:03] Conveyor safety interlocks armed.</div>
                  <div className="text-brand-orange">[15:19:05] Robot cell calibration verified.</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Scroll Down mouse icon */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-500 select-none">
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] uppercase font-bold tracking-wider">Explore</span>
          <div className="w-6 h-10 border-2 border-slate-700 hover:border-brand-orange rounded-full flex justify-center p-1 transition-colors">
            <div className="w-1.5 h-3 bg-brand-orange rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
