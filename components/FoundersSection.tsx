"use client";

import Link from "next/link";
import { FOUNDERS } from "@/lib/seo";

export default function FoundersSection() {
  return (
    <section id="founders-section" className="py-24 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-orange/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            Visionary Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Meet the Founders & Directors
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto rounded-full" />
          <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed">
            Behind Electra Weighing Systems (EWS) are seasoned automation innovators with over 15+ years of pioneering experience in high-accuracy strain gauge load cells, rice packing machinery, and custom SPM automation.
          </p>
        </div>

        {/* Big Founders Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {FOUNDERS.map((founder) => (
            <div
              key={founder.name}
              className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-orange/15 transition-all duration-500" />

              <div className="space-y-6 relative z-10">
                {/* Header Avatar & Details */}
                <div className="flex items-center gap-5">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-brand-orange via-amber-600 to-orange-700 flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-brand-orange/25 group-hover:scale-105 transition-transform duration-300">
                    {founder.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-brand-orange uppercase tracking-widest block mb-0.5">
                      {founder.role}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-brand-orange transition-colors">
                      {founder.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                      {founder.jobTitle}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                  {founder.bio}
                </p>

                {/* Core Expertise Tags */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    Specializations & Core Focus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {founder.knowsAbout.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 group-hover:border-slate-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Contacts */}
                <div className="pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-bold">Direct Call:</span>
                    <div className="flex flex-wrap gap-2 font-bold text-white">
                      {founder.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="hover:text-brand-orange transition-colors bg-slate-950 px-2.5 py-1 rounded border border-slate-800 hover:border-brand-orange/40"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <a
                      href={`mailto:${founder.email}`}
                      className="text-brand-orange hover:underline font-bold"
                    >
                      {founder.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <Link
                  href="/founders"
                  className="text-xs font-bold text-brand-orange hover:text-white transition-colors inline-flex items-center gap-1.5 group/link"
                >
                  View Full Leadership Profile
                  <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
                </Link>
                <span className="text-[11px] text-slate-500 font-mono">Electra Weighing Systems</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
