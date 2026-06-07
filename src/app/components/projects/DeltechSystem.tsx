import { useState } from "react";
import { X, ArrowRight, Server, ChevronLeft, ChevronRight, Layout, Search, Mail, Users, BookOpen, Layers } from "lucide-react";

// Admin images
import admin1 from "@/assets/projects/deltech/admin/Screenshot 2026-06-06 104316.png";
import adminDashboardImg from "@/assets/projects/deltech/deltech_dashboard.png";
import admin2 from "@/assets/projects/deltech/admin/Screenshot 2026-06-06 153318.png";
import admin3 from "@/assets/projects/deltech/admin/Screenshot 2026-06-06 153343.png";
import admin4 from "@/assets/projects/deltech/admin/Screenshot 2026-06-06 153404.png";

// Client images
import client1 from "@/assets/projects/deltech/client/Screenshot 2026-06-06 153556.png";
import client2 from "@/assets/projects/deltech/client/Screenshot 2026-06-06 153627.png";
import client3 from "@/assets/projects/deltech/client/Screenshot 2026-06-06 153636.png";
import client4 from "@/assets/projects/deltech/client/Screenshot 2026-06-06 153645.png";
import client5 from "@/assets/projects/deltech/client/Screenshot 2026-06-06 153700.png";
import client6 from "@/assets/projects/deltech/client/Screenshot 2026-06-06 153714.png";
import client7 from "@/assets/projects/deltech/client/Screenshot 2026-06-06 153729.png";

interface DeltechSystemProps {
  onClose: () => void;
}

const ADMIN_STEPS = [
  {
    step: 1,
    title: "Verifier Portal Login",
    desc: "A secure access gateway requiring username, password, and an Authenticator OTP code, overlaid on a modern parking lot background.",
    manual: "Input your admin/verifier Username, Password, and 6-digit Authenticator OTP code, then click the 'Login' button to gain access.",
    src: admin1,
    category: "Authentication"
  },
  {
    step: 2,
    title: "Verifier Portal Dashboard",
    desc: "The command console displaying verification stats, total sales ($1,059.83), active customers (5), successful scans, failed scans, and verified orders counters.",
    manual: "Review the analytics cards for total sales and user traffic. Use the navigation links (Home, Logs, Verify) to manage activities.",
    src: adminDashboardImg,
    category: "Admin Dashboard"
  },
  {
    step: 3,
    title: "Activity Verification Logs",
    desc: "Central database console listing all scanned order number logs. Admins can search by order numbers, filter by date ranges, filter by verification status, and download logs as CSV.",
    manual: "Enter an order number or filter by dates and verified status, click 'SEARCH' to filter, or click 'DOWNLOAD AS CSV' to export data.",
    src: admin2,
    category: "Verification Logs"
  },
  {
    step: 4,
    title: "Parking QR Code Scanner",
    desc: "The administrative interface for active parking ticket verification. Offers a live video viewport framed in yellow to automatically scan QR codes.",
    manual: "Align the parking ticket's QR code in the camera scanner container to verify instantly. Click 'STOP SCANNING' to pause the camera.",
    src: admin3,
    category: "QR Scanner"
  },
  {
    step: 5,
    title: "Security PIN Configurations",
    desc: "The administrator credentials update panel where users can verify their identity using their current password and set a new 4-digit security PIN.",
    manual: "Enter your current password, type a new 4-digit PIN, re-enter it to confirm, and click 'Update PIN' to save.",
    src: admin4,
    category: "Security Settings"
  }
];

const CLIENT_STEPS = [
  {
    step: 1,
    title: "Deltech Landing Page Hero",
    desc: "The client-facing landing page displaying a full-width parking hero image slider and navigation bar with product search and reservation actions.",
    manual: "Click 'RESERVE NOW!' to initiate the parking booking form, browse features using slider arrow buttons, or use the header search input.",
    src: client1,
    category: "Home Landing"
  },
  {
    step: 2,
    title: "Products & Parking Equipment Catalog",
    desc: "A category-filtered grid showcase of state-of-the-art parking systems, RFID readers, surveillance setups, and mobile traffic solutions.",
    manual: "Use the category tabs to filter parking equipment (e.g. ticket dispensers, barrier gates) and view the descriptive product grid.",
    src: client2,
    category: "Product Directory"
  },
  {
    step: 3,
    title: "Professional Parking Solutions & Services",
    desc: "A service portfolio detailing professional system installations, operational maintenance services, and custom facility security setups.",
    manual: "Review the system installation, maintenance, and security cards to discover details on Deltech's technical service workflows.",
    src: client3,
    category: "Services Directory"
  },
  {
    step: 4,
    title: "Customer Support & Inquiries Channel",
    desc: "An integrated contact interface where users can send direct messages. Features input validation fields and visual design overlays.",
    manual: "Fill in your Full Name, Email, Subject, and message details, then click the 'Send Message' button to route inquiries to support.",
    src: client4,
    category: "Support Desk"
  },
  {
    step: 5,
    title: "About Deltech Corporation & Values",
    desc: "A summary detailing the company history, goals, and core corporate philosophies including official vision and mission declarations.",
    manual: "Explore the About Us section and read the dedicated panels for Our Vision (left) and Our Mission (right) of Deltech.",
    src: client5,
    category: "About Us"
  },
  {
    step: 6,
    title: "Secure Client Login Portal",
    desc: "The client sign-in form containing login input fields (Username, Password, Authenticator OTP) and redirection routes for new accounts.",
    manual: "Type your registered Username, Password, and active 2FA Authenticator OTP, and click the purple 'Login' button to access your account.",
    src: client6,
    category: "Client Access"
  },
  {
    step: 7,
    title: "Client Account Registration",
    desc: "A comprehensive grid-style registration portal containing 10 fields to register username, contact numbers, email, company profile, and password.",
    manual: "Complete all ten text inputs including username, email, company, and password, and click the purple 'REGISTER' button.",
    src: client7,
    category: "Account Creation"
  }
];

