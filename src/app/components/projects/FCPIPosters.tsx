import { useState } from "react";
import { X, ArrowRight, Palette, ChevronLeft, ChevronRight, Layout, Sparkles, Image, Compass, BookOpen, Layers } from "lucide-react";

import img1 from "@/assets/posters/1.png";
import img2 from "@/assets/posters/2.png";
import img3 from "@/assets/posters/3.png";
import img4 from "@/assets/posters/4.png";
import img5 from "@/assets/posters/5.png";
import img6 from "@/assets/posters/6.png";
import img7 from "@/assets/posters/7.png";
import img8 from "@/assets/posters/8.png";
import img9 from "@/assets/posters/9.png";
import img10 from "@/assets/posters/10.png";
import img11 from "@/assets/posters/11.png";
import img12 from "@/assets/posters/12.png";
import img13 from "@/assets/posters/13.png";
import img14 from "@/assets/posters/14.png";

interface FCPIPostersProps {
  onClose: () => void;
}

const POSTER_STEPS = [
  {
    step: 1,
    title: "Golden Week Observance",
    desc: "A vibrant commemorative design celebrating Japan's festive Golden Week. It utilizes seasonal cherry blossom tones and bright skies to invoke a sense of leisure, spring, and national celebration.",
    manual: "Designed in Canva using warm floral hues and a clear sans-serif layout to engage audiences during the long seasonal holiday.",
    src: img1,
    category: "Japan Holidays"
  },
  {
    step: 2,
    title: "Showa Day",
    desc: "Observed on April 29th, Showa Day honors the birthday of the late Emperor Showa and encourages public reflection on the Showa era. The design utilizes deep reds and traditional Japanese motifs to signify historical honor.",
    manual: "Crafted with balanced geometry, high-contrast text, and a clean professional layout to reflect historical significance.",
    src: img2,
    category: "Japan Holidays"
  },
  {
    step: 3,
    title: "Labor Day",
    desc: "A motivational tribute for May 1st celebrating the dedication, resilience, and contribution of workers. Features strong corporate typography, clean divisions, and an uplifting message.",
    manual: "Employs corporate blue tones and bold, structured text alignments to convey strength, professionalism, and team solidarity.",
    src: img3,
    category: "Global Observances"
  },
  {
    step: 4,
    title: "Children's Day (Kodomo no Hi)",
    desc: "Celebrated on May 5th to respect children's personalities and celebrate their happiness. Features playful 'Koinobori' (carp streamer) elements, representing strength and success.",
    manual: "Uses bright, friendly color scales and cute illustrations to make the design warm, welcoming, and family-friendly.",
    src: img4,
    category: "Japan Holidays"
  },
  {
    step: 5,
    title: "Constitution Memorial Day",
    desc: "A Japanese national holiday on May 3rd commemorating the adoption of the 1947 Constitution. Features a clean, serious design theme with a focus on peace, democracy, and national growth.",
    manual: "Features a structured grid with soft blue accents to represent governance, liberty, and legal stability.",
    src: img5,
    category: "Japan Holidays"
  },
  {
    step: 6,
    title: "Philippine Independence Day",
    desc: "Observed on June 12th to celebrate freedom and honor the historical declaration of independence in 1898. Designed with the vibrant colors of the Philippine flag and national symbols.",
    manual: "Features a strong red-white-and-blue thematic color scheme combined with high-contrast text elements to emphasize patriotism and national pride.",
    src: img6,
    category: "Philippine Holidays"
  },
  {
    step: 7,
    title: "Father's Day",
    desc: "A warm and sleek design honoring fathers and celebrating paternal bonds, fatherhood, and their positive influence in families and society.",
    manual: "Integrates deep teal and gold tones for a premium, masculine feel, paired with modern elegant typography.",
    src: img7,
    category: "Global Observances"
  },
  {
    step: 8,
    title: "Marine Day (Umi no Hi)",
    desc: "A Japanese national holiday celebrated on the third Monday of July to show gratitude for the blessings of the ocean. The poster showcases calming ocean currents and nautical artwork.",
    manual: "Utilizes cooling blue gradients, sea waves illustrations, and refreshing summer layouts to convey gratitude to the sea.",
    src: img8,
    category: "Japan Holidays"
  },
  {
    step: 9,
    title: "National Heroes' Day",
    desc: "Commemorated on the last Monday of August in the Philippines to honor all heroes of the nation, past and present. Features a dignified layout honoring historic and modern day frontliners.",
    manual: "Features a bold crimson and gold background paired with patriotic typography to evoke honor, valor, and tribute.",
    src: img9,
    category: "Philippine Holidays"
  },
  {
    step: 10,
    title: "Respect for the Aged Day (Keiro no Hi)",
    desc: "A Japanese holiday on the third Monday of September honoring elderly citizens. Designed with warm autumnal colors, symbolizing maturity, wisdom, and longevity.",
    manual: "Employs soft warm background gradients and clean sans-serif typography to convey care, respect, and warm wishes.",
    src: img10,
    category: "Japan Holidays"
  },
  {
    step: 11,
    title: "Autumnal Equinox Day",
    desc: "A Japanese holiday marking the transition into autumn, traditionally a day to pay respects to ancestors. Features maple leaves, natural tones, and serene layouts.",
    manual: "Designed with seasonal earth tones, fallen leaves aesthetics, and high-readability text to celebrate the changing seasons.",
    src: img11,
    category: "Japan Holidays"
  },
  {
    step: 12,
    title: "Feast of the Immaculate Conception",
    desc: "Observed on December 8th, a solemn day in the Catholic calendar and a special holiday in the Philippines. Features a pristine, peaceful layout reflecting reverence and spiritual devotion.",
    manual: "Employs deep blue and gold colors, celestial stars, and elegant serif typography to denote reverence and sacredness.",
    src: img12,
    category: "Philippine Holidays"
  },
  {
    step: 13,
    title: "Christmas Day Greetings",
    desc: "A festive, cheerful poster wishing a Merry Christmas to clients and staff of Flag City Properties. Styled with evergreen branches, golden ornaments, and classic holiday typography.",
    manual: "Employs holiday red and pine green color blocks, combined with clean script fonts to deliver a warm corporate greeting.",
    src: img13,
    category: "Global Observances"
  },
  {
    step: 14,
    title: "Rizal Day Commemoration",
    desc: "Observed on December 30th to honor the life, works, and sacrifice of Dr. Jose Rizal. Features a solemn, elegant commemorative frame reflecting national history and intellectual heritage.",
    manual: "Designed with classic sepia filters, gold trim, and formal serif typography to create a respectful, monument-inspired design.",
    src: img14,
    category: "Philippine Holidays"
  }
];

