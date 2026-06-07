import { useState } from "react";
import { X, ArrowRight, Trophy, ChevronLeft, ChevronRight, Star } from "lucide-react";

// ── Recognition Images ─────────────────────────────────────────────────────────
import imgNetworkSecurity from "@/assets/recognitions/9d65638e-025d-4218-acaf-1ffc1862c6cb.jpg";
import imgCapstone from "@/assets/recognitions/2b4f06f2-069a-441c-b3e4-6206a6e35be0.jpg";
import imgDeansLister from "@/assets/recognitions/ac6459bf-a6f0-4810-8a90-f299302054b8.jpg";
import imgHighHonors from "@/assets/recognitions/a8ee83f3-5316-41e6-acc2-b1233be58f8f.jpg";

// ── Types ──────────────────────────────────────────────────────────────────────

interface RecogItem {
  src: string;
  title: string;
  desc: string;
  date: string;
}

interface RecogGroup {
  category: string;
  year: string;
  accentCls: string;
  borderCls: string;
  bgGlow: string;
  dotCls: string;
  items: RecogItem[];
}

// ── Data ───────────────────────────────────────────────────────────────────────
// Sequence: Best in Network Security → Best Capstone → Dean's Lister → Graduate with High Honors (SHS last)

const RECOG_GROUPS: RecogGroup[] = [
  {
    category: "Best in Network Security",
    year: "2026",
    accentCls: "text-cyan-400",
    borderCls: "hover:border-cyan-500/40",
    bgGlow: "bg-cyan-500/10",
    dotCls: "bg-cyan-400",
    items: [
      {
        src: imgNetworkSecurity,
        title: "Best in Network Security Award",
        desc: "Awarded by the University of Makati — College of Computing and Information Sciences — for showcasing remarkable talent, innovation, and passion in the design, development, and implementation of systems and solutions that promote security, resilience, reliability, and technological advancement in the field of Information Technology and Network Security. Given on May 18, 2026.",
        date: "May 18, 2026",
      },
    ],
  },
  {
    category: "Best Capstone Project",
    year: "2026",
    accentCls: "text-amber-400",
    borderCls: "hover:border-amber-500/40",
    bgGlow: "bg-amber-500/10",
    dotCls: "bg-amber-400",
    items: [
      {
        src: imgCapstone,
        title: "Best Capstone Project – Second Place",
        desc: "Certificate of Recognition issued by the University of Makati — College of Computing and Information Sciences — for Best Capstone Project (Second Place). Awarded to Ailene R. Torres for showcasing remarkable talent, innovation, and passion in the design, development, and implementation of systems promoting security, resilience, reliability, and technological advancement. Given on May 18, 2026.",
        date: "May 18, 2026",
      },
    ],
  },
  {
    category: "Consistent Dean's Lister",
    year: "2022–2026",
    accentCls: "text-violet-400",
    borderCls: "hover:border-violet-500/40",
    bgGlow: "bg-violet-500/10",
    dotCls: "bg-violet-400",
    items: [
      {
        src: imgDeansLister,
        title: "Dean's Lister – 1st Semester AY 2025–2026",
        desc: "Certificate of Recognition awarded by the University of Makati — College of Computing and Information Sciences — to Ailene R. Torres for proving exemplary academic performance as a Dean's Lister in the Bachelor of Science in Information Technology program for the First Semester, Academic Year 2025–2026. Given on May 18, 2026.",
        date: "1st Semester AY 2025–2026",
      },
    ],
  },
  {
    category: "Graduate with High Honors",
    year: "2022",
    accentCls: "text-emerald-400",
    borderCls: "hover:border-emerald-500/40",
    bgGlow: "bg-emerald-500/10",
    dotCls: "bg-emerald-400",
    items: [
      {
        src: imgHighHonors,
        title: "Certificate of Recognition – With High Honors",
        desc: "Certificate of Recognition issued by the Department of Education, National Capital Region, Division Schools of Makati, Congressional District I, Maximo Estrella Senior High School, awarded to Ailene R. Torres for commendable performance With High Honors in the School Year 2021–2022. Given on July 4, 2022.",
        date: "July 4, 2022",
      },
    ],
  },
];

// ── Props ──────────────────────────────────────────────────────────────────────