export default function DeltechSystem({ onClose }: DeltechSystemProps) {
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
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-violet-500/[0.03] blur-[130px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[450px] h-[450px] rounded-full bg-purple-600/[0.03] blur-[130px]" />
      </div>

      {/* Navbar */}
      <nav className="glass-nav py-4 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="font-mono-dm text-base font-medium select-none flex items-center gap-1 hover:text-violet-400 transition-colors cursor-pointer"
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
          <Server className="text-violet-400" size={20} />
          <span className="font-mono-dm text-xs text-violet-400/80 tracking-widest uppercase">// Academic Project Showcase</span>
        </div>
        <h1 className="font-rajdhani text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none">
          Deltech Integrated Reservation & Client Management System
        </h1>
        <p className="font-body text-slate-400 text-sm max-w-2xl mt-3 leading-relaxed">
          A web-based parking reservation, equipment directory, and client verification management system designed for Deltech Parking Systems & Solutions. Features a client-facing catalog for parking equipment, services, and support, paired with an administrative verifier portal featuring QR-code ticket scanning, real-time verification logging, and secure PIN configurations.
        </p>
        <div className="w-14 h-[3px] bg-gradient-to-r from-violet-400 to-purple-600 rounded-full mt-4" />
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 w-full grid lg:grid-cols-[1fr_540px] gap-12 z-10 flex-grow">
        
        {/* Left Column: Details */}
        <div className="space-y-8">
          
          <div className="glass rounded-2xl p-8 border border-white/5 space-y-6">
            <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Project Overview</h3>
            <p className="font-body text-slate-300 text-sm leading-relaxed">
              We partnered with <strong>Deltech Parking Systems and Solutions, Inc.</strong> to engineer a web portal that simplifies product transactions and streamlines client-side operations. The project divides functionality into two major components: a customer-facing e-commerce and information website for equipment catalog browsing and account registration, and a secure Verifier Dashboard for parking ticket QR code scans and scan history logs.
            </p>
            <p className="font-body text-slate-300 text-sm leading-relaxed">
              The verifier panel allows administrators to verify tickets using integrated camera modules, filter logs by order numbers and date bounds, download data directly to CSV format, and configure access settings. On the client side, visitors can explore parking equipment directories (such as barrier gates, RFID readers, and surveillance gear), send inquiries, and set up client accounts.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Layout size={20} className="text-violet-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">Verifier Admin Panel</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Includes login verification, real-time ticket scanning widgets, CSV log utilities, and secure credential resets.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Search size={20} className="text-purple-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">Client Side Portal</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Interactive product catalog menus, contact form submissions, and user profile authentication views.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 border border-white/5 space-y-4">
            <h3 className="font-rajdhani text-xl font-bold text-white uppercase tracking-wider">// Key Tasks & Contributions</h3>
            <ul className="space-y-3 font-body text-slate-300 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Server size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
                <span><strong>Admin Verifier Development:</strong> Coded control modules for verifier logins (credentials + OTP keys), camera scanner elements, and verification log databases.</span>
              </li>
              <li className="flex items-start gap-3">
                <Users size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
                <span><strong>Client Features Implementation:</strong> Developed product directory grids, service catalog components, contact support email fields, and customer authentication logs.</span>
              </li>
              <li className="flex items-start gap-3">
                <Search size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
                <span><strong>Audit Trail Log System:</strong> Designed the logs filter workspace allowing administrators to search order details, select date bounds, and download data as CSV files.</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
                <span><strong>System Architecture & Safety:</strong> Created verification logic structures preventing double scanning of order IDs and securing system data inputs.</span>
              </li>
            </ul>
          </div>

          {/* Academic Project Detail Card */}
          <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
            <h3 className="font-rajdhani text-sm font-bold text-violet-400 uppercase tracking-widest flex items-center gap-2">
              <Users size={16} /> Academic Development & Team
            </h3>
            <p className="font-body text-slate-400 text-xs leading-relaxed">
              For this academic project, we partnered with <strong>Deltech Parking Systems and Solutions, Inc.</strong> to deliver a web solution designed to streamline customer transactions and make purchasing their parking equipment and services easier. As a development team, we coordinated interface layouts, structured database schemas, and integrated scanner APIs to achieve these goals.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="font-rajdhani text-sm font-bold text-violet-400 uppercase tracking-widest mb-3">// Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {["PHP (Backend)", "MySQL Database", "JavaScript", "HTML5", "CSS3", "QR Scanning API", "2FA OTP Verification", "CSV Data Export"].map(tech => (
                <span key={tech} className="font-mono-dm text-[11px] text-violet-400 bg-violet-400/10 border border-violet-400/20 px-3 py-1.5 rounded-lg">
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
                <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Verifier Admin Side</h3>
                <p className="font-body text-xs text-slate-400 mt-1">Verifier command center for ticket scanning and logs administration</p>
              </div>
              <button
                onClick={() => {
                  setActiveTourType("admin");
                  setTourIdx(0);
                }}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 font-body text-white font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-lg shadow-purple-500/15 transition-all duration-200"
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
                    className="absolute w-6 h-6 rounded-full bg-[#060b16] border border-white/20 flex items-center justify-center -left-[33px] top-1 group-hover:border-violet-400 group-hover:bg-violet-500/10 transition-colors cursor-pointer select-none"
                  >
                    <span className="font-mono-dm text-[9px] text-slate-400 group-hover:text-violet-400">{step.step}</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTourType("admin");
                      setTourIdx(idx);
                    }}
                    className="glass rounded-xl p-5 border border-white/5 group-hover:border-violet-500/20 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <div className="w-full sm:w-28 h-16 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-violet-500/30 transition-all duration-300">
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
                        <span className="font-mono-dm text-[9px] text-violet-400 bg-violet-400/5 px-2 py-0.5 rounded border border-violet-400/10">
                          {step.category}
                        </span>
                      </div>
                      <h4 className="font-rajdhani text-base font-bold text-white leading-tight group-hover:text-violet-400 transition-colors">
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
                className="px-5 py-2 rounded-xl border border-white/10 hover:border-violet-500/30 bg-[#0a1224]/50 hover:bg-violet-500/5 text-xs font-semibold font-body text-slate-300 hover:text-violet-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
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
                <p className="font-body text-xs text-slate-400 mt-1">E-commerce products catalog, service listings, and customer support portal</p>
              </div>
              <button
                onClick={() => {
                  setActiveTourType("client");
                  setTourIdx(0);
                }}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 font-body text-white font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-lg shadow-purple-500/15 transition-all duration-200"
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
                    className="absolute w-6 h-6 rounded-full bg-[#060b16] border border-white/20 flex items-center justify-center -left-[33px] top-1 group-hover:border-violet-400 group-hover:bg-violet-500/10 transition-colors cursor-pointer select-none"
                  >
                    <span className="font-mono-dm text-[9px] text-slate-400 group-hover:text-violet-400">{step.step}</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTourType("client");
                      setTourIdx(idx);
                    }}
                    className="glass rounded-xl p-5 border border-white/5 group-hover:border-violet-500/20 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <div className="w-full sm:w-28 h-16 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-violet-500/30 transition-all duration-300">
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
                        <span className="font-mono-dm text-[9px] text-violet-400 bg-violet-400/5 px-2 py-0.5 rounded border border-violet-400/10">
                          {step.category}
                        </span>
                      </div>
                      <h4 className="font-rajdhani text-base font-bold text-white leading-tight group-hover:text-violet-400 transition-colors">
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
                className="px-5 py-2 rounded-xl border border-white/10 hover:border-violet-500/30 bg-[#0a1224]/50 hover:bg-violet-500/5 text-xs font-semibold font-body text-slate-300 hover:text-violet-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
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
              <span className="font-mono-dm text-xs text-violet-400 uppercase tracking-widest font-bold">
                {activeTourType === "admin" ? "VERIFIER PORTAL TOUR" : "CLIENT WEBPAGE TOUR"}
              </span>
              <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
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
              <div className="absolute w-[60vw] h-[50vh] rounded-full bg-violet-500/5 blur-[130px] pointer-events-none" />

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
                className="absolute left-2 w-11 h-11 rounded-full bg-black/60 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 flex items-center justify-center text-white cursor-pointer z-10 transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 w-11 h-11 rounded-full bg-black/60 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 flex items-center justify-center text-white cursor-pointer z-10 transition-all"
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
                  <span className="font-mono-dm text-[10px] text-violet-400 bg-violet-400/5 border border-violet-400/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
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
                    <BookOpen size={12} className="text-violet-400" /> User Manual Guide
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
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === tourIdx ? "bg-violet-500 w-5" : "bg-white/20 hover:bg-white/40"}`}
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
                className="font-body text-xs font-semibold bg-violet-500 hover:bg-violet-600 text-white px-5 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Finish Walkthrough
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="font-body text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1.5 cursor-pointer"
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
