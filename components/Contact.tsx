"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "Inquiry",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Discuss Your Automation Project
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded" />
          <p className="text-slate-400 font-light leading-relaxed">
            Have a plant engineering challenge? Send us a message, and our sales team will connect you with a technical automation consultant.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Details & Form Column */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. TCP Industries"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sales@company.com"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 (555) 019-2834"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm cursor-pointer"
                  >
                    <option value="Inquiry">General Business Inquiry</option>
                    <option value="SPM">Special Purpose Machine Proposal</option>
                    <option value="Robotics">Articulated Robot Integration</option>
                    <option value="Service">Panel Assembly & Service Maintenance</option>
                    <option value="Careers">Career Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Describe Your Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the project goals, target timelines, or machinery requirements..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white rounded focus:border-brand-orange focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-orange hover:bg-orange-500 disabled:bg-slate-700 text-white font-bold rounded tracking-wide transition-all shadow-md shadow-brand-orange/15 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center border border-brand-orange/20 mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l8-4A2 2 0 0113 4.413V19M3 19h16m0 0v-8m0 8h2m-2-12h.01M3 19h16m-6-1H7M7 8h2m-2 3h2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Dispatched</h3>
                <p className="text-sm text-slate-400 max-w-md mb-8">
                  Thank you for reaching out, <strong className="text-white">{formData.name}</strong>. An automation sales manager has been notified and will review your subject inquiry regarding <strong className="text-brand-orange">{formData.subject}</strong>.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-800 text-white rounded font-bold hover:bg-slate-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Contact Coordinates & Map Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contacts */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Direct Call
                  </h4>
                  <a href="tel:+15550192834" className="text-sm font-bold text-white hover:text-brand-orange transition-colors">
                    +1 (555) 019-2834
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center border-t border-slate-850 pt-4">
                <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Technical Sales Email
                  </h4>
                  <a href="mailto:sales@tcpautomation.com" className="text-sm font-bold text-white hover:text-brand-orange transition-colors">
                    sales@tcpautomation.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center border-t border-slate-850 pt-4">
                <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    HQ Coordinates
                  </h4>
                  <span className="text-xs text-slate-300 leading-relaxed font-light">
                    Plot No. 42, Sector-5, Industrial Growth Centre, Automation Hub, CA 94103
                  </span>
                </div>
              </div>
            </div>

            {/* Map Frame wrapper with dark industrial filter styling */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden h-[250px] shadow-2xl relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5627913508107!2d-122.41941668468233!3d37.77492927975923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d6d34e2c9%3A0xc47e3a936a0f443b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1633000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
