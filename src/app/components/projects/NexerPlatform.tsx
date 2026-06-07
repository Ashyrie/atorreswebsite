import { useState } from "react";
import { X, ArrowRight, Monitor, ChevronLeft, ChevronRight, Play, Tv, Database, BookOpen, Info, Layers, Search, Settings } from "lucide-react";

import imgLanding from "@/assets/projects/nexer/nexer_landing.png";
import imgRegister from "@/assets/projects/nexer/nexer_register.png";
import imgPlan from "@/assets/projects/nexer/nexer_plan.png";
import imgPayment from "@/assets/projects/nexer/nexer_payment.png";
import imgSignin from "@/assets/projects/nexer/nexer_signin.png";
import imgSpiritedAway from "@/assets/projects/nexer/nexer_spirited_away.png";
import imgSearch from "@/assets/projects/nexer/nexer_search.png";
import imgPrincessKaguya from "@/assets/projects/nexer/nexer_princess_kaguya.png";
import imgEpisodes from "@/assets/projects/nexer/nexer_episodes.png";
import imgSettings from "@/assets/projects/nexer/nexer_settings.png";

interface NexerPlatformProps {
  onClose: () => void;
}

const STEPS = [
  {
    step: 1,
    title: "Welcome & Landing Page",
    desc: "The entry portal of the Nexer platform. It features an immersive background grid of iconic Studio Ghibli film poster covers. Visitors can start their subscription journey by registering their email.",
    manual: "Input your email address in the center input box and click 'Get Started' to sign up.",
    src: imgLanding,
    category: "Entry Portal"
  },
  {
    step: 2,
    title: "Account Sign-Up Flow",
    desc: "The initial step of the registration sequence where new users enter their credentials and secure their account setup by defining a password.",
    manual: "Fill in your email, choose a secure password, and click 'Next' to continue to selection of subscription tiers.",
    src: imgRegister,
    category: "Registration"
  },
  {
    step: 3,
    title: "Plan Selection Page",
    desc: "The subscription tiers configuration. It outlines pricing benefits for Premium (₱549/mo), Standard (₱349/mo), and Basic (₱249/mo) options.",
    manual: "Compare tiers based on video quality (4K/HDR vs 1080p vs 720p). Select the tier that matches your preference and click 'Choose Plan'.",
    src: imgPlan,
    category: "Pricing Plans"
  },
  {
    step: 4,
    title: "Payment Gateway Choice",
    desc: "A secure checkout dashboard giving users the flexibility to settle membership fees using Credit/Debit Cards or Digital Wallets (GCash).",
    manual: "Select between 'Credit or Debit Card' or 'Digital Wallet' (GCash). Fill in the card credentials or your GCash mobile number to complete the signup.",
    src: imgPayment,
    category: "Billing Setup"
  },
  {
    step: 5,
    title: "Sign In Overlay Modal",
    desc: "A glassy, interactive login modal that overlays the Ghibli landing page grid. Existing users enter credentials here to log in directly.",
    manual: "Input your Username and Password, then click 'Log In'. New users can click 'Sign up now' in the footer to navigate to the registration page.",
    src: imgSignin,
    category: "Authentication"
  },
  {
    step: 6,
    title: "Movie Catalog Dashboard",
    desc: "The main streaming home catalog interface populated with Ghibli titles. Features a prominent billboard title card (e.g. Spirited Away) and slider lists like 'Popular on Nexer'.",
    manual: "Browse collections, search by keywords, or hover over movie cards. Click the 'Play' button on the banner card to stream the featured title instantly.",
    src: imgSpiritedAway,
    category: "Streaming Hub"
  },
  {
    step: 7,
    title: "Interactive Search Page",
    desc: "Real-time search portal displaying Ghibli titles matching keywords. Displays cards that lead to detail views.",
    manual: "Type keywords (e.g. title, characters) in the search input box in the upper right. Click any search results card to open its information panel.",
    src: imgSearch,
    category: "Search Page"
  },
  {
    step: 8,
    title: "Show Info (Princess Kaguya)",
    desc: "Detail info segment for Princess Kaguya including play controls, watchlist additions, and match details.",
    manual: "Click 'Play' to stream the title or click 'Add' to bookmark the title in your watchlist.",
    src: imgPrincessKaguya,
    category: "Show Info"
  },
  {
    step: 9,
    title: "Episodes Selection (Castle in the Sky)",
    desc: "Episodes grid view detailing season splits and individual summaries for series-based Ghibli titles.",
    manual: "Select an episode card to see its description and stream. Hover to see preview content details.",
    src: imgEpisodes,
    category: "Episodes Selection"
  },
  {
    step: 10,
    title: "Account Settings Page",
    desc: "Settings panel for modifying plan tiers, changing passwords, logging out, or deleting user accounts.",
    manual: "Select your new plan tier and click 'Update Plan', or fill out new password credentials and click 'Change Password' to secure your account.",
    src: imgSettings,
    category: "Account Settings"
  }
];

