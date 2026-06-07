import { useState } from "react";
import { X, ArrowRight, Globe, ChevronLeft, ChevronRight, Layout, Search, Mail, Users, BookOpen, Layers } from "lucide-react";

// Admin images
import admin1 from "@/assets/projects/flag_city/admin/Screenshot 2026-06-06 090517.png";
import admin2 from "@/assets/projects/flag_city/admin/Screenshot 2026-06-06 090526.png";
import admin3 from "@/assets/projects/flag_city/admin/Screenshot 2026-06-06 090546.png";
import admin4 from "@/assets/projects/flag_city/admin/Screenshot 2026-06-06 090632.png";
import admin5 from "@/assets/projects/flag_city/admin/Screenshot 2026-06-06 090644.png";
import admin6 from "@/assets/projects/flag_city/admin/Screenshot 2026-06-06 090700.png";
import admin7 from "@/assets/projects/flag_city/admin/Screenshot 2026-06-06 090733.png";
import admin8 from "@/assets/projects/flag_city/admin/Screenshot 2026-06-06 090740.png";
import admin9 from "@/assets/projects/flag_city/admin/Screenshot 2026-06-06 090758.png";

// Client images
import client1 from "@/assets/projects/flag_city/client/Screenshot 2026-06-06 091502.png";
import client2 from "@/assets/projects/flag_city/client/Screenshot 2026-06-06 091544.png";
import client3 from "@/assets/projects/flag_city/client/Screenshot 2026-06-06 091622.png";
import client4 from "@/assets/projects/flag_city/client/Screenshot 2026-06-06 091653.png";
import client5 from "@/assets/projects/flag_city/client/Screenshot 2026-06-06 091728.png";
import client6 from "@/assets/projects/flag_city/client/Screenshot 2026-06-06 091742.png";
import client7 from "@/assets/projects/flag_city/client/Screenshot 2026-06-06 091827.png";

interface FlagCityPropertiesProps {
  onClose: () => void;
}

const ADMIN_STEPS = [
  {
    step: 1,
    title: "Admin Portal Entry Page",
    desc: "The access gateway for the real estate administrators. Featuring a two-column design with a portal overview and a custom sign-in trigger.",
    manual: "Click the 'Sign In' button on the left panel to proceed to the secure administrator login page.",
    src: admin1,
    category: "Portal Gateway"
  },
  {
    step: 2,
    title: "Administrator Secure Sign In",
    desc: "The administrator sign-in form, featuring credential fields (email/password), validation states, and a remember email option.",
    manual: "Enter your admin credentials (e.g., admin1@test.com and password) and click the 'SIGN IN' button to gain access to the dashboard.",
    src: admin2,
    category: "Authentication"
  },
  {
    step: 3,
    title: "Dashboard Overview Hub",
    desc: "The central command console of the admin portal. Displays custom analytics, inquiry conversion rate (48%), today's tasks, pending follow-ups, and a visual overview of weekly inquiries.",
    manual: "Use the sidebar navigation to switch between Dashboard, Properties, Blogs, Viewing Inquiries, Listing Inquiries, Careers, and Settings.",
    src: admin3,
    category: "Admin Dashboard"
  },
  {
    step: 4,
    title: "Manage Properties Catalog",
    desc: "The listing catalog workspace where admins can view, search, and delete property records. Includes statistics on total records, cities covered, active listings, and actions to add properties or export lists as PDF.",
    manual: "Search property listings using the input bar, export the directory to PDF, or click 'Add Property' to open the creation panel.",
    src: admin4,
    category: "Property Management"
  },
  {
    step: 5,
    title: "Manage Blogs Dashboard",
    desc: "The workspace designed for managing company blog content. Admins can filter by Testimonials, Company News, Market Updates, or Real Estate Tips, view drafts vs. published blogs, and search articles.",
    manual: "Click 'Add Blog' to publish a new article or testimonial. Filter the blog table using category badges or publish/draft status tabs.",
    src: admin5,
    category: "Blog Management"
  },
  {
    step: 6,
    title: "Viewing Schedule Manager",
    desc: "The panel where realtors manage client site-viewing appointments. It displays a mini calendar to visualize booked dates, and filters requests by status (Pending, Approved, Rescheduled, Cancelled).",
    manual: "Review viewing schedules using the calendar widget, filter inquiries based on status tabs, or export scheduled records to a PDF summary.",
    src: admin6,
    category: "Inquiry Management"
  },
  {
    step: 7,
    title: "Property Seller Listing Submissions",
    desc: "A specialized inbox where realtors review requests from property owners seeking to list their properties ('Sell With Us'). Shows total submissions, unread inquiries, new requests, confirmed listings, and status tracking.",
    manual: "Review the submissions table, toggle status filters between New, In Progress, and Closed, or open the detailed preview panel to update a specific submission.",
    src: admin7,
    category: "Submission Control"
  },
  {
    step: 8,
    title: "Manage Career Openings",
    desc: "A dashboard for HR/administration to list job openings for the real estate agency. Displays total postings, active listings, archived listings, hiring departments, applications received, and allows adding new positions.",
    manual: "Manage the agency's hiring pipeline by searching active positions, archiving filled roles, or clicking 'Add Position' to set up a new opening.",
    src: admin8,
    category: "Careers Workspace"
  },
  {
    step: 9,
    title: "Admin Account & Security Profile",
    desc: "The administrator profile console displaying account settings, profile completion status, personal detail inputs, and secure password-reset modules.",
    manual: "Click 'Edit Profile' to modify personal contact information or utilize the 'Reset Password' card to update security credentials.",
    src: admin9,
    category: "Profile Settings"
  }
];

