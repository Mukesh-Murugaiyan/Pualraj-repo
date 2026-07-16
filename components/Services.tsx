"use client";

export default function Services() {
  const servicesList = [
    {
      title: "Mechanical CAD Design",
      desc: "Comprehensive 3D mechanical designs and structural simulation modeling using industry-grade SolidWorks and Inventor suites. We design for robust cyclic fatigue resistance.",
      points: [
        "Finite Element Analysis (FEA) testing",
        "Kinematic system movement modeling",
        "Pneumatic and hydraulic layout designs",
        "BOM generation & raw material specification",
      ],
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      title: "Electrical Control Panel Wiring",
      desc: "Assembly of premium power control modules, motor control centers (MCC), and instrument cabinets built to high-quality safety standards.",
      points: [
        "In-house wire ferruling & wire tracing tags",
        "Busbar layout & thermal ventilation setups",
        "Short-circuit and continuity test certificates",
        "SMC pneumatic manifold panel integrations",
      ],
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "PLC & HMI Programming",
      desc: "Custom software engineering for complex machine logic, interlock protections, sensor processing, and high-performance, user-friendly operator touchscreens.",
      points: [
        "IEC 61131-3 standard code (Ladder, Structured Text)",
        "Responsive, easy-to-use alarm diagnostic screen designs",
        "Ethernet/IP, Profinet, and Modbus networking",
        "Recipe management database scripting",
      ],
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Robotic Integration",
      desc: "Turnkey development of robotic operations for automated loading, assembly, sorting, and high-precision welding. Vision system calibration included.",
      points: [
        "articulated 6-axis, SCARA, and Delta robot configuration",
        "Bespoke end-of-arm gripper design (EOAT)",
        "3D optical vision sensor tracking",
        "Operator collaborative (Cobot) safety configuration",
      ],
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Site Installation & Commissioning",
      desc: "On-site installation, precision leveling, electrical tie-ins, dry-run, and wet-run commissioning testing by our global mobilization team.",
      points: [
        "Mechanical installation & alignment verification",
        "Cable tray routing & field wiring tie-ins",
        "Site Acceptance Testing (SAT) sign-offs",
        "Operator hands-on training tutorials",
      ],
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Retrofitting & Upgrades",
      desc: "Breathing new life into mechanically sound but electrically obsolete production equipment. Minimize cost while securing modern speed and safety.",
      points: [
        "Obsolete PLC-to-modern-PLC program migration",
        "Relay logic replacement with safety controllers",
        "HMI upgrade with IIoT data analytics dashboard",
        "Energy efficiency review & servo-drive retrofits",
      ],
      icon: (
        <svg className="w-6 h-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            End-to-End Automation Engineering
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded" />
          <p className="text-slate-400 font-light leading-relaxed">
            From initial factory floor consult and feasibility research to installation and remote support, our engineering team manages the entire lifecycle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 hover:bg-slate-900/80 hover:border-brand-ice/20 transition-all duration-300 shadow-md group relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand-orange/10 rounded-lg group-hover:scale-105 transition-transform flex-shrink-0">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                {service.desc}
              </p>

              <div className="border-t border-slate-850 pt-4">
                <ul className="space-y-1.5">
                  {service.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-ice flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
