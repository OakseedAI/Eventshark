/**
 * Event Shark - Seed Database
 * Contains rich mock data for key industry events spanning Tech, SaaS, Finance, Healthcare, Consumer Tech, and Military.
 * Event dates are calculated dynamically relative to the current time: July 10, 2026.
 */

// Helper to add days to a date string
function getDateOffset(days) {
  const baseDate = new Date("2026-07-10T00:00:00");
  baseDate.setDate(baseDate.getDate() + days);
  return baseDate.toISOString().split('T')[0];
}

const businessVerticals = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description: "Deep learning, NLP, generative models, and computer vision software, hardware, and services."
  },
  {
    id: "saas",
    name: "B2B SaaS",
    description: "Cloud-based enterprise software, customer relationship systems, workflow tools, and productivity applications."
  },
  {
    id: "finance",
    name: "Finance & Fintech",
    description: "Digital banking, payments, decentralized finance, trading tech, investment algorithms, and transaction security."
  },
  {
    id: "healthcare",
    name: "Healthcare & Mental Health",
    description: "Clinical systems, medical devices, diagnostics, digital therapeutics, mental health applications, and telehealth."
  },
  {
    id: "consumer-tech",
    name: "Consumer Tech & Retail",
    description: "Electronics, mobile devices, online stores, logistics, direct-to-consumer goods, and advertising tech."
  },
  {
    id: "military-industrial",
    name: "Military & Industrial",
    description: "Defense tech, security, avionics, industrial IoT, factory automation, robotics, and logistics hardware."
  },
  {
    id: "cleantech",
    name: "CleanTech & Sustainability",
    description: "Renewable energy software, battery technologies, smart grid integrations, and carbon tracking."
  }
];

