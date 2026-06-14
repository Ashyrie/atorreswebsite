import { useState } from "react";
import { X, ArrowRight, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import imgProjectUi from "@/assets/projects/flag_city/intern_project_ui.png";
import imgCoding from "@/assets/intern_coding.png";
import imgMeeting from "@/assets/intern_meeting.png";
import imgCertificates from "@/assets/intern_certificates.png";

interface InternshipPhotosProps {
  onClose: () => void;
}

const PHOTOS = [
  {
    src: imgProjectUi,
    title: "Real Estate Website Development",
    desc: "Designing and developing the landing page and property catalog UI for Flag City Properties, Inc., ensuring a clean, responsive layout.",
    category: "Full Stack Dev"
  },
  {
    src: imgCoding,
    title: "Full Stack Development Work",
    desc: "Working at the developer desk, writing robust frontend and backend scripts, database queries, and debugging code during the internship.",
    category: "Coding Tasks"
  },
  {
    src: imgMeeting,
    title: "Project Presentation & Code Reviews",
    desc: "Presenting system architecture, database design models, and coding progress to supervisors and teammates in the meeting room.",
    category: "Collaboration"
  },
  {
    src: imgCertificates,
    title: "Internship Completion Ceremony",
    desc: "Proudly receiving the Certificate of Completion alongside fellow interns and supervisors after successfully completing the internship program.",
    category: "Certification"
  }
];

export default function InternshipPhotos({ onClose }: InternshipPhotosProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx - 1 + PHOTOS.length) % PHOTOS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx + 1) % PHOTOS.length);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#060b16] text-white overflow-x-hidden flex flex-col relative z-50"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      
      {/* Hidden SVG Sharpening Filter for Real-time GPU Image Quality Enhancement */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="sharpen-filter">
          <feConvolveMatrix
            order="3"
            preserveAlpha="true"
            kernelMatrix="
              0    -0.35   0
             -0.35  2.4   -0.35
              0    -0.35   0"
          />
        </filter>
      </svg>

      {/* Background Neon Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-cyan-500/[0.04] blur-[130px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[450px] h-[450px] rounded-full bg-blue-600/[0.04] blur-[130px]" />
      </div>

      {/* Navbar */}
      <nav className="glass-nav py-4 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => (window as any).goToLandingPage ? (window as any).goToLandingPage() : onClose()}
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

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-6 w-full z-10">
        <div className="flex items-center gap-3 mb-2">
          <Camera className="text-cyan-400" size={20} />
          <span className="font-mono-dm text-xs text-cyan-400/80 tracking-widest uppercase">// Activity Documentation</span>
        </div>
        <h1 className="font-rajdhani text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Internship Photo Documentation
        </h1>
        <p className="font-body text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
          A visual record of web development projects, front-end and back-end coding tasks, and technical operations carried out during the Flag City Properties, Inc. internship.
        </p>
        <div className="w-14 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-4" />
      </div>

      {/* Photos Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20 w-full grid md:grid-cols-2 gap-6 z-10 flex-grow">
        {PHOTOS.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIdx(idx)}
            className="group relative p-[1px] bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-600/30 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col shadow-[0_0_20px_rgba(6,182,212,0.02)] hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
          >
            {/* Card Content Wrapper */}
            <div className="w-full h-full glass rounded-[15px] overflow-hidden flex flex-col flex-grow">
              {/* Image Container */}
              <div className="h-64 bg-slate-950 relative overflow-hidden flex items-center justify-center">
                <img
                  src={photo.src}
                  alt={photo.title}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{
                    imageRendering: "auto",
                    filter: "url(#sharpen-filter) contrast(1.08) brightness(1.03) saturate(1.05)",
                    WebkitTouchCallout: "none",
                    pointerEvents: "none",
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Badge */}
                <span className="absolute top-4 left-4 font-mono-dm text-[9px] text-cyan-400 bg-[#060b16]/85 border border-cyan-500/20 px-2.5 py-1 rounded shadow-lg uppercase tracking-wider">
                  {photo.category}
                </span>
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-[#060b16]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-body text-xs font-semibold bg-cyan-500/90 text-white px-4 py-2 rounded-xl shadow-lg border border-cyan-400/20 tracking-wider">
                    View Fullscreen
                  </span>
                </div>
              </div>

              {/* Description Text */}
              <div className="p-6 flex-grow flex flex-col justify-between bg-[#0a1224]/30 border-t border-white/[0.03]">
                <div>
                  <h3 className="font-rajdhani text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="font-body text-slate-400 text-xs leading-relaxed">
                    {photo.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Light Modal */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 bg-black/95 z-[999] flex flex-col justify-between p-6 animate-fade-in"
        >
          {/* Controls Header */}
          <div className="flex items-center justify-between w-full z-10">
            <span className="font-mono-dm text-xs text-slate-500">
              DOCUMENTATION PHOTO {lightboxIdx + 1} OF {PHOTOS.length}
            </span>
            <button
              onClick={() => setLightboxIdx(null)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Center Image and Navigations */}
          <div className="relative flex items-center justify-center flex-grow py-4 select-none">
            {/* Ambient soft blue glow behind lightbox photo */}
            <div className="absolute w-[70vw] h-[60vh] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

            <button
              onClick={handlePrev}
              className="absolute left-2 lg:left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer z-10 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={PHOTOS[lightboxIdx].src}
              alt={PHOTOS[lightboxIdx].title}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{
                imageRendering: "auto",
                filter: "url(#sharpen-filter) contrast(1.08) brightness(1.03) saturate(1.05)",
                WebkitTouchCallout: "none",
                pointerEvents: "none",
              }}
              className="max-h-[70vh] max-w-[90vw] lg:max-w-[75vw] object-contain rounded-lg shadow-2xl border border-white/5 relative z-10"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={handleNext}
              className="absolute right-2 lg:right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer z-10 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Description Footer */}
          <div className="max-w-3xl mx-auto text-center w-full z-10 select-none pb-4">
            <span className="font-mono-dm text-[10px] text-cyan-400 uppercase tracking-widest block mb-2">
              // {PHOTOS[lightboxIdx].category}
            </span>
            <h2 className="font-rajdhani text-2xl font-bold text-white mb-2 leading-tight">
              {PHOTOS[lightboxIdx].title}
            </h2>
            <p className="font-body text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
              {PHOTOS[lightboxIdx].desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
