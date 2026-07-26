"use client";

import Link from "next/link";
import Image from "next/image";



export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">

          {/* Company Brief */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-8 relative flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="EWS Logo"
                  width={40}
                  height={32}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-base font-extrabold tracking-wider text-white">
                ELECTRA WEIGHING SYSTEMS
              </span>
            </div>

            <p className="text-xs sm:text-sm font-light leading-relaxed">
              Electra Weighing Systems (EWS) is a premium manufacturer of high-accuracy industrial weighing machinery, digital load cell instrumentation, dynamic checkweighers, and custom SPM automation systems.
            </p>
          </div>

          {/* Quick Sitemap */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-brand-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-orange font-bold text-white transition-colors">
                  Products Catalog
                </Link>
              </li>
              <li>
                <Link href="/founders" className="hover:text-brand-orange font-bold text-white transition-colors">
                  Founders & Leadership
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-brand-orange transition-colors">
                  About EWS
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-brand-orange transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-brand-orange transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>


          {/* Industry Solutions */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" onClick={(e) => handleNavClick(e, "products")} className="hover:text-brand-orange transition-colors">
                  Special Purpose Machines (SPM)
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleNavClick(e, "products")} className="hover:text-brand-orange transition-colors">
                  PLC Automation Panels
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleNavClick(e, "products")} className="hover:text-brand-orange transition-colors">
                  Material Handling Conveyors
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleNavClick(e, "products")} className="hover:text-brand-orange transition-colors">
                  Robotic Welding & Assembly Cells
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact coords */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs font-light leading-relaxed">
              Subscribe to receive updates on our latest custom-built machines and automation engineering releases.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter work email"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 text-white rounded text-xs focus:border-brand-orange focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded hover:bg-orange-500 transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-500">
          <span>
            &copy; {new Date().getFullYear()} Electra Weighing Systems (EWS). All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Controls</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
