"use client";

import { useEffect, useState } from "react";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 animate-fade-in">
      
      {/* Call floating button */}
      <a
        href="tel:+15550192834"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange text-white shadow-lg hover:bg-orange-500 hover:scale-105 transition-all duration-200"
        aria-label="Call TCP Automation"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {/* Tooltip */}
        <span className="absolute right-14 bg-slate-900 border border-slate-800 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          Call Sales
        </span>
      </a>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/15550192834?text=Hello%20TCP%20Automation,%20I%20would%20like%20to%20inquire%20about%20your%20automation%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20ba59] hover:scale-105 transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG Icon */}
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.791-4.382 9.794-9.786.002-2.618-1.01-5.078-2.852-6.923C16.37 2.05 13.918.064 12.01.064c-5.407 0-9.794 4.384-9.797 9.79-.001 1.702.443 3.363 1.286 4.805L2.222 21.8l4.425-1.646zm9.89-6.385c-.269-.134-1.593-.787-1.839-.877-.247-.09-.427-.134-.607.134-.18.269-.696.877-.853 1.055-.157.178-.315.2-.584.067-.27-.134-1.14-.42-2.17-1.34-.8-.714-1.34-1.597-1.498-1.866-.157-.269-.016-.414.119-.548.121-.121.269-.315.404-.471.134-.157.18-.269.269-.449.09-.179.045-.336-.022-.471-.067-.134-.607-1.462-.832-2.004-.219-.526-.44-.454-.607-.463-.156-.008-.337-.01-.517-.01-.18 0-.472.067-.719.336-.247.269-.944.922-.944 2.25 0 1.328.966 2.61 1.101 2.79.135.179 1.902 2.904 4.6 4.07.643.277 1.144.443 1.534.567.646.205 1.233.176 1.698.107.518-.077 1.593-.651 1.819-1.278.225-.627.225-1.166.157-1.277-.067-.111-.247-.179-.517-.313z" />
        </svg>
        {/* Tooltip */}
        <span className="absolute right-14 bg-slate-900 border border-slate-800 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          Chat Support
        </span>
      </a>

    </div>
  );
}