const seedEvents = [
  {
    id: 1,
    name: "Global Tech Summit 2026",
    logoText: "GTS",
    date: getDateOffset(45), // ~ August 24, 2026
    location: "San Francisco, CA",
    website: "https://globaltechsummit.io",
    verticals: ["ai-ml", "saas"],
    description: "The premier gathering for software engineering leaders, AI researchers, and SaaS founders showcasing the next generation of cloud architectures.",
    opportunities: {
      keynote: {
        title: "Mainstage Visionary Keynotes",
        deadline: getDateOffset(15),
        description: "Submit proposals for 45-minute visionary sessions on the main stage regarding AI ethical alignment or global developer tooling trends.",
        link: "https://globaltechsummit.io/cfp/keynote"
      },
      abstract: {
        title: "Call for Technical Abstracts",
        deadline: getDateOffset(20),
        description: "Looking for in-depth whitepapers on LLM scaling laws, edge computing protocols, or distributed systems optimization.",
        link: "https://globaltechsummit.io/cfp/abstracts"
      },
      paper: {
        title: "Research Papers - Future of AI",
        deadline: getDateOffset(12),
        description: "Formal academic track submission for publication in the GTS 2026 Proceedings. Peer-reviewed by ACM/IEEE panels.",
        link: "https://globaltechsummit.io/cfp/papers"
      }
    },
    organizers: [
      { name: "Clara Vance", role: "VP of Programming", email: "clara.vance@globaltechsummit.io", linkedin: "https://linkedin.com/in/claravance-gts" },
      { name: "Marcus Stone", role: "Sponsor Relations", email: "sponsorship@globaltechsummit.io", linkedin: "https://linkedin.com/in/marcusstone-gts" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 45000, inclusions: ["15-minute speaking slot on the Main Stage", "Premium 20x20 central island booth in Expo Hall", "Full attendee list with lead contact info", "10 VIP full-access passes & 20 expo-only passes"] },
      { tier: "Gold", cost: 25000, inclusions: ["Panel speakership slot on standard track", "Standard 10x10 booth space", "Logo displayed on session intro slides & website footer", "5 full-access tickets"] },
      { tier: "Silver", cost: 12000, inclusions: ["Basic 10x10 booth space (rear corridor)", "Logo listed on website & badge backing", "2 full-access tickets"] },
      { tier: "Bronze", cost: 5000, inclusions: ["No booth included. Pull-up banner in registration lobby", "Logo printed in official digital handbook", "1 general attendee ticket"] }
    ]
  },
  {
    id: 2,
    name: "FinTech Frontiers Expo",
    logoText: "FFE",
    date: getDateOffset(90), // ~ October 8, 2026
    location: "New York City, NY",
    website: "https://fintechfrontiers.net",
    verticals: ["finance", "saas"],
    description: "East coast's largest conference focusing on global micro-payments, decentralized identity, transaction security, and banking SaaS applications.",
    opportunities: {
      keynote: {
        title: "Keynote Panels: Future of Crypto",
        deadline: getDateOffset(40),
        description: "Submit proposals for leading discussions on central bank digital currencies (CBDCs) and institutional liquidity.",
        link: "https://fintechfrontiers.net/keynotes-cfp"
      },
      abstract: {
        title: "Product Case Studies",
        deadline: getDateOffset(60),
        description: "15-minute quick talks about fintech integration case studies, fraud prevention, or merchant onboarding success.",
        link: "https://fintechfrontiers.net/case-studies-sub"
      },
      paper: {
        title: "Financial Tech Research Journal",
        deadline: getDateOffset(30),
        description: "Submission of analytical papers reviewing zero-knowledge proofs and smart-contract verification architectures.",
        link: "https://fintechfrontiers.net/journal-cfp"
      }
    },
    organizers: [
      { name: "Robert Chen", role: "Committee Chairman", email: "r.chen@fintechfrontiers.net", linkedin: "https://linkedin.com/in/robert-chen-fintech" },
      { name: "Sarah Jenkins", role: "Exhibitor Coordinator", email: "exhibits@fintechfrontiers.net", linkedin: "https://linkedin.com/in/sarahj-ffe" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 35000, inclusions: ["Moderator seat on one of the main panels", "10x20 Booth in the main Fintech corridor", "Logo on the mobile app splash screen", "8 full-access tickets"] },
      { tier: "Gold", cost: 20000, inclusions: ["10x10 standard booth space", "Session sponsor logo placement for a selected breakout room", "4 full-access tickets"] },
      { tier: "Silver", cost: 10000, inclusions: ["6ft skirted table display in high-traffic foyer", "Logo on website under silver sponsors", "2 full-access tickets"] },
      { tier: "Bronze", cost: 3500, inclusions: ["Logo placement on website", "1 full-access ticket", "Brochure drop inside attendee swag bag"] }
    ]
  },
  {
    id: 3,
    name: "SaaScon Europe 2026",
    logoText: "SCN",
    date: getDateOffset(150), // ~ December 7, 2026
    location: "Amsterdam, Netherlands & Virtual",
    website: "https://saasconeurope.org",
    verticals: ["saas", "ai-ml"],
    description: "Gathering 3,000+ SaaS founders, product directors, and VCs. Spotlighting PLG, customer churn metrics, international localization, and pricing models.",
    opportunities: {
      keynote: {
        title: "Scale Keynote Proposals",
        deadline: getDateOffset(75),
        description: "Mainstage keynotes dedicated to growth milestones ($10M to $100M ARR journeys). Founders preferred.",
        link: "https://saasconeurope.org/cfp-keynote"
      },
      abstract: {
        title: "Product & Growth Abstracts",
        deadline: getDateOffset(90),
        description: "Submit tactical sessions on onboarding optimization, SEO scaling, and engineering workflows.",
        link: "https://saasconeurope.org/abstract-sub"
      },
      paper: {
        title: "Whitepapers on SaaS Architecture",
        deadline: getDateOffset(80),
        description: "Technical case studies illustrating containerization, multi-tenant databases, or high-performance APIs.",
        link: "https://saasconeurope.org/papers"
      }
    },
    organizers: [
      { name: "Dirk van Dijk", role: "Event Director", email: "dirk@saasconeurope.org", linkedin: "https://linkedin.com/in/dirk-van-dijk-saas" },
      { name: "Emma Larsson", role: "Speaker Coordinator", email: "speakers@saasconeurope.org", linkedin: "https://linkedin.com/in/emma-larsson-scn" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 50000, inclusions: ["Solo Keynote session (30 mins)", "Large 20x20 Booth in central hallway", "Headline logo branding on all stage screens", "12 full-access passes"] },
      { tier: "Gold", cost: 30000, inclusions: ["Track sponsorship & opening remarks slot (10 mins)", "10x10 premium booth", "6 full-access tickets"] },
      { tier: "Silver", cost: 15000, inclusions: ["10x10 standard booth space", "Logo on event site & banners", "3 full-access tickets"] },
      { tier: "Bronze", cost: 6000, inclusions: ["Shared booth table (startup row)", "Logo on website", "2 full-access tickets"] }
    ]
  },
  {
    id: 4,
    name: "MedTech Innovations Summit",
    logoText: "MTI",
    date: getDateOffset(200), // ~ January 26, 2027
    location: "Boston, MA",
    website: "https://medtechinnovationssummit.com",
    verticals: ["healthcare"],
    description: "Bringing together physicians, research scientists, FDA policy experts, and medical hardware developers to discuss surgical robotics, sensor networks, and cloud diagnostics.",
    opportunities: {
      keynote: {
        title: "Medical Keynote Presentations",
        deadline: getDateOffset(120),
        description: "Submit proposals detailing breakthrough clinical trials or robotics platforms approved by medical bodies.",
        link: "https://medtechinnovationssummit.com/cfp/clinical-keynotes"
      },
      abstract: {
        title: "Clinical Abstracts Call",
        deadline: getDateOffset(140),
        description: "Brief write-ups on sensor accuracy, wearable diagnostics, and clinical trial datasets.",
        link: "https://medtechinnovationssummit.com/cfp/abstracts"
      },
      paper: {
        title: "Medical Hardware & Sensors",
        deadline: getDateOffset(110),
        description: "Academic submissions focusing on FDA regulatory pathways, safety protocols, and embedded software systems in implants.",
        link: "https://medtechinnovationssummit.com/cfp/papers"
      }
    },
    organizers: [
      { name: "Dr. Aris Thorne", role: "Program Director", email: "a.thorne@medtechinnovationssummit.com", linkedin: "https://linkedin.com/in/aris-thorne-mti" },
      { name: "Diana Prince", role: "Sponsorship Manager", email: "sponsorship@medtechinnovationssummit.com", linkedin: "https://linkedin.com/in/dianaprince-mti" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 40000, inclusions: ["Special track presenting sponsorship (20 mins)", "20x20 central island booth in main exhibit hall", "4 workshop passes & 8 general tickets", "Featured banner on clinical app"] },
      { tier: "Gold", cost: 22000, inclusions: ["Breakout session panel speaker slot", "10x10 standard booth space", "4 general tickets", "Logo printed on conference bag lanyards"] },
      { tier: "Silver", cost: 11000, inclusions: ["10x10 standard booth space", "Logo listed in conference program & website", "2 general tickets"] },
      { tier: "Bronze", cost: 4500, inclusions: ["Shared table display (startup corridor)", "Logo listed on website page", "1 general ticket"] }
    ]
  },
  {
    id: 5,
    name: "Clean Energy Expo 2027",
    logoText: "CEE",
    date: getDateOffset(220), // ~ Feb 15, 2027
    location: "Denver, CO",
    website: "https://cleanenergyexpo.org",
    verticals: ["cleantech"],
    description: "Focusing on grids, smart utility infrastructure, grid-edge storage, hydrogen batteries, wind farm software, and environmental tracking portals.",
    opportunities: {
      keynote: {
        title: "Grid Decarbonization Keynotes",
        deadline: getDateOffset(130),
        description: "Submit keynote entries focusing on green energy policy, electric grid integration, or long-duration battery software.",
        link: "https://cleanenergyexpo.org/decarbon-cfp"
      },
      abstract: {
        title: "Renewable Software Abstracts",
        deadline: getDateOffset(150),
        description: "Short presentations covering virtual power plants, microgrid management, or solar panel degradation analytics.",
        link: "https://cleanenergyexpo.org/abstracts"
      },
      paper: {
        title: "Materials Science & Storage",
        deadline: getDateOffset(120),
        description: "Academic reports reviewing battery chemistry, storage lifespans, and high-efficiency wind turbine aerodynamics.",
        link: "https://cleanenergyexpo.org/research-papers"
      }
    },
    organizers: [
      { name: "Alan Mercer", role: "Expo Coordinator", email: "mercer@cleanenergyexpo.org", linkedin: "https://linkedin.com/in/alanmercer-cee" },
      { name: "Chloe Young", role: "Host Liaison", email: "chloe.y@cleanenergyexpo.org", linkedin: "https://linkedin.com/in/chloeyoung-expo" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 30000, inclusions: ["Headline logo placement at entry archway", "Premium 10x20 central booth space", "Opening session moderator seat", "6 full-access passes"] },
      { tier: "Gold", cost: 18000, inclusions: ["10x10 standard booth space", "Logo on official badges & registration desks", "3 full-access passes"] },
      { tier: "Silver", cost: 9000, inclusions: ["6ft table display in registration corridor", "Logo on website and in emails", "2 full-access passes"] },
      { tier: "Bronze", cost: 3000, inclusions: ["Logo listed on website page", "1 full-access pass", "Shared table space in startup hall"] }
    ]
  },
  {
    id: 6,
    name: "Retail & Consumer Tech Summit",
    logoText: "RCS",
    date: getDateOffset(280), // ~ April 16, 2027
    location: "Chicago, IL",
    website: "https://retailconsumersummit.com",
    verticals: ["consumer-tech", "saas"],
    description: "The largest midwest retail logistics and storefront technology showcase, featuring online carts, fulfillment robotics, custom checkout, and direct-to-consumer software.",
    opportunities: {
      keynote: {
        title: "Omnichannel Keynote Proposals",
        deadline: getDateOffset(200),
        description: "Looking for CEOs and retail brand founders to deliver 30-minute mainstage talks on global shopping and supply-chain logistics.",
        link: "https://retailconsumersummit.com/cfp/keynotes"
      },
      abstract: {
        title: "Logistics Case Studies",
        deadline: getDateOffset(220),
        description: "Case studies detailing warehouse sorting, last-mile delivery, custom integrations, and CRM metrics.",
        link: "https://retailconsumersummit.com/case-studies"
      },
      paper: {
        title: "Privacy & Analytics Reports",
        deadline: getDateOffset(190),
        description: "Reports examining cookie-less marketing, user targeting models under privacy acts, and customer churn analytics.",
        link: "https://retailconsumersummit.com/research"
      }
    },
    organizers: [
      { name: "Jessica Kohl", role: "Program Director", email: "j.kohl@retailconsumersummit.com", linkedin: "https://linkedin.com/in/jessicakohl-rcs" },
      { name: "Arden Finch", role: "Sponsor Representative", email: "sponsors@retailconsumersummit.com", linkedin: "https://linkedin.com/in/ardenfinch-summit" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 25000, inclusions: ["Panel opening slot on the Ecommerce track", "Premium 10x20 central corridor booth", "Header logo branding on the event app", "6 full-access passes"] },
      { tier: "Gold", cost: 15000, inclusions: ["10x10 standard booth space", "Logo on the official water bottles distributed to attendees", "4 full-access passes"] },
      { tier: "Silver", cost: 7500, inclusions: ["6ft table display in registration corridor", "Logo on website and in emails", "2 full-access passes"] },
      { tier: "Bronze", cost: 2500, inclusions: ["Logo listed on website page", "1 full-access pass", "Flier included in entry package"] }
    ]
  },
  {
    id: 7,
    name: "CES 2027 (Consumer Electronics Show)",
    logoText: "CES",
    date: getDateOffset(180), // ~ Jan 6, 2027
    location: "Las Vegas, NV",
    website: "https://ces.tech",
    verticals: ["consumer-tech"],
    description: "The most influential tech event in the world — the proving ground for breakthrough technologies and global innovators.",
    opportunities: {
      keynote: {
        title: "CES Global Keynotes",
        deadline: getDateOffset(100),
        description: "Looking for multinational executives and top-tier consumer brand innovators to discuss electronics evolution.",
        link: "https://ces.tech/cfp/keynotes"
      },
      abstract: {
        title: "Innovations Showcase Panels",
        deadline: getDateOffset(120),
        description: "Showcase smart home, health wearables, and smart mobility solutions on panels.",
        link: "https://ces.tech/showcase"
      },
      paper: {
        title: "Next-Gen Hardware Electronics",
        deadline: getDateOffset(90),
        description: "Proposals on screen display science, microchip architectures, and custom consumer battery safety.",
        link: "https://ces.tech/papers"
      }
    },
    organizers: [
      { name: "Gary Shapiro", role: "President & CEO", email: "gshapiro@ces.tech", linkedin: "https://linkedin.com/in/garyshapiro-ces" },
      { name: "Sponsorship Team", role: "Exhibitor Relations", email: "exhibits@ces.tech", linkedin: "https://linkedin.com/in/ces-exhibitor-relations" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 120000, inclusions: ["Dedicated pavilion space in central hall", "Logo featured on all physical lanyards", "Mainstage panel speaking slot", "20 VIP full-access passes"] },
      { tier: "Gold", cost: 75000, inclusions: ["10x20 Premium booth in tech zone", "Branding in CES daily print newsletter", "10 full-access tickets"] },
      { tier: "Silver", cost: 35000, inclusions: ["10x10 standard booth space", "Logo listed in mobile app directories", "5 full-access tickets"] },
      { tier: "Bronze", cost: 15000, inclusions: ["Pull-up banner space in Venetian lobby", "Logo on official website page", "2 full-access tickets"] }
    ]
  },
  {
    id: 8,
    name: "HIMSS 2027 Global Health Conference",
    logoText: "HMS",
    date: getDateOffset(248), // ~ March 15, 2027
    location: "Orlando, FL",
    website: "https://himssconference.org",
    verticals: ["healthcare"],
    description: "The leading global conference dedicated to clinical informatics, EHR integration, hospital database security, and digital telehealth innovations.",
    opportunities: {
      keynote: {
        title: "Clinical Informatics Keynote",
        deadline: getDateOffset(180),
        description: "Submit entries for clinical workflows, medical database governance, and modern AI diagnostic implementations.",
        link: "https://himssconference.org/keynotes"
      },
      abstract: {
        title: "Digital Health Tech Abstracts",
        deadline: getDateOffset(190),
        description: "Talk proposals on remote patient monitoring, hospital cloud structures, and cybersecurity safeguards.",
        link: "https://himssconference.org/abstracts"
      },
      paper: {
        title: "EHR Interoperability Research",
        deadline: getDateOffset(170),
        description: "Scientific track analyzing HL7 standards, clinical data routing, and data privacy in multi-hospital systems.",
        link: "https://himssconference.org/research"
      }
    },
    organizers: [
      { name: "Hal Wolf", role: "CEO & President", email: "hwolf@himss.org", linkedin: "https://linkedin.com/in/hal-wolf-himss" },
      { name: "Clara Davis", role: "Speaker Relations Coordinator", email: "speakers@himss.org", linkedin: "https://linkedin.com/in/claradavis-himss" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 65000, inclusions: ["Session host branding on top clinical track", "20x20 Booth space in primary health corridor", "12 VIP full-access passes"] },
      { tier: "Gold", cost: 35000, inclusions: ["10x10 standard booth space", "Featured spotlight email to pre-registered attendees", "6 full-access passes"] },
      { tier: "Silver", cost: 18000, inclusions: ["10x10 standard booth space", "Logo on conference mobile app", "3 full-access tickets"] },
      { tier: "Bronze", cost: 8000, inclusions: ["Logo on website and digital brochure", "2 full-access tickets", "Shared table display in startup showcase"] }
    ]
  },
  {
    id: 9,
    name: "World Congress on Mental Health 2027",
    logoText: "WMH",
    date: getDateOffset(274), // ~ April 10, 2027
    location: "Chicago, IL",
    website: "https://worldmentalhealthcongress.org",
    verticals: ["healthcare"],
    description: "Bringing together therapists, research psychiatrists, clinic directors, and digital therapeutic developers to discuss psychiatric software and mental health access.",
    opportunities: {
      keynote: {
        title: "Global Mental Health Keynotes",
        deadline: getDateOffset(200),
        description: "Keynotes covering public sector access, psychiatric therapy software, and clinical therapy scaling models.",
        link: "https://worldmentalhealthcongress.org/cfp/keynote"
      },
      abstract: {
        title: "Therapeutic Apps & Tech Abstracts",
        deadline: getDateOffset(210),
        description: "Submit case studies showing patient engagement in mental health mobile apps or digital clinics.",
        link: "https://worldmentalhealthcongress.org/cfp/abstracts"
      },
      paper: {
        title: "Clinical Psychology Tech Journal",
        deadline: getDateOffset(180),
        description: "Research papers detailing security in telemedicine, clinical effectiveness of app treatments, and CBT automation.",
        link: "https://worldmentalhealthcongress.org/cfp/papers"
      }
    },
    organizers: [
      { name: "Dr. Linda Reynolds", role: "Committee Chair", email: "l.reynolds@worldmentalhealthcongress.org", linkedin: "https://linkedin.com/in/lindareynolds-wmh" },
      { name: "Arthur Dent", role: "Speaker Coordinator", email: "speakers@worldmentalhealthcongress.org", linkedin: "https://linkedin.com/in/arthurdent-wmh" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 20000, inclusions: ["Mainstage panel seat", "10x10 booth space in high-traffic foyer", "Logo printed on attendee check-in badges", "5 full-access passes"] },
      { tier: "Gold", cost: 12000, inclusions: ["Breakout session speaker slot (15 mins)", "Standard table display", "3 full-access tickets"] },
      { tier: "Silver", cost: 6000, inclusions: ["Standard table display", "Logo on official event site", "2 full-access tickets"] },
      { tier: "Bronze", cost: 2500, inclusions: ["Logo on official website footer", "1 full-access ticket"] }
    ]
  },
  {
    id: 10,
    name: "FinovateSpring 2027",
    logoText: "FIN",
    date: getDateOffset(306), // ~ May 12, 2027
    location: "San Francisco, CA",
    website: "https://finovatespring.com",
    verticals: ["finance"],
    description: "The leading fintech platform showcasing 50+ live demo sessions on banking tech, financial software, security protocols, and trading tools.",
    opportunities: {
      keynote: {
        title: "Live Demo Presenters",
        deadline: getDateOffset(240),
        description: "Pitch to run a 7-minute live demo on stage showing off working fintech software. No slides allowed.",
        link: "https://finovatespring.com/cfp/demos"
      },
      abstract: {
        title: "Fintech Leader Quick-Talks",
        deadline: getDateOffset(250),
        description: "Submit 10-minute talks regarding neo-banking strategies, credit algorithms, and instant transaction processing.",
        link: "https://finovatespring.com/abstracts"
      },
      paper: {
        title: "Institutional Banking Reports",
        deadline: getDateOffset(220),
        description: "Analytics reports reviewing cloud migrations of bank ledgers, financial APIs, and card transaction routing.",
        link: "https://finovatespring.com/research"
      }
    },
    organizers: [
      { name: "Greg Palmer", role: "VP & Host", email: "g.palmer@finovate.com", linkedin: "https://linkedin.com/in/gregpalmer-finovate" },
      { name: "Alex Harrison", role: "Lead Organizer", email: "alex@finovate.com", linkedin: "https://linkedin.com/in/alexharrison-finovate" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 45000, inclusions: ["Dedicated 7-minute mainstage demo slot guaranteed", "Double-size exhibit booth in central demo hall", "10 full-access passes"] },
      { tier: "Gold", cost: 28000, inclusions: ["Track speaking slot on digital banking breakout", "Standard exhibit booth", "5 full-access tickets"] },
      { tier: "Silver", cost: 15000, inclusions: ["Standard exhibit booth", "Logo listed in conference app & website", "3 full-access tickets"] },
      { tier: "Bronze", cost: 7000, inclusions: ["Shared display stand in demo foyer", "Logo listed on website page", "2 full-access tickets"] }
    ]
  },
  {
    id: 11,
    name: "Defense Tech & Security Expo 2026",
    logoText: "DTS",
    date: getDateOffset(100), // ~ Oct 18, 2026
    location: "Washington, D.C.",
    website: "https://defensetechexpo.mil",
    verticals: ["military-industrial"],
    description: "Bringing together military leaders, aerospace engineers, cyber defense officers, and hardware manufacturers to review secure communications and autonomous defense.",
    opportunities: {
      keynote: {
        title: "Strategic Avionics Keynotes",
        deadline: getDateOffset(50),
        description: "Submit proposals for sessions on satellite encryption, UAV flight software, and secure telemetry systems.",
        link: "https://defensetechexpo.mil/cfp/keynote"
      },
      abstract: {
        title: "Cyber Defense Abstracts",
        deadline: getDateOffset(60),
        description: "Submit papers on network security, zero-trust architectures for communication nodes, and edge sensor grids.",
        link: "https://defensetechexpo.mil/cfp/abstracts"
      },
      paper: {
        title: "Military Robotics and Automation",
        deadline: getDateOffset(40),
        description: "Academic tract presenting autonomous navigation safety, battery stability in flight grids, and materials science.",
        link: "https://defensetechexpo.mil/cfp/papers"
      }
    },
    organizers: [
      { name: "Col. Thomas Miller", role: "General Coordinator", email: "thomas.miller@defensetechexpo.mil", linkedin: "https://linkedin.com/in/thomasmiller-dts" },
      { name: "John R. Vance", role: "Exhibitor Liaison", email: "exhibits@defensetechexpo.mil", linkedin: "https://linkedin.com/in/johnvance-dts" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 80000, inclusions: ["Keynote slot during defense software morning track", "Premium 20x20 center booth in defense hall", "10 VIP full-access passes"] },
      { tier: "Gold", cost: 45000, inclusions: ["Standard 10x10 booth space", "Branded logo on registration security checkpoints", "5 full-access passes"] },
      { tier: "Silver", cost: 25000, inclusions: ["Standard 10x10 booth space", "Logo on all sessions intro slides & banners", "3 full-access tickets"] },
      { tier: "Bronze", cost: 10000, inclusions: ["Shared display panel in aerospace zone", "Logo on official website page", "1 full-access ticket"] }
    ]
  },
  {
    id: 12,
    name: "Industrial IoT & Automation World 2026",
    logoText: "IIW",
    date: getDateOffset(125), // ~ Nov 12, 2026
    location: "Chicago, IL",
    website: "https://iotworldchicago.com",
    verticals: ["military-industrial"],
    description: "Focusing on smart factory automation, predictive maintenance, edge analytics, warehouse robotics, and industrial network security.",
    opportunities: {
      keynote: {
        title: "Factory Automation Keynote",
        deadline: getDateOffset(70),
        description: "Mainstage keynotes reviewing predictive maintenance grids, robotic assembly pipelines, and smart sensors.",
        link: "https://iotworldchicago.com/cfp/keynote"
      },
      abstract: {
        title: "Edge Computing Case Studies",
        deadline: getDateOffset(85),
        description: "Submit case studies illustrating PLC integration, remote device monitoring, and high-frequency sensor streams.",
        link: "https://iotworldchicago.com/cfp/abstracts"
      },
      paper: {
        title: "Industrial Protocols & Safety",
        deadline: getDateOffset(55),
        description: "Reports reviewing Modbus security, industrial Wi-Fi grids, and automated robot safety systems.",
        link: "https://iotworldchicago.com/cfp/papers"
      }
    },
    organizers: [
      { name: "Steve Jenkins", role: "Expo Director", email: "steve@iotworldchicago.com", linkedin: "https://linkedin.com/in/stevejenkins-iiw" },
      { name: "Anna Novak", role: "Sponsorship Relations", email: "sponsors@iotworldchicago.com", linkedin: "https://linkedin.com/in/annanovak-iiw" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 35000, inclusions: ["Moderator seat on smart factory track panel", "10x20 premium booth in automation hall", "8 full-access tickets"] },
      { tier: "Gold", cost: 20000, inclusions: ["Standard 10x10 booth space", "Logo on badges & entrance signage", "4 full-access tickets"] },
      { tier: "Silver", cost: 10000, inclusions: ["Standard 6ft table display in lobby", "Logo on website and in promotional emails", "2 full-access tickets"] },
      { tier: "Bronze", cost: 4000, inclusions: ["Logo on website under bronze partners", "1 full-access ticket", "Brochure insert inside visitor bags"] }
    ]
  },
  {
    id: 13,
    name: "Money20/20 USA 2026",
    logoText: "M20",
    date: getDateOffset(107), // ~ Oct 25, 2026
    location: "Las Vegas, NV",
    website: "https://us.money2020.com",
    verticals: ["finance"],
    description: "The absolute global heart of financial services and money tech — where bank systems, fintech startups, and payment infrastructure meet.",
    opportunities: {
      keynote: {
        title: "Money20/20 Vision Keynote",
        deadline: getDateOffset(50),
        description: "Proposals for mainstage presentations on global payment infrastructure, regulatory compliance, and consumer finance trends.",
        link: "https://us.money2020.com/cfp/keynote"
      },
      abstract: {
        title: "Breakout Panels: Digital Banking",
        deadline: getDateOffset(70),
        description: "Submit panel proposals on modern credit algorithms, instant micro-payments, and bank security structures.",
        link: "https://us.money2020.com/cfp/panels"
      },
      paper: {
        title: "Future Payments & Ledger Systems",
        deadline: getDateOffset(40),
        description: "Reports examining merchant transaction fees, zero-knowledge proofs for banking records, and smart-contracts.",
        link: "https://us.money2020.com/cfp/research"
      }
    },
    organizers: [
      { name: "Tracey Davies", role: "President", email: "tdavies@money2020.com", linkedin: "https://linkedin.com/in/traceydavies-m20" },
      { name: "Sarah Harris", role: "Sponsorship Director", email: "sponsorship@money2020.com", linkedin: "https://linkedin.com/in/sponsorship-m20" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 110000, inclusions: ["Exclusive track branding & speakership panel seat", "Large 20x20 custom pavilion display in core hall", "15 VIP full-access passes"] },
      { tier: "Gold", cost: 65000, inclusions: ["Standard 10x20 booth in card networks corridor", "Prominent logo on main conference badge lanyard", "8 full-access passes"] },
      { tier: "Silver", cost: 35000, inclusions: ["Standard 10x10 booth space", "Logo on conference mobile app and website footer", "4 full-access passes"] },
      { tier: "Bronze", cost: 15000, inclusions: ["Logo in official handbook & entrance banner", "2 full-access passes"] }
    ]
  },
  {
    id: 14,
    name: "Shoptalk 2027",
    logoText: "STK",
    date: getDateOffset(254), // ~ March 21, 2027
    location: "Las Vegas, NV",
    website: "https://shoptalk.com",
    verticals: ["consumer-tech"],
    description: "The global hub for retail technology and direct-to-consumer software, outlining store analytics, smart pricing, and delivery logistics.",
    opportunities: {
      keynote: {
        title: "Retail Tech Keynotes",
        deadline: getDateOffset(180),
        description: "Proposals for 30-minute mainstage presentations on consumer shopping trends, smart supply chains, and retail software ecosystems.",
        link: "https://shoptalk.com/cfp/keynote"
      },
      abstract: {
        title: "DTC Branding Panels",
        deadline: getDateOffset(200),
        description: "Submit panel proposals detailing mobile shopping conversion, customer return loops, and logistics systems.",
        link: "https://shoptalk.com/cfp/abstracts"
      },
      paper: {
        title: "Logistics Analytics Reports",
        deadline: getDateOffset(170),
        description: "Academic reports reviewing sorting robot algorithms, local delivery dispatch grids, and inventory data models.",
        link: "https://shoptalk.com/cfp/research"
      }
    },
    organizers: [
      { name: "Jonathan Wilcox", role: "Event Director", email: "j.wilcox@shoptalk.com", linkedin: "https://linkedin.com/in/jonathanwilcox-shoptalk" },
      { name: "Rebecca Stone", role: "Speaker Coordinator", email: "speakers@shoptalk.com", linkedin: "https://linkedin.com/in/rebeccastone-shoptalk" }
    ],
    sponsorships: [
      { tier: "Platinum", cost: 75000, inclusions: ["Mainstage panel seat & track sponsorship", "Premium 20x20 island display in tech hall", "10 VIP full-access passes"] },
      { tier: "Gold", cost: 45000, inclusions: ["10x10 premium display space", "Branded logo on registration checks", "5 full-access tickets"] },
      { tier: "Silver", cost: 22000, inclusions: ["Standard table stand in foyer", "Logo in mobile directory", "3 full-access tickets"] },
      { tier: "Bronze", cost: 9000, inclusions: ["Logo on website footer page", "1 full-access ticket", "Startup shared stand zone"] }
    ]
  }
];

