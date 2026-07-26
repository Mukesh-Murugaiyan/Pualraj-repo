"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import QuoteModal from "@/components/QuoteModal";
import { FOUNDERS } from "@/lib/seo";

export default function FoundersClient() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col justify-between selection:bg-brand-orange selection:text-white">
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
              Leadership & Engineering Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Founders of Electra Weighing Systems (EWS)
            </h1>
            <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full" />
            <p className="text-slate-400 font-light text-base leading-relaxed">
              Guided by a passion for micro-gram accuracy and robust industrial automation, our leadership team has spearheaded 700+ custom weighing & SPM automation deployments across heavy process industries.
            </p>
          </div>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {FOUNDERS.map((founder, index) => (
              <div
                key={founder.name}
                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-orange/10 transition-colors" />

                <div className="space-y-6 relative z-10">
                  {/* Avatar Badge & Role Header */}
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-600 flex items-center justify-center font-extrabold text-white text-2xl shadow-lg shadow-brand-orange/30">
                      {founder.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-brand-orange uppercase tracking-widest block">
                        {founder.role}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {founder.name}
                      </h2>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">
                        {founder.jobTitle}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    {founder.bio}
                  </p>

                  {/* Areas of Expertise */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Core Technical Specializations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {founder.knowsAbout.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-xs font-mono text-slate-300 group-hover:border-slate-700 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Contact Coordinates */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Phone:</span>
                      <div className="flex gap-2 font-bold text-white">
                        {founder.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="hover:text-brand-orange transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Direct Email:</span>
                      <a
                        href={`mailto:${founder.email}`}
                        className="font-bold text-brand-orange hover:underline"
                      >
                        {founder.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer action inside card */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    Electra Weighing Systems Board of Directors
                  </span>
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="px-4 py-2 bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white border border-brand-orange/30 text-xs font-bold rounded-lg transition-all cursor-pointer"
                  >
                    Consult Leadership
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EWS Engineering Vision Section */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
            <span className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest">
              Founders Commitment to Zero-Error Precision
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              “In heavy industry, single gram discrepancies compound into millions in loss.”
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed max-w-2xl mx-auto">
              Under Paulraj.S and Silambarasan.R, Electra Weighing Systems has built a culture of relentless quality control, using hermetically sealed IP68/IP69K strain gauge load sensors, high-speed 4800Hz digital ADCs, and bespoke PLC logic engineered to perform in extreme heat, moisture, and mechanical vibration.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="px-6 py-3 bg-brand-orange text-white font-bold text-sm rounded-xl hover:bg-orange-500 transition-colors shadow-lg shadow-brand-orange/20"
              >
                Browse Our Product Range
              </Link>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="px-6 py-3 bg-slate-950 border border-slate-800 hover:border-slate-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Request Custom Solution Quote
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <FloatingActions />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
