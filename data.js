/**
 * Event Shark - Seed Database
 * Contains rich mock data for key industry events spanning Tech, SaaS, Finance, Biotech, E-commerce.
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
    id: "fintech",
    name: "FinTech & Blockchain",
    description: "Payment processors, digital banking apps, decentralised finance, cybersecurity, and financial management tools."
  },
  {
    id: "biotech-health",
    name: "HealthTech & BioTech",
    description: "Medical devices, digital health portals, pharmaceutical research tools, healthcare logistics, and telemedicine."
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    description: "Online storefront solutions, logistics, direct-to-consumer goods, payment channels, and marketing tech."
  },
  {
    id: "cleantech",
    name: "CleanTech & Sustainability",
    description: "Renewable energy software, battery technologies, smart grid integrations, carbon tracking platforms, and sustainable hardware."
  }
];

const seedEvents = [
  {
    id: 1,
    name: "Global Tech Summit 2026",
    logoText: "GTS",
    date: getDateOffset(45), // ~ August 24, 2026 (45 days out - within 30-day to 1-year window)
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
      {
        tier: "Platinum",
        cost: 45000,
        inclusions: [
          "15-minute speaking slot on the Main Stage",
          "Premium 20x20 central island booth in Expo Hall",
          "Full attendee list with lead contact info (GDPR-compliant)",
          "10 VIP full-access passes & 20 expo-only passes",
          "Dedicated email blast sent to all 5,000+ pre-registered attendees",
          "Prominent logo on main conference badge lanyard"
        ]
      },
      {
        tier: "Gold",
        cost: 25000,
        inclusions: [
          "Panel speakership slot on standard track",
          "Standard 10x10 booth space",
          "Logo displayed on session intro slides & website footer",
          "5 full-access tickets",
          "Feature in GTS mobile app sponsor directory"
        ]
      },
      {
        tier: "Silver",
        cost: 12000,
        inclusions: [
          "Basic 10x10 booth space (rear corridor)",
          "Logo listed on website & badge backing",
          "2 full-access tickets",
          "Includes basic lead scanner device rental"
        ]
      },
      {
        tier: "Bronze",
        cost: 5000,
        inclusions: [
          "No booth included. Pull-up banner in registration lobby",
          "Logo printed in official digital handbook",
          "1 general attendee ticket",
          "Shared table in the startup showcase zone"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "FinTech Frontiers Expo",
    logoText: "FFE",
    date: getDateOffset(90), // ~ October 8, 2026 (~90 days out)
    location: "New York City, NY",
    website: "https://fintechfrontiers.net",
    verticals: ["fintech", "saas"],
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
      {
        tier: "Platinum",
        cost: 35000,
        inclusions: [
          "Moderator seat on one of the main panels",
          "10x20 Booth in the main Fintech corridor",
          "Logo on the mobile app splash screen & physical banners",
          "8 full-access tickets",
          "Double-page advertisement in the FinTech Frontiers magazine"
        ]
      },
      {
        tier: "Gold",
        cost: 20000,
        inclusions: [
          "10x10 standard booth space",
          "Session sponsor logo placement for a selected breakout room",
          "4 full-access tickets",
          "Custom pushes on mobile app during breaks"
        ]
      },
      {
        tier: "Silver",
        cost: 10000,
        inclusions: [
          "6ft skirted table display in high-traffic foyer",
          "Logo on website under silver sponsors",
          "2 full-access tickets"
        ]
      },
      {
        tier: "Bronze",
        cost: 3500,
        inclusions: [
          "Logo placement on website",
          "1 full-access ticket",
          "Brochure drop inside attendee swag bag"
        ]
      }
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
      {
        tier: "Platinum",
        cost: 50000,
        inclusions: [
          "Solo Keynote session (30 mins)",
          "Large 20x20 Booth in central hallway",
          "Headline logo branding on all stage screens",
          "12 full-access passes & VIP Speaker Lounge access",
          "1 full list of lead scan details",
          "Dedicated video spot in the online stream transitions"
        ]
      },
      {
        tier: "Gold",
        cost: 30000,
        inclusions: [
          "Track sponsorship & opening remarks slot (10 mins)",
          "10x10 premium booth",
          "6 full-access tickets",
          "Logo on official event bags"
        ]
      },
      {
        tier: "Silver",
        cost: 15000,
        inclusions: [
          "10x10 standard booth space",
          "Logo on event site & banners",
          "3 full-access tickets"
        ]
      },
      {
        tier: "Bronze",
        cost: 6000,
        inclusions: [
          "Shared booth table (startup row)",
          "Logo on website",
          "2 full-access tickets"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "MedTech Innovations Summit",
    logoText: "MTI",
    date: getDateOffset(200), // ~ January 26, 2027 (~200 days out)
    location: "Boston, MA",
    website: "https://medtechinnovationssummit.com",
    verticals: ["biotech-health"],
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
        title: "Journal of Medical Hardware",
        deadline: getDateOffset(100),
        description: "Academic papers covering biological material compatibility, telemetry security, and automated drug delivery algorithms.",
        link: "https://medtechinnovationssummit.com/cfp/journals"
      }
    },
    organizers: [
      { name: "Dr. Alice Vance", role: "Scientific Board Chair", email: "a.vance@medtechinnovationssummit.com", linkedin: "https://linkedin.com/in/alicevance-medtech" },
      { name: "Gregory Helms", role: "Sponsorship Manager", email: "g.helms@medtechinnovationssummit.com", linkedin: "https://linkedin.com/in/greghelms-mti" }
    ],
    sponsorships: [
      {
        tier: "Platinum",
        cost: 40000,
        inclusions: [
          "Welcome address during Opening Ceremony (5 mins)",
          "Premium 20x20 Booth space in primary exhibition hall",
          "Banner logo in main registration lobby",
          "8 full-access tickets & 4 speaker banquet passes",
          "Logo on the lanyard badges of all scientific reviewers"
        ]
      },
      {
        tier: "Gold",
        cost: 22000,
        inclusions: [
          "10x10 premium booth",
          "Sponsor badge for one lunch breakout session",
          "4 full-access tickets",
          "Ad page in official medical abstracts digest"
        ]
      },
      {
        tier: "Silver",
        cost: 11000,
        inclusions: [
          "Standard 10x10 booth space",
          "Logo on website",
          "2 full-access tickets"
        ]
      },
      {
        tier: "Bronze",
        cost: 4500,
        inclusions: [
          "Shared tabletop workspace",
          "Logo in event handbook",
          "1 full-access ticket"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Clean Energy Expo 2027",
    logoText: "CEE",
    date: getDateOffset(300), // ~ May 6, 2027 (~300 days out)
    location: "Austin, TX",
    website: "https://cleanenergyexpo.org",
    verticals: ["cleantech"],
    description: "The global stage for renewable energy grid developers, battery technologists, electric vehicle fleet managers, and policy makers mapping out carbon zero targets.",
    opportunities: {
      keynote: {
        title: "Decarbonization Panel & Keynotes",
        deadline: getDateOffset(220),
        description: "Submit keynote topics on gigawatt-scale storage, solar module efficiencies, and hydrogen fueling systems.",
        link: "https://cleanenergyexpo.org/keynote-cfp"
      },
      abstract: {
        title: "Grid Tech Case Studies",
        deadline: getDateOffset(240),
        description: "Looking for case studies regarding micro-grid deployments, municipal battery arrays, and smart building designs.",
        link: "https://cleanenergyexpo.org/grid-cfp"
      },
      paper: {
        title: "Academic Papers on Smart Materials",
        deadline: getDateOffset(180),
        description: "Publish research papers exploring advanced photovoltaic chemistry or carbon capture polymer efficiency.",
        link: "https://cleanenergyexpo.org/papers-sub"
      }
    },
    organizers: [
      { name: "Helen Diaz", role: "Committee Director", email: "h.diaz@cleanenergyexpo.org", linkedin: "https://linkedin.com/in/helendiaz-cee" },
      { name: "Tyler Brooks", role: "Corporate Relations", email: "t.brooks@cleanenergyexpo.org", linkedin: "https://linkedin.com/in/tylerbrooks-energy" }
    ],
    sponsorships: [
      {
        tier: "Platinum",
        cost: 30000,
        inclusions: [
          "Keynote track introduction slot",
          "Large 20x20 Booth in the renewable pavilion",
          "Full page ad in the digital clean energy workbook",
          "8 full-access badges",
          "Dedicated feature email highlighting your green technology"
        ]
      },
      {
        tier: "Gold",
        cost: 18000,
        inclusions: [
          "10x10 standard booth space",
          "Session sponsor logo placement for a grid tech panel",
          "4 full-access badges",
          "Logo listed on main signage"
        ]
      },
      {
        tier: "Silver",
        cost: 8000,
        inclusions: [
          "Basic tabletop setup",
          "Logo on website footer",
          "2 full-access badges"
        ]
      },
      {
        tier: "Bronze",
        cost: 3000,
        inclusions: [
          "Logo on website sponsor listing",
          "1 full-access badge",
          "Shared pamphlet stand"
        ]
      }
    ]
  },
  {
    id: 6,
    name: "eCommerce Retail Summit",
    logoText: "ERS",
    date: getDateOffset(340), // ~ June 15, 2027 (~340 days out)
    location: "Chicago, IL",
    website: "https://ecommerceretailsummit.com",
    verticals: ["ecommerce", "saas"],
    description: "Highlighting omnichannel commerce strategies, inventory logistics, headless shopping platforms, customer lifetime value optimization, and email marketing frameworks.",
    opportunities: {
      keynote: {
        title: "Fireside Chats: Scaling Brands",
        deadline: getDateOffset(280),
        description: "Submit pitches for main stage fireside sessions sharing strategies that scale stores past $50M in sales.",
        link: "https://ecommerceretailsummit.com/firesides"
      },
      abstract: {
        title: "Logistics & Growth Case Studies",
        deadline: getDateOffset(300),
        description: "Short presentations covering third-party logistics (3PL) onboarding, conversion rate optimization (CRO) tests, and multi-channel listings.",
        link: "https://ecommerceretailsummit.com/cases"
      },
      paper: {
        title: "Consumer Data and Privacy Reports",
        deadline: getDateOffset(260),
        description: "Reports examining cookie-less advertising, user targeting models under privacy acts, and AI personalization analytics.",
        link: "https://ecommerceretailsummit.com/research"
      }
    },
    organizers: [
      { name: "Jessica Kohl", role: "Program Director", email: "j.kohl@ecommerceretailsummit.com", linkedin: "https://linkedin.com/in/jessicakohl-ers" },
      { name: "Arden Finch", role: "Sponsor Representative", email: "sponsors@ecommerceretailsummit.com", linkedin: "https://linkedin.com/in/ardenfinch-summit" }
    ],
    sponsorships: [
      {
        tier: "Platinum",
        cost: 25000,
        inclusions: [
          "Panel opening slot on the Ecommerce track",
          "Premium 10x20 central corridor booth",
          "Header logo branding on the event app",
          "6 full-access passes & 10 developer passes",
          "Company profile featured in attendee onboarding survey"
        ]
      },
      {
        tier: "Gold",
        cost: 15000,
        inclusions: [
          "10x10 standard booth space",
          "Logo on the official water bottles distributed to attendees",
          "4 full-access passes",
          "Logo featured in the print agenda"
        ]
      },
      {
        tier: "Silver",
        cost: 7500,
        inclusions: [
          "6ft table display in registration corridor",
          "Logo on website and in emails",
          "2 full-access passes"
        ]
      },
      {
        tier: "Bronze",
        cost: 2500,
        inclusions: [
          "Logo listed on website page",
          "1 full-access pass",
          "Flier included in entry package"
        ]
      }
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
  "fintech": {
    "ffe": {
      pitch: "FinTech Frontiers Expo is the premier sandbox to demonstrate payment security, ledger systems, or billing APIs. The audience consists of enterprise bank executives, payment networks, and compliance officers. Presenting on panels puts you in the center of regulatory and technological discussions.",
      metrics: [
        { label: "Bank Executives", value: "450+ Attendees" },
        { label: "Lead Quality", value: "Enterprise (B2B Buy-in)" },
        { label: "Key Benefit", value: "Regulatory Compliance Credibility" }
      ]
    }
  },
  "biotech-health": {
    "mti": {
      pitch: "MedTech Innovations Summit is essential for hardware and digital diagnostics companies. Speaking here lets you present clinical trial results or sensor data to institutional buyers, medical providers, and VC partners. It helps build clinical trust, which is the primary driver for hospital sales.",
      metrics: [
        { label: "Clinical Contacts", value: "600+ Doctors/Scientists" },
        { label: "Investor Capital", value: "$4.5B collectively managed" },
        { label: "Key Benefit", value: "Scientific Peer Approval & VC Matching" }
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
  "ecommerce": {
    "ers": {
      pitch: "The eCommerce Retail Summit places your storefront software or marketing platform right before active sellers and brand managers. If your service improves conversion rates, cart size, or logistics speeds, this is the exact crowd searching for your solutions. Networking dinners connect you with high-volume accounts.",
      metrics: [
        { label: "Avg store GMV", value: "$12M /yr" },
        { label: "Brand Decision Makers", value: "1,200+ Directors" },
        { label: "Key Benefit", value: "High-volume merchant onboarding" }
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