export default function NexerPlatform({ onClose }: NexerPlatformProps) {
  const [tourIdx, setTourIdx] = useState<number | null>(null);
  const [showAllSteps, setShowAllSteps] = useState(false);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tourIdx !== null) {
      setTourIdx((tourIdx - 1 + STEPS.length) % STEPS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tourIdx !== null) {
      setTourIdx((tourIdx + 1) % STEPS.length);
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
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-rose-500/[0.03] blur-[130px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[450px] h-[450px] rounded-full bg-pink-600/[0.03] blur-[130px]" />
      </div>

      {/* Navbar */}
      <nav className="glass-nav py-4 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="font-mono-dm text-base font-medium select-none flex items-center gap-1 hover:text-rose-400 transition-colors cursor-pointer"
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
          <Monitor className="text-pink-400" size={20} />
          <span className="font-mono-dm text-xs text-pink-400/80 tracking-widest uppercase">// Academic Project Showcase</span>
        </div>
        <h1 className="font-rajdhani text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none">
          Nexer: A Netflix Inspired Streaming Platform
        </h1>
        <p className="font-body text-slate-400 text-sm max-w-2xl mt-3 leading-relaxed">
          An interactive web-based video streaming clone featuring custom user session management, media catalog browsing, and dashboard control views.
        </p>
        <div className="w-14 h-[3px] bg-gradient-to-r from-pink-400 to-rose-600 rounded-full mt-4" />
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 w-full grid lg:grid-cols-2 gap-12 z-10 flex-grow">

        {/* Left Column: Details */}
        <div className="space-y-8">

          <div className="glass rounded-2xl p-8 border border-white/5 space-y-6">
            <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Project Overview</h3>
            <p className="font-body text-slate-300 text-sm leading-relaxed">
              Nexer is an on-demand video streaming platform inspired by Netflix that exclusively showcases movies and TV shows produced by Studio Ghibli. Built on a solid foundation of PHP and a MySQL database, it provides Ghibli fans with a personal cinema experience, featuring a virtual cineplex feel with a subscription-based model that users can easily cancel at any time.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Tv size={20} className="text-pink-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">Media Hub</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Exclusively showcases Ghibli titles with smooth category navigation layouts.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Database size={20} className="text-rose-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">MySQL Database</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Stores user details, subscription settings, payment records, and favorites lists.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 border border-white/5 space-y-4">
            <h3 className="font-rajdhani text-xl font-bold text-white uppercase tracking-wider">// Core Features & Integrations</h3>
            <ul className="space-y-3 font-body text-slate-300 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Play size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Studio Ghibli Collection: An exclusive catalog featuring Ghibli's complete collection of iconic classics (e.g. Spirited Away, My Neighbor Totoro).</span>
              </li>
              <li className="flex items-start gap-3">
                <Play size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Keyword Search & Browse: Enhanced search functionality tailored to find movies by keywords, directors, or character names.</span>
              </li>
              <li className="flex items-start gap-3">
                <Play size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Watchlist & Favorites Lists: Bookmarking tools allowing Ghibli fans to save titles and manage favorites directly from the interface.</span>
              </li>
              <li className="flex items-start gap-3">
                <Play size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <span>User Account Control: Dedicated views displaying active logged-in profile accounts and tracking watchlist preferences.</span>
              </li>
              <li className="flex items-start gap-3">
                <Play size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Monetization & Plan Options: Subscription options (Premium, Standard, Basic) with settings to alter plans or delete accounts.</span>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="font-rajdhani text-sm font-bold text-pink-400 uppercase tracking-widest mb-3">// Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {["PHP (Backend Engines)", "MySQL Database", "HTML", "CSS", "JavaScript", "User Registration & Sessions", "Payment Processing API"].map(tech => (
                <span key={tech} className="font-mono-dm text-[11px] text-pink-400 bg-pink-400/10 border border-pink-400/20 px-3 py-1.5 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcase & Tour Trigger */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Project Showcase</h3>
            <button
              onClick={() => setTourIdx(0)}
              className="btn-blue font-body text-white font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs cursor-pointer shadow-lg shadow-cyan-500/15"
            >
              <Layers size={14} /> Start Interactive Tour
            </button>
          </div>

          {/* Sequential Timeline Design */}
          <div className="relative border-l border-white/10 pl-6 ml-2 space-y-8 py-2">
            {(showAllSteps ? STEPS : STEPS.slice(0, 5)).map((step, idx) => (
              <div key={step.step} className="relative group">
                {/* Step Circle Indicator */}
                <div
                  onClick={() => setTourIdx(idx)}
                  className="absolute w-6 h-6 rounded-full bg-[#060b16] border border-white/20 flex items-center justify-center -left-[33px] top-1 group-hover:border-rose-400 group-hover:bg-rose-500/10 transition-colors cursor-pointer select-none"
                >
                  <span className="font-mono-dm text-[9px] text-slate-400 group-hover:text-rose-400">{step.step}</span>
                </div>

                {/* Timeline Step Content */}
                <div
                  onClick={() => setTourIdx(idx)}
                  className="glass rounded-xl p-5 border border-white/5 group-hover:border-rose-500/20 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start"
                >
                  {/* Miniature Image Preview */}
                  <div className="w-full sm:w-28 h-16 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-rose-500/30 transition-all duration-300">
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

                  {/* Text Details */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono-dm text-[9px] text-rose-400 bg-rose-400/5 px-2 py-0.5 rounded border border-rose-400/10">
                        {step.category}
                      </span>
                    </div>
                    <h4 className="font-rajdhani text-lg font-bold text-white leading-tight group-hover:text-rose-400 transition-colors">
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

          {/* Toggle Full Sequence Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAllSteps(prev => !prev)}
              className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-rose-500/30 bg-[#0a1224]/50 hover:bg-rose-500/5 text-xs font-semibold font-body text-slate-300 hover:text-rose-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              {showAllSteps ? "Show Less" : "Show Full Sequence (5 More Steps)"}
              <ChevronRight className={`transition-transform duration-300 ${showAllSteps ? "-rotate-90" : "rotate-90"}`} size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Walkthrough Tour Modal */}
      {tourIdx !== null && (
        <div
          className="fixed inset-0 bg-black/98 z-[999] flex flex-col justify-between p-6 animate-fade-in"
          onClick={() => setTourIdx(null)}
        >
          {/* Top Status Header */}
          <div className="flex items-center justify-between w-full z-10 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <span className="font-mono-dm text-xs text-rose-400 uppercase tracking-widest font-bold">
                NEXER WEBSITE TOUR
              </span>
              <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-mono-dm text-[10px] text-slate-400 uppercase">
                  STEP {tourIdx + 1} OF {STEPS.length}
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

          {/* Interactive Workspace (Image + Side Panel) */}
          <div className="max-w-7xl mx-auto w-full flex-grow grid lg:grid-cols-[1fr_360px] gap-8 items-center py-6 select-none overflow-y-auto">

            {/* Visual Screen Display */}
            <div className="relative flex items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
              {/* Backlight Glow matching rose theme */}
              <div className="absolute w-[60vw] h-[50vh] rounded-full bg-rose-500/5 blur-[130px] pointer-events-none" />

              <div className="relative max-h-[55vh] max-w-[90vw] lg:max-w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 flex items-center justify-center">
                <img
                  src={STEPS[tourIdx].src}
                  alt={STEPS[tourIdx].title}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ pointerEvents: "none" }}
                  className="w-full h-full max-h-[55vh] object-contain rounded-xl"
                />
              </div>

              {/* Float Chevrons on Image */}
              <button
                onClick={handlePrev}
                className="absolute left-2 w-11 h-11 rounded-full bg-black/60 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 flex items-center justify-center text-white cursor-pointer z-10 transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 w-11 h-11 rounded-full bg-black/60 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 flex items-center justify-center text-white cursor-pointer z-10 transition-all"
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
                  <span className="font-mono-dm text-[10px] text-rose-400 bg-rose-400/5 border border-rose-400/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {STEPS[tourIdx].category}
                  </span>
                  <span className="font-mono-dm text-xs text-slate-500">
                    Step 0{STEPS[tourIdx].step}
                  </span>
                </div>

                <h2 className="font-rajdhani text-2xl lg:text-3xl font-bold text-white leading-tight">
                  {STEPS[tourIdx].title}
                </h2>

                <p className="font-body text-slate-300 text-xs leading-relaxed">
                  {STEPS[tourIdx].desc}
                </p>

                <div className="border-t border-white/5 pt-4 space-y-2">
                  <h4 className="font-rajdhani text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen size={12} className="text-rose-400" /> User Manual Guide
                  </h4>
                  <p className="font-body text-[11px] text-slate-400 leading-relaxed bg-white/[0.02] border border-white/[0.04] p-3 rounded-lg">
                    {STEPS[tourIdx].manual}
                  </p>
                </div>
              </div>

              {/* Progress dots inside Card */}
              <div className="flex items-center justify-center gap-2 pt-4 border-t border-white/5">
                {STEPS.map((step, idx) => (
                  <button
                    key={step.step}
                    onClick={() => setTourIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === tourIdx ? "bg-rose-500 w-5" : "bg-white/20 hover:bg-white/40"}`}
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

            {tourIdx === STEPS.length - 1 ? (
              <button
                onClick={() => setTourIdx(null)}
                className="font-body text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Finish Walkthrough
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="font-body text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
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