export default function FCPIPosters({ onClose }: FCPIPostersProps) {
  const [tourIdx, setTourIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tourIdx !== null) {
      setTourIdx((tourIdx - 1 + POSTER_STEPS.length) % POSTER_STEPS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tourIdx !== null) {
      setTourIdx((tourIdx + 1) % POSTER_STEPS.length);
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
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-fuchsia-500/[0.03] blur-[130px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[450px] h-[450px] rounded-full bg-pink-600/[0.03] blur-[130px]" />
      </div>

      {/* Navbar */}
      <nav className="glass-nav py-4 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => (window as any).goToLandingPage ? (window as any).goToLandingPage() : onClose()}
            className="font-mono-dm text-base font-medium select-none flex items-center gap-1 hover:text-fuchsia-400 transition-colors cursor-pointer"
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
          <Palette className="text-fuchsia-400" size={20} />
          <span className="font-mono-dm text-xs text-fuchsia-400/80 tracking-widest uppercase">// Internship Project Showcase</span>
        </div>
        <h1 className="font-rajdhani text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none">
          FCPI Holiday Observance Posters
        </h1>
        <p className="font-body text-slate-400 text-sm max-w-2xl mt-3 leading-relaxed">
          A collection of 14 custom-designed holiday and observance posters created for Flag City Properties, Inc. during my internship using Canva. The designs include local Philippine observances, Japanese national holidays, and global corporate celebrations.
        </p>
        <div className="w-14 h-[3px] bg-gradient-to-r from-fuchsia-400 to-pink-600 rounded-full mt-4" />
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 w-full grid lg:grid-cols-[1fr_540px] gap-12 z-10 flex-grow">
        
        {/* Left Column: Details */}
        <div className="space-y-8">
          
          <div className="glass rounded-2xl p-8 border border-white/5 space-y-6">
            <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Project Overview</h3>
            <p className="font-body text-slate-300 text-sm leading-relaxed">
              During my internship at Flag City Properties, Inc., I was tasked with creating visual communication assets for the company's social channels to commemorate holidays and significant dates. Using Canva, I designed a series of 14 professional posters that capture the essence of various regional, national, and global holidays.
            </p>
            <p className="font-body text-slate-300 text-sm leading-relaxed">
              The posters represent a diverse set of cultural dates, ranging from Philippine national holidays like Independence Day and Rizal Day, to Japanese holidays such as Golden Week, Showa Day, Marine Day, and Respect for the Aged Day, alongside global observances like Labor Day, Father's Day, and Christmas.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Sparkles size={20} className="text-fuchsia-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">Brand Consistency</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Maintains Flag City Properties corporate identity while respecting seasonal colors.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Compass size={20} className="text-pink-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">Cultural Diversity</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Tailored design details highlighting Philippine heritage, Japanese holiday motifs, and global milestones.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-8 border border-white/5 space-y-4">
            <h3 className="font-rajdhani text-xl font-bold text-white uppercase tracking-wider">// Key Tasks & Contributions</h3>
            <ul className="space-y-3 font-body text-slate-300 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Palette size={16} className="text-fuchsia-400 mt-0.5 flex-shrink-0" />
                <span><strong>Graphic Design Excellence:</strong> Created all 14 posters using Canva, selecting harmonic color scales, custom vector elements, and crisp typography to represent each observance.</span>
              </li>
              <li className="flex items-start gap-3">
                <Image size={16} className="text-fuchsia-400 mt-0.5 flex-shrink-0" />
                <span><strong>Branding Integration:</strong> Integrated official corporate themes, social media dimensions, and high-readability message lines suited for immediate social publishing.</span>
              </li>
              <li className="flex items-start gap-3">
                <Compass size={16} className="text-fuchsia-400 mt-0.5 flex-shrink-0" />
                <span><strong>Global & Local Alignment:</strong> Conducted design research to select appropriate symbols, banners, and layout structures for specific cultural holidays (e.g. cherry blossoms for Japan, national flags for the Philippines).</span>
              </li>
            </ul>
          </div>

          {/* Design Tool & Environment */}
          <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
            <h3 className="font-rajdhani text-sm font-bold text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
              <Layers size={16} /> Design Environment & Workflow
            </h3>
            <p className="font-body text-slate-400 text-xs leading-relaxed">
              Leveraging Canva's workspace, I established design grids, selected typography hierarchies, and utilized custom filters to maintain a clean corporate identity. Each layout underwent iteration cycles to ensure accurate message representation, precise pixel coordinates, and balanced negative space.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="font-rajdhani text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-3">// Design Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {["Canva Pro Workspace", "Vector Illustration", "Color Theory", "Social Media Typography", "Branding Design", "Philippine & Japanese Holiday Research", "Image Optimization"].map(tech => (
                <span key={tech} className="font-mono-dm text-[11px] text-fuchsia-400 bg-fuchsia-400/10 border border-fuchsia-400/20 px-3 py-1.5 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcases */}
        <div className="space-y-12">
          
          {/* Timeline Showcase */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Posters Gallery</h3>
                <p className="font-body text-xs text-slate-400 mt-1">14 customized holiday and observance social posters</p>
              </div>
              <button
                onClick={() => {
                  setTourIdx(0);
                }}
                className="btn-blue font-body text-white font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs cursor-pointer shadow-lg shadow-fuchsia-500/15"
                style={{ background: "linear-gradient(135deg, var(--color-fuchsia-600, #c026d3), var(--color-pink-700, #be185d))" }}
              >
                <Layers size={12} /> Start interactive Tour
              </button>
            </div>

            {/* Timeline for Posters */}
            <div className="relative border-l border-white/10 pl-6 ml-2 space-y-6 py-2">
              {(showAll ? POSTER_STEPS : POSTER_STEPS.slice(0, 5)).map((step, idx) => (
                <div key={step.step} className="relative group">
                  <div
                    onClick={() => {
                      setTourIdx(idx);
                    }}
                    className="absolute w-6 h-6 rounded-full bg-[#060b16] border border-white/20 flex items-center justify-center -left-[33px] top-1 group-hover:border-fuchsia-400 group-hover:bg-fuchsia-500/10 transition-colors cursor-pointer select-none"
                  >
                    <span className="font-mono-dm text-[9px] text-slate-400 group-hover:text-fuchsia-400">{step.step}</span>
                  </div>

                  <div
                    onClick={() => {
                      setTourIdx(idx);
                    }}
                    className="glass rounded-xl p-5 border border-white/5 group-hover:border-fuchsia-500/20 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <div className="w-full sm:w-24 h-28 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-fuchsia-500/30 transition-all duration-300 flex items-center justify-center">
                      <img
                        src={step.src}
                        alt={step.title}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        style={{ pointerEvents: "none" }}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono-dm text-[9px] text-fuchsia-400 bg-fuchsia-400/5 px-2 py-0.5 rounded border border-fuchsia-400/10">
                          {step.category}
                        </span>
                      </div>
                      <h4 className="font-rajdhani text-base font-bold text-white leading-tight group-hover:text-fuchsia-400 transition-colors">
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
                onClick={() => setShowAll(prev => !prev)}
                className="px-5 py-2 rounded-xl border border-white/10 hover:border-fuchsia-500/30 bg-[#0a1224]/50 hover:bg-fuchsia-500/5 text-xs font-semibold font-body text-slate-300 hover:text-fuchsia-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                {showAll ? "Show Less" : "See Full Showcase (9 More)"}
                <ChevronRight className={`transition-transform duration-300 ${showAll ? "-rotate-90" : "rotate-90"}`} size={12} />
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
              <span className="font-mono-dm text-xs text-fuchsia-400 uppercase tracking-widest font-bold">
                FCPI OBSERVANCE POSTER TOUR
              </span>
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
              <div className="absolute w-[60vw] h-[50vh] rounded-full bg-fuchsia-500/5 blur-[130px] pointer-events-none" />

              <div className="relative max-h-[65vh] max-w-[90vw] lg:max-w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 flex items-center justify-center">
                <img
                  src={POSTER_STEPS[tourIdx].src}
                  alt={POSTER_STEPS[tourIdx].title}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ pointerEvents: "none" }}
                  className="w-full h-full max-h-[65vh] object-contain rounded-xl"
                />
              </div>

              {/* Navigation Chevrons on Image */}
              <button
                onClick={handlePrev}
                className="absolute left-2 w-11 h-11 rounded-full bg-black/60 hover:bg-fuchsia-500/20 border border-white/10 hover:border-fuchsia-500/30 flex items-center justify-center text-white cursor-pointer z-10 transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 w-11 h-11 rounded-full bg-black/60 hover:bg-fuchsia-500/20 border border-white/10 hover:border-fuchsia-500/30 flex items-center justify-center text-white cursor-pointer z-10 transition-all"
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
                  <span className="font-mono-dm text-[10px] text-fuchsia-400 bg-fuchsia-400/5 border border-fuchsia-400/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {POSTER_STEPS[tourIdx].category}
                  </span>
                </div>

                <h2 className="font-rajdhani text-2xl lg:text-3xl font-bold text-white leading-tight">
                  {POSTER_STEPS[tourIdx].title}
                </h2>

                <p className="font-body text-slate-300 text-xs leading-relaxed font-light">
                  {POSTER_STEPS[tourIdx].desc}
                </p>

                <div className="border-t border-white/5 pt-4 space-y-2">
                  <h4 className="font-rajdhani text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen size={12} className="text-fuchsia-400" /> Designer's Guide
                  </h4>
                  <p className="font-body text-[11px] text-slate-400 leading-relaxed bg-white/[0.02] border border-white/[0.04] p-3 rounded-lg">
                    {POSTER_STEPS[tourIdx].manual}
                  </p>
                </div>
              </div>

              {/* Progress Dots inside Card */}
              <div className="flex items-center justify-center gap-1.5 pt-4 border-t border-white/5 flex-wrap">
                {POSTER_STEPS.map((step, idx) => (
                  <button
                    key={step.step}
                    onClick={() => setTourIdx(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === tourIdx ? "bg-fuchsia-500 w-3" : "bg-white/20 hover:bg-white/40"}`}
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
              <ChevronLeft size={16} /> Previous Poster
            </button>

            {tourIdx === POSTER_STEPS.length - 1 ? (
              <button
                onClick={() => setTourIdx(null)}
                className="font-body text-xs font-semibold bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-5 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Finish Walkthrough
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="font-body text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                Next Poster <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
