"use client";

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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-orange rounded flex items-center justify-center font-bold text-white text-base tracking-tight">
                TCP
              </div>
              <span className="text-lg font-bold tracking-wider text-white">
                AUTOMATION
              </span>
            </div>
            <p className="text-xs sm:text-sm font-light leading-relaxed">
              TCP Automation is a premium design and manufacturing company of high-performance custom Special Purpose Machines (SPM), conveyor networks, and robotic cells for Industry 4.0 production environments.
            </p>
          </div>

          {/* Quick Sitemap */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sitemap
            </h4>
            <ul className="space-y-2 text-xs">
              {["home", "about", "products", "services", "projects", "gallery", "contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={(e) => handleNavClick(e, link)}
                    className="hover:text-brand-orange capitalize transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
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
            &copy; {new Date().getFullYear()} TCP Automation. All rights reserved.
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
