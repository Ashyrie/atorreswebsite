import { useState } from "react";
import {
  ArrowRight, Download, Mail, Phone, Globe
} from "lucide-react";
import {
  SKILLS, PROJECTS, CERTS, SEMINARS, REFERENCES
} from "../data";

interface ResumePageProps {
  onClose: () => void;
  resumePdf: string;
  profileImg: string;
}

export default function ResumePage({ onClose, resumePdf, profileImg }: ResumePageProps) {
  const [cvTab, setCvTab] = useState<"interactive" | "pdf">("interactive");

  return (
    <div
      className="min-h-screen bg-[#060b16] text-white overflow-x-hidden flex flex-col"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full flex-grow flex flex-col">
        
        {/* Header Banner */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/[0.06] pb-6 pt-6">
          <div>
            <h1 className="font-rajdhani text-5xl font-bold text-white tracking-tight">AILENE R. TORRES</h1>
            <p className="font-body text-cyan-400 text-base font-medium mt-1">// Information Technology Professional · Cybersecurity & Networks</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
              <button
                onClick={() => setCvTab("interactive")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${cvTab === "interactive" ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-400 hover:text-white"}`}
              >
                Interactive Web CV
              </button>
              <button
                onClick={() => setCvTab("pdf")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${cvTab === "pdf" ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-400 hover:text-white"}`}
              >
                Original PDF Document
              </button>
            </div>

            <a
              href={resumePdf}
              download="Ailene_R_Torres_CV.pdf"
              className="btn-blue font-body text-white text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2"
            >
              <Download size={15} /> Download PDF
            </a>
          </div>
        </div>

        {cvTab === "pdf" ? (
          /* PDF View */
          <div className="glass rounded-2xl border border-white/5 overflow-hidden flex-grow min-h-[600px] lg:min-h-[750px] flex flex-col relative">
            <iframe
              src={resumePdf}
              title="Ailene R. Torres CV"
              className="w-full h-full flex-grow border-0 min-h-[600px] lg:min-h-[750px]"
            />
          </div>
        ) : (
          /* Interactive Web CV View */
          <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
            
            {/* Left Column: Quick Profile Summary & Meta */}
            <div className="space-y-6 lg:sticky lg:top-24">
              
              {/* Profile Card */}
              <div className="glass rounded-2xl p-6 border border-white/5 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0f2347] to-[#07132a] border border-cyan-500/30 overflow-hidden relative flex-shrink-0">
                    <img
                      src={profileImg}
                      alt="Ailene R. Torres"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ pointerEvents: "none" }}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-rajdhani font-bold text-white text-lg">Ailene R. Torres</h4>
                    <p className="font-mono-dm text-[10px] text-slate-500 mt-0.5">B.S. IT Graduate</p>
                  </div>
                </div>
                
                <p className="font-body text-slate-400 text-xs leading-relaxed border-t border-white/5 pt-4">
                  Recent graduate with a Bachelor’s Degree in Information Technology from the University of Makati, equipped with foundational knowledge in technical support, troubleshooting, networking, and cybersecurity. Demonstrates adaptability, problem-solving skills, and experience working in collaborative team environments through academic and internship-related activities. Eager to apply technical expertise, learn emerging technologies, improve operational efficiency, and provide reliable IT support in fast-paced work environments.
                </p>

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail size={13} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-mono-dm text-[9px] text-slate-600 uppercase tracking-widest block">Email</span>
                      <a href="mailto:torresailene25@gmail.com" className="font-body text-xs text-slate-300 hover:text-cyan-400">torresailene25@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-mono-dm text-[9px] text-slate-600 uppercase tracking-widest block">Phone</span>
                      <a href="tel:+639559880972" className="font-body text-xs text-slate-300 hover:text-emerald-400">09559880972</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe size={13} className="text-violet-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-mono-dm text-[9px] text-slate-600 uppercase tracking-widest block">Address</span>
                      <span className="font-body text-xs text-slate-300">Malate, Manila City, 1004</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Card */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-rajdhani font-bold text-base text-cyan-400 mb-4 tracking-wider uppercase">// Education</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-body text-xs text-slate-500 font-mono-dm uppercase tracking-wider mb-1">2022 – 2026</p>
                    <h4 className="font-rajdhani font-bold text-white text-sm">University of Makati</h4>
                    <p className="font-body text-xs text-slate-400 leading-snug">Bachelor of Science in Information Technology</p>
                    <p className="font-body text-[10px] text-cyan-400/80 mt-1">Information & Network Security Track</p>
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    <p className="font-body text-xs text-slate-500 font-mono-dm uppercase tracking-wider mb-1">2020 – 2022</p>
                    <h4 className="font-rajdhani font-bold text-white text-sm">Maximo Estrella Senior High School</h4>
                    <p className="font-body text-xs text-slate-400">STEM Strand Graduate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Scrolling Details */}
            <div className="space-y-6">
              
              {/* Work Experience */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-rajdhani font-bold text-lg text-cyan-400 mb-6 tracking-wider uppercase">// Internship Experience</h3>
                
                <div className="relative border-l border-white/10 pl-6 pb-2 ml-2">
                  <div className="absolute w-3 h-3 rounded-full bg-cyan-400 -left-[6.5px] top-1.5 shadow-lg shadow-cyan-400/40" />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-rajdhani text-xl font-bold text-white leading-none">Full Stack Web Developer Intern</h4>
                      <p className="font-body text-slate-400 text-xs mt-1.5 font-medium">Flag City Properties, Inc. · Bacolod City</p>
                    </div>
                    <span className="font-mono-dm text-[11px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-md">
                      Feb 2026 – Apr 2026
                    </span>
                  </div>
                  <ul className="space-y-2.5 font-body text-slate-300 text-xs leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      Assisted in front-end and back-end website development and functionality enhancement.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      Provided staff technical support, including account management, printer troubleshooting, software diagnostics, and Microsoft Office assistance.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      Handled and encoded sensitive information with accuracy and confidentiality.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      Designed promotional and informational materials using Canva.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-rajdhani font-bold text-lg text-cyan-400 mb-6 tracking-wider uppercase">// Key Projects</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {PROJECTS.map(proj => (
                    <div key={proj.title} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-cyan-500/20 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono-dm text-[9px] text-slate-500 block uppercase tracking-widest">{proj.subtitle}</span>
                        <span className="font-mono-dm text-[9px] text-cyan-400/80 bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-400/10">{proj.date}</span>
                      </div>
                      <h4 className="font-rajdhani font-bold text-white text-base leading-snug mb-2">{proj.title}</h4>
                      <p className="font-body text-slate-400 text-xs leading-relaxed mb-4">{proj.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map(t => (
                          <span key={t} className="font-mono-dm text-[9px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Detail (Categorized) */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-rajdhani font-bold text-lg text-cyan-400 mb-6 tracking-wider uppercase">// Detailed Technical Skills</h3>
                <div className="space-y-4">
                  {SKILLS.map(sk => (
                    <div key={sk.category} className="border-b border-white/5 last:border-b-0 pb-3 last:pb-0">
                      <h4 className="font-rajdhani font-bold text-white text-sm mb-2">// {sk.category}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {sk.items.map(item => (
                          <span key={item} className="font-mono-dm text-[10px] text-slate-300 bg-white/5 border border-white/[0.05] px-2.5 py-1 rounded-md">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications and Trainings */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-rajdhani font-bold text-lg text-cyan-400 mb-6 tracking-wider uppercase">// Certifications & Trainings</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {CERTS.map(c => (
                    <div key={c.name} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 flex flex-col justify-between">
                      <div>
                        <span className="font-mono-dm text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded w-fit mb-2 block">{c.year}</span>
                        <h4 className="font-rajdhani font-bold text-white text-sm leading-snug">{c.name}</h4>
                        <p className="font-body text-slate-400 text-xs mt-1">{c.issuer}</p>
                      </div>
                      {c.details && (
                        <p className="font-mono-dm text-[9px] text-slate-600 mt-3 border-t border-white/5 pt-2">{c.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Seminars & Workshops Grid */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-rajdhani font-bold text-lg text-cyan-400 mb-6 tracking-wider uppercase">// Seminars & Workshops Attended</h3>
                <div className="space-y-3 font-body text-slate-300 text-xs">
                  {SEMINARS.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/[0.01] hover:bg-white/[0.03] p-2.5 rounded-lg border border-white/[0.03] transition-colors">
                      <span className="font-mono-dm text-[10px] text-slate-500 mt-0.5">{s.year}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                      <p className="leading-relaxed">{s.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* References Grid */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-rajdhani font-bold text-lg text-cyan-400 mb-6 tracking-wider uppercase">// Character References</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {REFERENCES.map(r => (
                    <div key={r.name} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                      <h4 className="font-rajdhani font-bold text-white text-base leading-none mb-1.5">{r.name}</h4>
                      <p className="font-body text-cyan-400 text-xs font-medium">{r.role}</p>
                      <p className="font-body text-slate-400 text-xs mt-0.5">{r.company}</p>
                      <a href={`tel:${r.phone}`} className="font-mono-dm text-[11px] text-slate-500 hover:text-cyan-400 mt-3 inline-flex items-center gap-1">
                        <Phone size={10} /> {r.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
