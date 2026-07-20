export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  videoUrl?: string;
  features: string[];
  specs: Record<string, string>;
  applications: string[];
  benefits: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "spm",
    title: "Special Purpose Machines (SPM)",
    subtitle: "Custom-Engineered Manufacturing & Assembly Equipment",
    category: "Custom Machinery",
    desc: "Custom-designed high-precision machines engineered to automate single or multi-stage tasks with extreme repeatability, cycle time reduction, and integrated quality checks.",
    fullDescription: "Our Special Purpose Machines (SPMs) are engineered from the ground up to automate specialized manufacturing processes that standard off-the-shelf machinery cannot accomplish. Built with high-rigidity structural frames, precision indexing turntables, pneumatic/servo actuators, and vision/laser sensors, each machine is tailored to your exact manufacturing cell layout and production goals.",
    image: "/images/real/img_1.jpg",
    gallery: [
      "/images/real/img_1.jpg",
      "/images/real/img_2.jpg",
      "/images/real/img_3.jpg",
      "/images/real/img_4.jpg",
      "/images/real/img_5.jpg"
    ],
    videoUrl: "/videos/real/video_1.mp4",
    features: [
      "Custom multi-station rotary indexing and linear transfer mechanisms",
      "High-torque servo actuators with sub-millimeter position control",
      "Integrated leak testing, laser displacement, and optical sensors",
      "Automated part loading, pneumatic clamping, and reject ejection",
      "Heavy-duty powder-coated structural steel frame with safety interlocks",
      "Siemens & Allen-Bradley PLC control with intuitive HMI screen"
    ],
    specs: {
      "Cycle Time": "1.8 - 4.5 seconds per part",
      "Repeatability": "±0.01 mm",
      "Frame Structure": "Heavy Structural Steel (Powder Coated)",
      "Control System": "Siemens S7-1500 / Rockwell CompactLogix",
      "Sensor Integration": "Keyence & Omron Inspection Sensors",
      "Safety Compliance": "CE / ISO 13849-1 Category 4 / SIL 3"
    },
    applications: [
      "Automotive Engine & Gearbox Component Assembly",
      "Electric Vehicle (EV) Battery Module Fabrication",
      "Aerospace Machining & Drilling Stations",
      "High-Volume Medical Device & Syringe Assembly",
      "Precision Fastener & Bearing Press Fit Machines"
    ],
    benefits: [
      "Up to 65% reduction in production cycle times",
      "Zero-defect output through 100% inline sensor verification",
      "Substantial reduction in manual labor dependence and ergonomics risk",
      "Ergonomic operator touchscreens with live OEE analytics"
    ]
  },
  {
    id: "bagging-tower",
    title: "Automated Bagging & Mill Packing Tower",
    subtitle: "High-Volume Grain, Rice & Powder Bagging Station",
    category: "Packing Machinery",
    desc: "Heavy-duty automated elevator, hopper feed, precision weighing, and conveyorized bag stitching machine for agricultural and chemical processing plants.",
    fullDescription: "Our Automated Bagging & Mill Packing Towers are heavy-duty industrial structures integrated with high-capacity storage hoppers, pneumatic gate dosing valves, digital load-cell weighing platforms, and continuous motorized bag stitching conveyors. Engineered for fast, dust-controlled bagging operations in rice mills, agricultural grain plants, and chemical processing facilities.",
    image: "/images/real/img_3.jpg",
    gallery: [
      "/images/real/img_3.jpg",
      "/images/real/img_4.jpg",
      "/images/real/img_2.jpg",
      "/images/real/img_6.jpg"
    ],
    videoUrl: "/videos/real/video_2.mp4",
    features: [
      "High-capacity overhead steel storage hopper with level sensors",
      "Pneumatic double-stage cut-off gates for micro-gram precision weighing",
      "Integrated heavy-duty bag sealing & thread sewing head",
      "Motorized belt conveyor for smooth filled bag transport",
      "Industrial digital weight indicator with touchscreen PLC batch control",
      "Dust collection shroud and pneumatic bag clamping jaw"
    ],
    specs: {
      "Bagging Speed": "12 - 20 bags / minute (25kg - 50kg bags)",
      "Weighing Accuracy": "±10 grams per bag",
      "Tower Structure": "Heavy Structural Channel & Column Steelwork",
      "Pneumatics": "Festo / SMC High-Flow Cylinder Valves",
      "Control Panel": "IP65 Enclosure with Delta / Siemens HMI",
      "Power Supply": "415V 3-Phase 50Hz"
    },
    applications: [
      "Rice Mill & Grain Processing Facilities",
      "Sugar & Fertilizer Packaging Lines",
      "Animal Feed & Pellet Bagging Units",
      "Chemical Powder & Plastic Granule Packaging",
      "Cement & Construction Mortar Pre-mix Plants"
    ],
    benefits: [
      "Doubles bagging throughput compared to semi-manual packing",
      "Eliminates material giveaway with high-precision load cells",
      "Reduces operator fatigue and dust exposure",
      "Continuous heavy-duty operation in demanding mill environments"
    ]
  },
  {
    id: "conveyors",
    title: "Conveyor Systems & Material Handling",
    subtitle: "Modular Inclined Belt, Roller & Chain Conveyors",
    category: "Material Transport",
    desc: "High-traction chevron belt conveyors, roller lines, and inclined elevator systems on heavy caster wheels for flexible factory and warehouse material transit.",
    fullDescription: "TCP Conveyor Systems streamline logistics and part flow across your manufacturing floor. Designed with extruded modular aluminum or structural steel frameworks, our inclined chevron belt conveyors feature variable speed frequency drives, heavy-duty mobile locking casters, adjustable height jacks, and robust side guards.",
    image: "/images/real/img_1.jpg",
    gallery: [
      "/images/real/img_1.jpg",
      "/images/real/img_7.jpg",
      "/images/real/img_8.jpg",
      "/images/real/img_9.jpg"
    ],
    videoUrl: "/videos/real/video_3.mp4",
    features: [
      "High-traction chevron pattern rubber/PVC belt for steep incline transport",
      "Variable Frequency Drives (VFD) for smooth speed adjustment",
      "Heavy-duty swivel caster wheels with directional foot brakes",
      "Telescopic screw-jack height adjustment mechanisms",
      "Emergency pull-cord safety switches along the conveyor length",
      "Photoelectric sensor tracking for automated start/stop saving power"
    ],
    specs: {
      "Load Capacity": "Up to 5,000 kg / meter",
      "Chassis Material": "Powder-coated Heavy Structural Steel / SS 304",
      "Motor Drives": "SEW Eurodrive / Nord Gearbox with VFD",
      "Sorting Speed": "Up to 90 meters / minute",
      "Incline Angle": "Adjustable 15° to 45°",
      "Control Box": "IP65 Weatherproof Starter Panel with E-Stop"
    },
    applications: [
      "High-Speed Industrial Material Loading & Unloading",
      "FMCG Packaging & Box Conveyance",
      "Agricultural Product & Sack Transit",
      "E-Commerce Fulfillment Center Sorting Loops",
      "Heavy Metal Stamping & Scrap Handling"
    ],
    benefits: [
      "Eliminates bottlenecking in inter-process transfers",
      "Reduces manual material lifting by up to 95%",
      "Mobile chassis allows quick relocation across plant floors",
      "Flexible modular design easily reconfigurable for new workflows"
    ]
  },
  {
    id: "dosing-hopper",
    title: "Pneumatic Dosing & Hopper Feeder System",
    subtitle: "Precision Material Feeding & Volumetric Dispensing",
    category: "Dosing Machinery",
    desc: "Automated pneumatic chute feeder with precision slide gate valves, vibratory bowl integration, and stainless steel discharge hoppers.",
    fullDescription: "Engineered for consistent flow of bulk solids, powders, and small components. Featuring heavy stainless steel funnel hoppers, pneumatic linear slide gates, anti-bridging vibrators, and programmable timer/weight dosing controls.",
    image: "/images/real/img_2.jpg",
    gallery: [
      "/images/real/img_2.jpg",
      "/images/real/img_10.jpg",
      "/images/real/img_11.jpg",
      "/images/real/img_12.jpg"
    ],
    videoUrl: "/videos/real/video_4.mp4",
    features: [
      "Heavy SS 304 anti-corrosive hopper body with smooth internal finish",
      "Pneumatic compact linear actuators for millisecond gate opening",
      "High-frequency pneumatic vibrator to prevent bridging & clumping",
      "Adjustable flow control valves for fine metering",
      "Level sensor ports for automated refills from bulk silos",
      "Easy-clean sanitary design with quick-release clamps"
    ],
    specs: {
      "Dosing Speed": "Up to 45 dispenses / minute",
      "Hopper Capacity": "50 to 1,000 Liters (Customizable)",
      "Material Grade": "Stainless Steel 304 / 316L Contact Parts",
      "Actuation": "Double-acting pneumatic cylinders with reed switches",
      "Controls": "PLC timed dosing or load cell feedback",
      "Air Pressure": "5 - 7 bar clean compressed air"
    },
    applications: [
      "Food Ingredient Dosing & Spices Batching",
      "Plastic Granule Masterbatch Hopper Feeding",
      "Chemical & Pharmaceutical Powder Dispensing",
      "Fastener & Hardware Automated Counting Lines",
      "Foundry & Mineral Additive Dosing"
    ],
    benefits: [
      "Eliminates manual scoop measurement errors",
      "Consistent batch repeatability with micro-second valve control",
      "Sanitary SS construction easy to sanitize between product runs",
      "Smooth material flow preventing hopper clogging"
    ]
  },
  {
    id: "plc",
    title: "PLC Automation & Control Panels",
    subtitle: "The Brain & Control Center of Industrial Systems",
    category: "Electrical & Controls",
    desc: "Certified electrical control enclosures, modular PLC programming, SCADA monitoring, and industrial network integrations for total plant automation.",
    fullDescription: "We design, assemble, and commission industrial PLC control panels compliant with international safety and electrical standards. From single-machine retrofits to facility-wide automation architectures, our control panels bridge field instruments, drives, robotics, and SCADA/MES systems for real-time tracking and flawless machine execution.",
    image: "/images/real/img_5.jpg",
    gallery: [
      "/images/real/img_5.jpg",
      "/images/real/img_13.jpg",
      "/images/real/img_14.jpg",
      "/images/real/img_15.jpg"
    ],
    videoUrl: "/videos/real/video_5.mp4",
    features: [
      "Certified electrical enclosure design (IP65 / NEMA 4X options)",
      "Intuitive HMI user interfaces with real-time diagnostic alarms",
      "Plant-wide SCADA and IIoT cloud gateway connectivity",
      "Dual-channel safety relays, e-stop loops, and safety light curtains",
      "Clean wiring layout with clear wire ferrules and laser-engraved tags",
      "Remote VPN access hardware for quick technical support"
    ],
    specs: {
      "Enclosure Rating": "IP65 / NEMA 4X Stainless Steel / Mild Steel",
      "PLC Supported": "Siemens, Rockwell (Allen-Bradley), Mitsubishi, Omron",
      "HMI Sizes": "7-inch, 10-inch, 15-inch HD Touch Panels",
      "Communication": "Profinet, EtherNet/IP, Modbus TCP, CANopen",
      "Supply Voltage": "415V 3-Phase / 230V 1-Phase (50/60 Hz)",
      "Safety Rating": "SIL 3 / PL e Safety Architecture"
    },
    applications: [
      "Plant Machinery Control & Retrofitting",
      "Water Treatment & Chemical Dosing Automation",
      "HVAC & Boiler Management Systems",
      "Automated Warehouse Conveyor Control Enclosures",
      "Food & Beverage Process Automation"
    ],
    benefits: [
      "Unmatched uptime with industrial-grade surge and power protection",
      "Seamless integration into existing MES and Industry 4.0 networks",
      "Simplified troubleshooting with color-coded wiring and active digital diagnostics",
      "Modular expansion slots for future factory scale-up"
    ]
  },
  {
    id: "screw-feeder",
    title: "Stainless Steel Screw Feeder & Hopper Rig",
    subtitle: "Heavy-Duty Auger Conveyor & Silo Discharge System",
    category: "Custom Machinery",
    desc: "Robust stainless steel conical hopper with motor-driven auger screw feeder for transferring powders, sludges, and bulk materials.",
    fullDescription: "Our Stainless Steel Screw Feeder Rigs combine a heavy conical surge hopper with a precision shafted or shaftless screw auger conveyor. Built on a rigid structural steel support base, this system provides controlled, dust-free transfer of granular or sticky bulk materials from storage silos to downstream processing units.",
    image: "/images/real/img_5.jpg",
    gallery: [
      "/images/real/img_5.jpg",
      "/images/real/img_16.jpg",
      "/images/real/img_17.jpg",
      "/images/real/img_18.jpg"
    ],
    videoUrl: "/videos/real/video_6.mp4",
    features: [
      "Heavy-gauge stainless steel conical hopper with inspection hatch",
      "Hardened steel auger screw flighting for wear resistance",
      "Direct-coupled heavy-duty gear motor with variable speed inverter",
      "Dust-tight tube housing with quick-disconnect cleanout ports",
      "Robust welded structural steel skid frame for outdoor/indoor mounting",
      "Integrated anti-bridging arch breaker agitator"
    ],
    specs: {
      "Conveying Capacity": "1 to 35 Tons / Hour",
      "Auger Diameter": "100 mm to 500 mm Screw Flighting",
      "Material": "SS 304 / SS 316L / Carbon Steel Option",
      "Drive System": "Bonfiglioli / SEW Eurodrive Helical Bevel Gear Motor",
      "Incline Capability": "0° Horizontal to 60° Steep Incline",
      "Sealing": "Gland packing & air-purged shaft seals"
    },
    applications: [
      "Bulk Powder & Grain Elevator Feeding",
      "Chemical Industry Sludge & Catalyst Handling",
      "Cement & Mineral Processing",
      "Waste Water Treatment Sludge De-watering",
      "Biomass & Wood Pellet Conveyance"
    ],
    benefits: [
      "Totally enclosed dust-free operation keeping factory air clean",
      "Handles challenging damp, sticky, or abrasive bulk materials",
      "Compact footprint with high incline transfer capability",
      "Low maintenance direct drive without chains or pulleys"
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getRelatedProducts(currentId: string, limit: number = 3): Product[] {
  return PRODUCTS.filter((product) => product.id !== currentId).slice(0, limit);
}