const CLIENT_STEPS = [
  {
    step: 1,
    title: "Premium Client Landing Page",
    desc: "The welcoming homepage of the client-facing website, showcasing a hero image overlay, modern navigation header, and interactive search-filtering dropdowns.",
    manual: "Set Location, Property Type, and Price Range dropdown values and click 'Search' to locate matching properties in the listings directory.",
    src: client1,
    category: "Home Landing Page"
  },
  {
    step: 2,
    title: "Curated Property Catalog",
    desc: "The client-facing listings directory. Features a left-hand advanced filters sidebar, property count label, toggle filter button, and responsive listing cards displaying pricing, location, specs.",
    manual: "Toggle the 'Hide Filters' button to expand or collapse the filtering panel. Use the sidebar selectors to filter by location or type.",
    src: client2,
    category: "Property Listings"
  },
  {
    step: 3,
    title: "Seller Inquiry Submission Form",
    desc: "The client submission page for property sellers. Features agency benefits details alongside an interactive inquiry form that validates fields and posts details straight to the admin listing queue.",
    manual: "Fill out the seller details form including Name, Email, Property Address, and estimated value, and click 'Submit Listing Inquiry' to post it to the admin queue.",
    src: client3,
    category: "Sell With Us"
  },
  {
    step: 4,
    title: "Agency Profile & Mission",
    desc: "The company profile page of Flag City Properties, Inc. Highlights corporate values, core mission statements, and actions directing users to the team roster and service directories.",
    manual: "Click 'Meet Our Team' to scroll down to the staff directory, or select 'Explore Our Services' to discover the agency's primary service offerings.",
    src: client4,
    category: "About Us"
  },
  {
    step: 5,
    title: "Real Estate News & Insights",
    desc: "The public news and article catalog. Supports category filters (e.g., Company News, Testimonials, Investment Insights) and dynamically loads blog posts created in the admin portal.",
    manual: "Click category pills to filter published articles, or click 'Read More' under any article summary card to view its full details.",
    src: client5,
    category: "Blog Catalog"
  },
  {
    step: 6,
    title: "Agency Contact & General Inquiry",
    desc: "The agency contact portal. Houses office address coordinates, direct phone links, sales email details, and a general inquiry form routing customer queries to realtors.",
    manual: "Fill out the general inquiry details, specify the Inquiry Type, and click the 'Submit Inquiry' button to send your request.",
    src: client6,
    category: "Contact Us"
  },
  {
    step: 7,
    title: "Location Map & QR Social Links",
    desc: "The company footer information module. Houses scan-to-chat QR codes for Line, Facebook, TikTok, Instagram, YouTube, and Viber, alongside weekly business hours and a location mapping widget.",
    manual: "Scan the QR codes using a mobile device to initiate direct social messaging channels, or click 'Open in Maps' to get directions to the office.",
    src: client7,
    category: "Contact & Socials"
  }
];

