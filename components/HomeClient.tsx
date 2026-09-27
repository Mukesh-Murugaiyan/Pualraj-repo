"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FoundersSection from "@/components/FoundersSection";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import QuoteModal from "@/components/QuoteModal";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollReveal from "@/components/ScrollReveal";
import { Product } from "@/lib/products";

interface HomeClientProps {
  initialProducts?: Product[];
}

export default function HomeClient({ initialProducts = [] }: HomeClientProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  const handleOpenQuote = (productName?: string) => {
    setSelectedProduct(productName || "");
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col justify-between selection:bg-brand-orange selection:text-white relative">
      {/* Top Motion Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Header / Nav */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main content body with staggered viewport entrance animations */}
      <main className="flex-grow">
        <Hero onOpenQuote={() => handleOpenQuote()} />

        <ScrollReveal direction="up" delay={50}>
          <About />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={50}>
          <FoundersSection />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={50}>
          <Products initialProducts={initialProducts} onOpenQuote={(prodTitle) => handleOpenQuote(prodTitle)} />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={50}>
          <Services />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={50}>
          <Industries />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={50}>
          <WhyChooseUs />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={50}>
          <Testimonials />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={50}>
          <Contact />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call & WhatsApp Widgets */}
      <FloatingActions />

      {/* Dynamic intake form modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        productName={selectedProduct}
      />
    </div>
  );
}