interface RecognitionsDetailProps {
  onClose: () => void;
  initialGroupIdx?: number;
  initialItemIdx?: number;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function RecognitionsDetail({
  onClose,
  initialGroupIdx,
  initialItemIdx = 0,
}: RecognitionsDetailProps) {
  const [lightbox, setLightbox] = useState<{ groupIdx: number; itemIdx: number } | null>(
    initialGroupIdx !== undefined
      ? { groupIdx: initialGroupIdx, itemIdx: initialItemIdx }
      : null
  );

  const currentGroup = lightbox !== null ? RECOG_GROUPS[lightbox.groupIdx] : null;
  const currentItem = lightbox !== null ? currentGroup!.items[lightbox.itemIdx] : null;
  const totalInGroup = currentGroup?.items.length ?? 0;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightbox === null) return;
    const prevIdx = (lightbox.itemIdx - 1 + totalInGroup) % totalInGroup;
    setLightbox({ ...lightbox, itemIdx: prevIdx });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightbox === null) return;
    const nextIdx = (lightbox.itemIdx + 1) % totalInGroup;
    setLightbox({ ...lightbox, itemIdx: nextIdx });
  };

  return (
    <div
      className="min-h-screen bg-[#060b16] text-white overflow-x-hidden flex flex-col relative z-50"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      {/* Hidden SVG Sharpening Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="sharpen-recog">
          <feConvolveMatrix
            order="3"
            preserveAlpha="true"
            kernelMatrix="0 -0.3 0 -0.3 2.2 -0.3 0 -0.3 0"
          />
        </filter>
      </svg>

      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-[15%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-[15%] right-[18%] w-[420px] h-[420px] rounded-full bg-emerald-600/[0.04] blur-[120px]" />
        <div className="absolute top-[50%] right-[35%] w-[300px] h-[300px] rounded-full bg-violet-600/[0.03] blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="glass-nav py-4 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="font-mono-dm text-base font-medium select-none flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"
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

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-6 w-full z-10">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="text-amber-400" size={20} />
          <span className="font-mono-dm text-xs text-amber-400/80 tracking-widest uppercase">// Recognition Gallery</span>
        </div>
        <h1 className="font-rajdhani text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Awards & Recognition
        </h1>
        <p className="font-body text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
          Official recognition certificates and awards received throughout academic and professional journey — from university awards to senior high school honors.
        </p>
        <div className="w-14 h-[3px] bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mt-4" />
      </div>

      {/* Recognition Groups — 2-column grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24 w-full z-10 flex-grow">
        <div className="grid md:grid-cols-2 gap-10">
          {RECOG_GROUPS.map((group, gIdx) => (
            <div key={group.category}>

              {/* Group Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-3 h-3 rounded-full ${group.dotCls} flex-shrink-0`} />
                <div className="flex-grow">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className={`font-rajdhani text-2xl font-bold ${group.accentCls}`}>
                      {group.category}
                    </h2>
                    <span className={`font-mono-dm text-[10px] ${group.accentCls} bg-white/5 border border-white/10 px-2.5 py-1 rounded-full`}>
                      {group.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="space-y-5">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    onClick={() => setLightbox({ groupIdx: gIdx, itemIdx: iIdx })}
                    className={`group relative glass rounded-2xl overflow-hidden flex flex-col border border-white/5 ${group.borderCls} transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]`}
                  >
                    {/* Image */}
                    <div className="h-56 bg-slate-950 relative overflow-hidden flex items-center justify-center select-none">
                      <img
                        src={item.src}
                        alt={item.title}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        style={{
                          imageRendering: "auto",
                          filter: "url(#sharpen-recog) contrast(1.05) brightness(1.02)",
                          WebkitTouchCallout: "none",
                          pointerEvents: "none",
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Watermark */}
                      <div className="absolute inset-0 flex items-end justify-end p-3 pointer-events-none select-none">
                        <span className="font-mono-dm text-[8px] text-white/20 tracking-widest uppercase" style={{ textShadow: "0 0 4px rgba(0,0,0,0.6)" }}>
                          © Ailene Torres
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#060b16]/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className={`font-body text-xs font-semibold text-white px-4 py-2 rounded-xl shadow-lg border border-white/10 tracking-wider ${group.accentCls.replace("text-", "bg-").replace("400", "500/80")}`}>
                          View Fullscreen
                        </span>
                      </div>

                      {/* Date badge */}
                      <span className={`absolute bottom-3 left-3 font-mono-dm text-[9px] ${group.accentCls} bg-[#060b16]/85 border border-white/10 px-2.5 py-1 rounded shadow-lg uppercase tracking-wider`}>
                        {item.date}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-grow flex flex-col bg-[#0a1224]/30 border-t border-white/[0.03]">
                      <h3 className="font-rajdhani text-[15px] font-bold text-white mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-body text-slate-500 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Lightbox */}
      {lightbox !== null && currentItem && currentGroup && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/96 z-[999] flex flex-col justify-between p-6 animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full z-10">
            <span className="font-mono-dm text-xs text-slate-500 uppercase tracking-wider">
              {currentGroup.category} · {lightbox.itemIdx + 1} / {totalInGroup}
            </span>
            <button
              onClick={() => setLightbox(null)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Center: Image + Nav */}
          <div className="relative flex items-center justify-center flex-grow py-4 select-none">
            <div className={`absolute w-[60vw] h-[55vh] rounded-full ${currentGroup.bgGlow} blur-[130px] pointer-events-none`} />

            {totalInGroup > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 lg:left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer z-10 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Image wrapper — protects against save */}
            <div
              className="relative z-10 select-none"
              onContextMenu={(e) => e.preventDefault()}
              style={{ userSelect: "none", WebkitUserSelect: "none" }}
            >
              <img
                src={currentItem.src}
                alt={currentItem.title}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onClick={(e) => e.stopPropagation()}
                style={{
                  imageRendering: "auto",
                  filter: "url(#sharpen-recog) contrast(1.05) brightness(1.02)",
                  WebkitTouchCallout: "none",
                  pointerEvents: "none",
                }}
                className="max-h-[68vh] max-w-[88vw] lg:max-w-[72vw] object-contain rounded-lg shadow-2xl border border-white/5"
              />
              {/* Lightbox watermark */}
              <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none select-none">
                <span className="font-mono-dm text-[9px] text-white/20 tracking-[0.25em] uppercase" style={{ textShadow: "0 0 6px rgba(0,0,0,0.8)" }}>
                  © Ailene Torres · Portfolio Only
                </span>
              </div>
            </div>

            {totalInGroup > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 lg:right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer z-10 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="max-w-3xl mx-auto text-center w-full z-10 select-none pb-4">
            <span className={`font-mono-dm text-[10px] ${currentGroup.accentCls} uppercase tracking-widest block mb-2`}>
              // {currentGroup.category} · {currentGroup.year}
            </span>
            <h2 className="font-rajdhani text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
              {currentItem.title}
            </h2>
            <p className="font-body text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
              {currentItem.desc}
            </p>
            {totalInGroup > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {currentGroup.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightbox({ groupIdx: lightbox.groupIdx, itemIdx: i }); }}
                    className={`h-1.5 rounded-full transition-all duration-200 ${i === lightbox.itemIdx ? `${currentGroup.dotCls} w-4` : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
