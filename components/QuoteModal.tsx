"use client";

import { useState, useEffect } from "react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
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

  // Prevent scroll when modal is open
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-brand-blue rounded-xl overflow-hidden shadow-2xl shadow-black/80 animate-slide-up z-10">
        {/* Top Glow bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-brand-orange to-brand-ice" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                  Request a Consultation
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Get an Automation Quote</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Share your project requirements, and our engineering team will get back to you with a conceptual outline.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. TCP Industries"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@tcp.com"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 555-019-2834"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Automation Type
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm cursor-pointer"
                    >
                      <option value="SPM">Special Purpose Machine (SPM)</option>
                      <option value="PLC">PLC Automation Panel</option>
                      <option value="Conveyor">Conveyor System</option>
                      <option value="Robotic">Robotic Automation</option>
                      <option value="Custom">Custom Machinery</option>
                      <option value="Other">Other Integration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                      Required Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm cursor-pointer"
                    >
                      <option value="Immediate">Urgent (&lt; 1 month)</option>
                      <option value="1-3 months">1 - 3 Months</option>
                      <option value="3-6 months">3 - 6 Months</option>
                      <option value="6+ months">Flexible (6+ months)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                    Project Requirements / Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the machine, target cycle time, components to handle, or existing system upgrade requirements..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-brand-orange hover:bg-orange-500 disabled:bg-slate-700 text-white font-bold rounded tracking-wide transition-all shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing Requirements...
                    </>
                  ) : (
                    "Submit RFQ Details"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center border border-green-500/25 mb-4 animate-bounce">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Request Submitted Successfully</h3>
              <p className="text-sm text-slate-400 max-w-sm mb-6">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your RFQ has been logged with reference ID <strong className="text-brand-orange">RFQ-{Math.floor(100000 + Math.random() * 900000)}</strong>.
              </p>
              <p className="text-xs text-slate-500 mb-6">
                Our automation engineers will review your specs and email you within 1 business day.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-slate-800 text-white rounded font-bold hover:bg-slate-700 transition-colors"
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
