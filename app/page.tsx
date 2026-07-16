"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProjectsGallery from "@/components/ProjectsGallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import QuoteModal from "@/components/QuoteModal";

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col justify-between selection:bg-brand-orange selection:text-white">
      {/* Header / Nav */}
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

      {/* Main content body */}
      <main className="flex-grow">
        {/* Sections */}
        <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
        <About />
        <Products onOpenQuote={() => setIsQuoteOpen(true)} />
        <Services />
        <Industries />
        <WhyChooseUs />
        <ProjectsGallery />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call & WhatsApp Widgets */}
      <FloatingActions />

      {/* Dynamic intake form modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}