export default function FlagCityProperties({ onClose }: FlagCityPropertiesProps) {
  const [tourIdx, setTourIdx] = useState<number | null>(null);
  const [activeTourType, setActiveTourType] = useState<"admin" | "client">("admin");
  const [showAllAdmin, setShowAllAdmin] = useState(false);
  const [showAllClient, setShowAllClient] = useState(false);

  const steps = activeTourType === "admin" ? ADMIN_STEPS : CLIENT_STEPS;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tourIdx !== null) {
      setTourIdx((tourIdx - 1 + steps.length) % steps.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tourIdx !== null) {
      setTourIdx((tourIdx + 1) % steps.length);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#060b16] text-white overflow-x-hidden flex flex-col relative z-50"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >

      {/* Background Neon Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-amber-500/[0.03] blur-[130px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[450px] h-[450px] rounded-full bg-orange-600/[0.03] blur-[130px]" />
      </div>

      {/* Navbar */}
      <nav className="glass-nav py-4 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="font-mono-dm text-base font-medium select-none flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span className="text-cyan-400">{"<"}</span>
            <span className="text-white mx-0.5">AT</span>
            <span className="text-cyan-400">{"/>"}</span>
          </button>
          <button
            onClick={onClose}
            className="font-body text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowRight className="rotate-180" size={16} /> Back to Portfolio
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-6 w-full z-10">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="text-amber-400" size={20} />
          <span className="font-mono-dm text-xs text-amber-400/80 tracking-widest uppercase">// Internship Project Showcase</span>
        </div>
        <h1 className="font-rajdhani text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none">
          Flag City Properties, Inc. Website
        </h1>
        <p className="font-body text-slate-400 text-sm max-w-2xl mt-3 leading-relaxed">
          Development and implementation of a modern, multi-module real estate website, comprising a rich customer catalog portal and an administrative dashboard to moderate properties, schedules, blog posts, and submissions.
        </p>
        <div className="w-14 h-[3px] bg-gradient-to-r from-amber-400 to-orange-600 rounded-full mt-4" />
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 w-full grid lg:grid-cols-[1fr_540px] gap-12 z-10 flex-grow">

        {/* Left Column: Details */}
        <div className="space-y-8">

          <div className="glass rounded-2xl p-8 border border-white/5 space-y-6">
            <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Project Overview</h3>
            <p className="font-body text-slate-300 text-sm leading-relaxed">
              During my internship at Flag City Properties, Inc., I worked alongside a fellow IT intern to plan, design, and develop a dual-sided web platform. The primary objective of the project was to modernize the website's user interface, implement a client-focused property search system, and optimize database management for improved efficiency and performance.
            </p>
            <p className="font-body text-slate-300 text-sm leading-relaxed">
              We split the scope into a client-facing web application where property seekers browse listings, submit general requests, or apply to sell their properties, and a secure admin panel where realtors manage listing cards, schedule viewing requests on an interactive calendar, publish draft blog articles, list career openings, and maintain profile details.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Layout size={20} className="text-amber-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">Rich Admin Workspace</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Includes schedule calendars, careers databases, secure settings, and blog tools.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Search size={20} className="text-orange-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">Client-Side Catalog</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Advanced location/type filters, interactive maps, social QR messaging channels, and seller request forms.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 border border-white/5 space-y-4">
            <h3 className="font-rajdhani text-xl font-bold text-white uppercase tracking-wider">// Key Tasks & Contributions</h3>
            <ul className="space-y-3 font-body text-slate-300 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Globe size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Admin Dashboard Development: Coded control modules for catalog uploads, viewing inquiry tracking (with interactive calendar views), and career job listings.</span>
              </li>
              <li className="flex items-start gap-3">
                <Users size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Team Collaboration: Worked closely with my co-IT intern to establish system requirements, design layouts in Figma, normalize database structures, and handle data validations.</span>
              </li>
              <li className="flex items-start gap-3">
                <Search size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Client Features Implementation: Developed responsive advanced filters for property listings and structured dynamic blog reading cards.</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Seller & Contact Forms: Created submission forms on the client portal that directly queue customer schedules and listing inquiries into the admin panel inbox.</span>
              </li>
            </ul>
          </div>

          {/* Internship Team Collaboration Card */}
          <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
            <h3 className="font-rajdhani text-sm font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Users size={16} /> Team & Collaboration
            </h3>
            <p className="font-body text-slate-400 text-xs leading-relaxed">
              This system was successfully delivered through collective efforts. I worked alongside a fellow IT intern to take ownership of key architectural scopes. We organized daily check-ins to synchronize database migrations, resolve frontend responsiveness bugs, and ensure consistent look-and-feel between the Admin Dashboard and the Client-facing pages.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="font-rajdhani text-sm font-bold text-amber-400 uppercase tracking-widest mb-3">// Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {["PHP (Backend Engine)", "MySQL Database", "JavaScript", "HTML5", "CSS3", "Canva Designing", "SEO Optimization", "Team Git Workflow"].map(tech => (
                <span key={tech} className="font-mono-dm text-[11px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcases */}
        <div className="space-y-12">

          {/* Admin Side Showcase */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Admin Portal</h3>
                <p className="font-body text-xs text-slate-400 mt-1">Refined administrative control center for management operations</p>
              </div>
              <button
                onClick={() => {
                  setActiveTourType("admin");
                  setTourIdx(0);
                }}
                className="btn-blue font-body text-white font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-lg shadow-cyan-500/15"
              >
                <Layers size={12} /> Start Admin Tour
              </button>
            </div>

            {/* Timeline for Admin */}
            <div className="relative border-l border-white/10 pl-6 ml-2 space-y-6 py-2">
              {(showAllAdmin ? ADMIN_STEPS : ADMIN_STEPS.slice(0, 2)).map((step, idx) => (
                <div key={step.step} className="relative group">
                  <div
                    onClick={() => {
                      setActiveTourType("admin");
                      setTourIdx(idx);
                    }}
                    className="absolute w-6 h-6 rounded-full bg-[#060b16] border border-white/20 flex items-center justify-center -left-[33px] top-1 group-hover:border-amber-400 group-hover:bg-amber-500/10 transition-colors cursor-pointer select-none"
                  >
                    <span className="font-mono-dm text-[9px] text-slate-400 group-hover:text-amber-400">{step.step}</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTourType("admin");
                      setTourIdx(idx);
                    }}
                    className="glass rounded-xl p-5 border border-white/5 group-hover:border-amber-500/20 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <div className="w-full sm:w-28 h-16 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-amber-500/30 transition-all duration-300">
                      <img
                        src={step.src}
                        alt={step.title}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        style={{ pointerEvents: "none" }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono-dm text-[9px] text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10">
                          {step.category}
                        </span>
                      </div>
                      <h4 className="font-rajdhani text-base font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">
                        {step.title}
                      </h4>
                      <p className="font-body text-slate-400 text-xs mt-1.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-1">
              <button
                onClick={() => setShowAllAdmin(prev => !prev)}
                className="px-5 py-2 rounded-xl border border-white/10 hover:border-amber-500/30 bg-[#0a1224]/50 hover:bg-amber-500/5 text-xs font-semibold font-body text-slate-300 hover:text-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                {showAllAdmin ? "Show Less" : "See Full Showcase"}
                <ChevronRight className={`transition-transform duration-300 ${showAllAdmin ? "-rotate-90" : "rotate-90"}`} size={12} />
              </button>
            </div>
          </div>

          {/* Client Side Showcase */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Client Side Webpage</h3>
                <p className="font-body text-xs text-slate-400 mt-1">Immersive portal for buyers, sellers, and property seekers</p>
              </div>
              <button
                onClick={() => {
                  setActiveTourType("client");
                  setTourIdx(0);
                }}
                className="btn-blue font-body text-white font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-lg shadow-cyan-500/15"
              >
                <Layers size={12} /> Start Client Tour
              </button>
            </div>

            {/* Timeline for Client */}
            <div className="relative border-l border-white/10 pl-6 ml-2 space-y-6 py-2">
              {(showAllClient ? CLIENT_STEPS : CLIENT_STEPS.slice(0, 2)).map((step, idx) => (
                <div key={step.step} className="relative group">
                  <div
                    onClick={() => {
                      setActiveTourType("client");
                      setTourIdx(idx);
                    }}
                    className="absolute w-6 h-6 rounded-full bg-[#060b16] border border-white/20 flex items-center justify-center -left-[33px] top-1 group-hover:border-amber-400 group-hover:bg-amber-500/10 transition-colors cursor-pointer select-none"
                  >
                    <span className="font-mono-dm text-[9px] text-slate-400 group-hover:text-amber-400">{step.step}</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTourType("client");
                      setTourIdx(idx);
                    }}
                    className="glass rounded-xl p-5 border border-white/5 group-hover:border-amber-500/20 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <div className="w-full sm:w-28 h-16 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-amber-500/30 transition-all duration-300">
                      <img
                        src={step.src}
                        alt={step.title}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        style={{ pointerEvents: "none" }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono-dm text-[9px] text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10">
                          {step.category}
                        </span>
                      </div>
                      <h4 className="font-rajdhani text-base font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">
                        {step.title}
                      </h4>
                      <p className="font-body text-slate-400 text-xs mt-1.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-1">
              <button
                onClick={() => setShowAllClient(prev => !prev)}
                className="px-5 py-2 rounded-xl border border-white/10 hover:border-amber-500/30 bg-[#0a1224]/50 hover:bg-amber-500/5 text-xs font-semibold font-body text-slate-300 hover:text-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                {showAllClient ? "Show Less" : "See Full Showcase"}
                <ChevronRight className={`transition-transform duration-300 ${showAllClient ? "-rotate-90" : "rotate-90"}`} size={12} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Walkthrough Tour Modal */}
      {tourIdx !== null && (
        <div
          className="fixed inset-0 bg-black/98 z-[999] flex flex-col justify-between p-6 animate-fade-in"
          onClick={() => setTourIdx(null)}
        >
          {/* Top Status Header */}
          <div className="flex items-center justify-between w-full z-10 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <span className="font-mono-dm text-xs text-amber-400 uppercase tracking-widest font-bold">
                {activeTourType === "admin" ? "ADMIN PORTAL TOUR" : "CLIENT WEBPAGE TOUR"}
              </span>
              <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono-dm text-[10px] text-slate-400 uppercase">
                  STEP {tourIdx + 1} OF {steps.length}
                </span>
              </div>
            </div>
            <button
              onClick={() => setTourIdx(null)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Interactive Workspace */}
          <div className="max-w-7xl mx-auto w-full flex-grow grid lg:grid-cols-[1fr_360px] gap-8 items-center py-6 select-none overflow-y-auto">

            {/* Visual Screen Display */}
            <div className="relative flex items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
              <div className="absolute w-[60vw] h-[50vh] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none" />

              <div className="relative max-h-[55vh] max-w-[90vw] lg:max-w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 flex items-center justify-center">
                <img
                  src={steps[tourIdx].src}
                  alt={steps[tourIdx].title}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ pointerEvents: "none" }}
                  className="w-full h-full max-h-[55vh] object-contain rounded-xl"
                />
              </div>

              {/* Navigation Chevrons on Image */}
              <button
                onClick={handlePrev}
                className="absolute left-2 w-11 h-11 rounded-full bg-black/60 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 flex items-center justify-center text-white cursor-pointer z-10 transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 w-11 h-11 rounded-full bg-black/60 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 flex items-center justify-center text-white cursor-pointer z-10 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Instruction Side Card */}
            <div
              className="glass rounded-2xl p-6 border border-white/10 space-y-5 w-full flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono-dm text-[10px] text-amber-400 bg-amber-400/5 border border-amber-400/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {steps[tourIdx].category}
                  </span>
                  <span className="font-mono-dm text-xs text-slate-500">
                    Step 0{steps[tourIdx].step}
                  </span>
                </div>

                <h2 className="font-rajdhani text-2xl lg:text-3xl font-bold text-white leading-tight">
                  {steps[tourIdx].title}
                </h2>

                <p className="font-body text-slate-300 text-xs leading-relaxed">
                  {steps[tourIdx].desc}
                </p>

                <div className="border-t border-white/5 pt-4 space-y-2">
                  <h4 className="font-rajdhani text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen size={12} className="text-amber-400" /> User Manual Guide
                  </h4>
                  <p className="font-body text-[11px] text-slate-400 leading-relaxed bg-white/[0.02] border border-white/[0.04] p-3 rounded-lg">
                    {steps[tourIdx].manual}
                  </p>
                </div>
              </div>

              {/* Progress Dots inside Card */}
              <div className="flex items-center justify-center gap-2 pt-4 border-t border-white/5">
                {steps.map((step, idx) => (
                  <button
                    key={step.step}
                    onClick={() => setTourIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === tourIdx ? "bg-amber-500 w-5" : "bg-white/20 hover:bg-white/40"}`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Control Bar */}
          <div className="flex items-center justify-between w-full z-10 max-w-7xl mx-auto border-t border-white/5 pt-4">
            <button
              onClick={handlePrev}
              className="font-body text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft size={16} /> Previous Page
            </button>

            {tourIdx === steps.length - 1 ? (
              <button
                onClick={() => setTourIdx(null)}
                className="font-body text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Finish Walkthrough
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="font-body text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                Next Page <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
