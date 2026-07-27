"use client";

import { useState, useEffect } from "react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function QuoteModal({ isOpen, onClose, productName }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "SPM",
    timeline: "1-3 months",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          productName: productName || formData.interest,
          ...formData,
        }),
      });
    } catch (error) {
      console.error("Error submitting quote request:", error);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };


  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      interest: "SPM",
      timeline: "1-3 months",
      message: "",
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Responsive Modal Container */}
      <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/90 animate-slide-up z-10 max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col my-auto">
        {/* Top Glow Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange via-brand-ice to-brand-orange flex-shrink-0" />

        {/* Modal Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950 flex-shrink-0">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-brand-orange">
              Request a Consultation
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              Get an Automation Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 overscroll-contain">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-2">
                Share your machine requirements, and our engineering team will connect with a project estimate.
              </p>

              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-lg focus:border-brand-orange focus:outline-none transition-colors text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Electra Industries"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-lg focus:border-brand-orange focus:outline-none transition-colors text-base sm:text-sm"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@electraweighing.com"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-lg focus:border-brand-orange focus:outline-none transition-colors text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 9566962031"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-lg focus:border-brand-orange focus:outline-none transition-colors text-base sm:text-sm"
                  />
                </div>
              </div>

              {/* Automation Interest & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    System Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-lg focus:border-brand-orange focus:outline-none transition-colors text-base sm:text-sm cursor-pointer"
                  >
                    <option value="Checkweigher">Dynamic Inline Checkweigher</option>
                    <option value="HopperBatching">Automatic Hopper Batching Rig</option>
                    <option value="SiloWeighing">Tank & Silo Weighing Module</option>
                    <option value="BeltScale">Belt Conveyor Scale</option>
                    <option value="SPM">Special Purpose Machine (SPM)</option>
                    <option value="Custom">Custom Machinery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Target Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-lg focus:border-brand-orange focus:outline-none transition-colors text-base sm:text-sm cursor-pointer"
                  >
                    <option value="Immediate">Urgent (&lt; 1 month)</option>
                    <option value="1-3 months">1 - 3 Months</option>
                    <option value="3-6 months">3 - 6 Months</option>
                    <option value="6+ months">Flexible (6+ months)</option>
                  </select>
                </div>
              </div>

              {/* Message Description */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Project Requirements / Specs
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe target cycle time, weighing capacity, or machine requirements..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-lg focus:border-brand-orange focus:outline-none transition-colors text-base sm:text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full pt-3 pb-3 bg-brand-orange hover:bg-orange-500 disabled:bg-slate-800 text-white font-bold rounded-lg tracking-wide transition-all shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting RFQ...
                  </>
                ) : (
                  "Submit RFQ Details"
                )}
              </button>
            </form>
          ) : (
            <div className="py-6 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center border border-green-500/25 mb-4 animate-bounce">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Request Submitted Successfully</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-4">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your RFQ has been logged with reference ID <strong className="text-brand-orange">RFQ-{Math.floor(100000 + Math.random() * 900000)}</strong>.
              </p>
              <p className="text-[11px] text-slate-500 mb-6">
                Our engineers will review your specs and email you within 1 business day.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-slate-800 text-white text-xs rounded-lg font-bold hover:bg-slate-700 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
