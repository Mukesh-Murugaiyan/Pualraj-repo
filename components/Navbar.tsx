"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


interface NavbarProps {
  onOpenQuote: () => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { id: "home", label: "Home", href: "/#home", isRoute: false },
    { id: "about", label: "About", href: "/#about", isRoute: false },
    { id: "products", label: "Products", href: "/products", isRoute: true },
    { id: "founders", label: "Founders", href: "/founders", isRoute: true },
    { id: "services", label: "Services", href: "/#services", isRoute: false },
    { id: "why-us", label: "Why Us", href: "/#why-us", isRoute: false },
    { id: "contact", label: "Contact", href: "/#contact", isRoute: false },
  ];


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Only observe scroll sections if on homepage
    if (pathname === "/") {
      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { id: string; label: string; isRoute: boolean; href?: string }
  ) => {
    setIsOpen(false);
    if (item.isRoute && item.href) {
      // Let standard Next Link or browser handle page routing
      return;
    }

    e.preventDefault();
    if (pathname === "/") {
      const target = document.getElementById(item.id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${item.id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || pathname !== "/"
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4 shadow-lg shadow-black/40"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-10 relative flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.svg"
                  alt="EWS Logo"
                  width={48}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-wider text-white leading-none">
                  ELECTRA WEIGHING
                </span>
                <span className="text-[10px] font-mono text-brand-orange tracking-widest uppercase mt-0.5">
                  SYSTEMS & AUTOMATION
                </span>
              </div>
            </Link>

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2 items-center">
            {navItems.map((item) => {
              const isActive = (pathname === "/" && activeSection === item.id) || (item.isRoute && pathname === item.href);
              if (item.isRoute) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                        ? "text-brand-orange bg-brand-orange/10 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                      ? "text-brand-orange bg-brand-orange/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              onClick={onOpenQuote}
              className="ml-4 px-5 py-2.5 bg-brand-orange text-white rounded-lg font-semibold text-sm hover:bg-orange-500 transition-all shadow-md shadow-brand-orange/20 hover:shadow-brand-orange/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Get Quote
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="px-3.5 py-2 bg-brand-orange text-white rounded-lg font-semibold text-xs hover:bg-orange-500 transition-all cursor-pointer"
            >
              Get Quote
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slidedown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100 bg-slate-950/95 border-b border-slate-800" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3">
          {navItems.map((item) => {
            const isActive = (pathname === "/" && activeSection === item.id) || (item.isRoute && pathname === item.href);
            if (item.isRoute) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive
                      ? "text-brand-orange bg-brand-orange/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive
                    ? "text-brand-orange bg-brand-orange/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

    </header>
  );
}