const mockAIBenefits = {
  "ai-ml": {
    "gts": {
      pitch: "Participating in GTS 2026 puts your AI/ML business directly in front of 5,000+ developer executives and CTOs. Given your target vertical, showcasing deep learning frameworks or MLOps pipelines here establishes immediate technical authority. Your keynote or panel talks will build trust, shortening enterprise sales cycles from 9 months to 4 months.",
      metrics: [
        { label: "Developer Reach", value: "3,500+ Engineers" },
        { label: "Avg. Deal Size", value: "$85,000 /yr" },
        { label: "Key Benefit", value: "Technical Authority & Talent Acquisition" }
      ]
    },
    "saascon": {
      pitch: "SaaScon Europe is ideal for B2B AI products looking to integrate with SaaS platforms. Your team can pitch API-first solutions to founders and growth leads seeking generative wrappers or smart automations. Participating highlights compatibility with modern tech stacks and opens strategic integration partnerships.",
      metrics: [
        { label: "Founder Density", value: "850+ SaaS CEOs" },
        { label: "Partnership Opps", value: "High (Integration Ecosystems)" },
        { label: "Key Benefit", value: "B2B Distribution Channels" }
      ]
    }
  },
  "saas": {
    "gts": {
      pitch: "As a SaaS business, presenting at GTS 2026 allows you to establish developer trust. Highlighting how your database or dashboard scales can attract engineering teams looking to purchase infrastructure. Mainstage speakers report a 25% surge in high-intent inbound sign-ups during the conference week.",
      metrics: [
        { label: "Target Audience", value: "CTOs & VP Eng" },
        { label: "Conversion Lift", value: "25% Inbound Boost" },
        { label: "Key Benefit", value: "High-intent developer sign-ups" }
      ]
    },
    "saascon": {
      pitch: "This is your home turf. SaaScon Europe brings together the largest collection of European SaaS founders and product leads. Perfect for showing off PLG tools, customer success software, and localization engines. Sponsors gain direct access to series A/B companies looking to upgrade their growth stacks.",
      metrics: [
        { label: "Target Buyer", value: "Product Leads & CFOs" },
        { label: "Sponsor ROI", value: "3.4x avg marketing spend" },
        { label: "Key Benefit", value: "Product-Led Growth Exposure" }
      ]
    }
  },
  "finance": {
    "ffe": {
      pitch: "FinTech Frontiers Expo is the premier sandbox to demonstrate payment security, ledger systems, or billing APIs. The audience consists of enterprise bank executives, payment networks, and compliance officers. Presenting on panels puts you in the center of regulatory and technological discussions.",
      metrics: [
        { label: "Bank Executives", value: "450+ Attendees" },
        { label: "Lead Quality", value: "Enterprise (B2B Buy-in)" },
        { label: "Key Benefit", value: "Regulatory Compliance Credibility" }
      ]
    },
    "us.money2020": {
      pitch: "Money20/20 USA is the premier meeting ground for financial networks and banking ecosystems. Demonstrating solutions here puts you in front of enterprise decision-makers who manage billions in capital. An excellent match for fast-tracking payment integrations or closing enterprise institutional banking deals.",
      metrics: [
        { label: "Bank Executives", value: "1,500+ Attendees" },
        { label: "Deal Sizes", value: "Enterprise-grade" },
        { label: "Key Benefit", value: "Global Payment Network Onboarding" }
      ]
    }
  },
  "healthcare": {
    "mti": {
      pitch: "MedTech Innovations Summit is essential for hardware and digital diagnostics companies. Speaking here lets you present clinical trial results or sensor data to institutional buyers, medical providers, and VC partners. It helps build clinical trust, which is the primary driver for hospital sales.",
      metrics: [
        { label: "Clinical Contacts", value: "600+ Doctors/Scientists" },
        { label: "Investor Capital", value: "$4.5B collectively managed" },
        { label: "Key Benefit", value: "Scientific Peer Approval & VC Matching" }
      ]
    },
    "himssconference": {
      pitch: "HIMSS is the gold standard for clinical informatics. Speaking on EHR interoperability or database security puts you in front of hospital CIOs and healthcare network buyers. A massive opportunity to drive enterprise health tech sales and secure clinical compliance buy-in.",
      metrics: [
        { label: "Hospital CIOs", value: "500+ CIOs" },
        { label: "Market Size", value: "Global Health Systems" },
        { label: "Key Benefit", value: "Enterprise EHR Integrations" }
      ]
    }
  },
  "cleantech": {
    "cee": {
      pitch: "Speaking at Clean Energy Expo establishes your tech as a leader in decarbonization. The audience is comprised of grid operators, corporate sustainability officers, and state regulators. Explaining grid technology or battery safety leads to contracts with municipal grids and green developers.",
      metrics: [
        { label: "Grid Operators", value: "180+ Agencies" },
        { label: "Gov. Grant Officers", value: "50+ Representatives" },
        { label: "Key Benefit", value: "Public/Private Partnership Contracts" }
      ]
    }
  },
  "consumer-tech": {
    "ces": {
      pitch: "CES is the largest electronics and tech showcase globally. Presenting your consumer products or smart technologies here gives you massive international media coverage and direct meetings with global distributors, retailers, and strategic partners.",
      metrics: [
        { label: "Media Reach", value: "150,000+ Attendees" },
        { label: "Retail Buyers", value: "12,000+ Outlets" },
        { label: "Key Benefit", value: "Global Brand Recognition & Distribution" }
      ]
    }
  }
};

// Expose to global window scope for non-ESM compatibility
window.EventSharkData = {
  businessVerticals,
  seedEvents,
  mockAIBenefits
};
