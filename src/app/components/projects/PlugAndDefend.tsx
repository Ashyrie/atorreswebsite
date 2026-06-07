import { useState } from "react";
import { X, ArrowRight, Shield, Play, BookOpen, Cpu, Terminal, Download, ChevronRight } from "lucide-react";

import imgHighlight from "@/assets/projects/plug_and_defend/plug_defend_highlight.png";
import videoDemo from "@/assets/PND INITIAL DEMO.mp4";
import pdfManual from "@/assets/PLUG-AND-DEFEND-MANUAL.pdf";

interface PlugAndDefendProps {
  onClose: () => void;
}

export default function PlugAndDefend({ onClose }: PlugAndDefendProps) {
  const [isPdfExpanded, setIsPdfExpanded] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#060b16] text-white overflow-x-hidden flex flex-col relative z-50"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >

      {/* Background Neon Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-cyan-500/[0.04] blur-[130px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[450px] h-[450px] rounded-full bg-blue-600/[0.04] blur-[130px]" />
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

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-6 w-full z-10">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="text-cyan-400" size={20} />
          <span className="font-mono-dm text-xs text-cyan-400/80 tracking-widest uppercase">// Capstone Project Showcase</span>
        </div>
        <h1 className="font-rajdhani text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none">
          Plug and Defend: A Portable Cybersecurity Toolkit
        </h1>
        <p className="font-body text-slate-400 text-sm max-w-2xl mt-3 leading-relaxed">
          A portable cybersecurity scanner and forensic suite equipped with AI-powered analysis, cryptographic evidence signing, and hardware-integrated controls.
        </p>
        <div className="w-14 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-4" />
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 w-full grid lg:grid-cols-2 gap-12 z-10 flex-grow">

        {/* Left Column: Details */}
        <div className="space-y-8">

          {/* Project Overview */}
          <div className="glass rounded-2xl p-8 border border-white/5 space-y-6">
            <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// Project Overview</h3>
            <p className="font-body text-slate-300 text-sm leading-relaxed">
              Designed and built as a final-year IT capstone project, Plug and Defend solves the challenge of performing security auditing in remote, offline, or low-bandwidth environments. While network scanning, port diagnostics, and packet captures are executed completely offline on the portable hardware, the system utilizes an internet connection to connect to the external AI API for threat intelligence interpretation.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Cpu size={20} className="text-cyan-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">AI Analysis Core</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Connects to the external AI API to interpret scan data and output threat summary reports (requires internet connection).</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <Terminal size={20} className="text-blue-400 mb-2" />
                <h4 className="font-rajdhani font-bold text-white text-sm">Offline Scanner</h4>
                <p className="font-body text-[11px] text-slate-400 mt-1 leading-snug">Performs quick sweeps of open ports, services, and diagnostic checks fully offline directly on target endpoints.</p>
              </div>
            </div>
          </div>

          {/* System Features */}
          <div className="glass rounded-2xl p-8 border border-white/5 space-y-4">
            <h3 className="font-rajdhani text-xl font-bold text-white uppercase tracking-wider">// Core Features & Integrations</h3>
            <ul className="space-y-3 font-body text-slate-300 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Shield size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <span><strong>Cryptographic Signature Checks:</strong> Exports PCAP forensics signed with GPG signatures (.sig). Integrates with Gpg4win (Kleopatra) to verify file authenticity and integrity.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <span><strong>Role-Based Access Control:</strong> Distinct account access tiers: <em>Analyst</em> (run scans, trigger AI reports), <em>Auditor</em> (read-only verification, logs check), and <em>Administrator</em> (manage users, config).</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <span><strong>Resume AI Analysis:</strong> Scans run completely offline, but AI threat analysis requires internet connectivity. Users can resume failed AI analyses on the My Scans page once an active internet connection is established.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <span><strong>Chain of Custody Tracking:</strong> A forensic checklist ledger charting progression, verification checklists, and audit events to ensure legal validity.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <span><strong>System Quick Controls:</strong> Dedicated general settings panels enabling administrative reboots, service restarts, and Wi-Fi SSID priority configuration.</span>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="font-rajdhani text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3">// Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {["Python (Forensic Core)", "GPG (File Signatures)", "Raspberry Pi Hardware", "Vite & React (Frontend UI)", "SQLite Database", "Gemini AI API Summary", "PCAP Capture Forensics", "Bash Scripting (Boot Automation)"].map(tech => (
                <span key={tech} className="font-mono-dm text-[11px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: User Manual PDF Viewer & Video Demo */}
        <div className="space-y-8 animate-fade-in">

          {/* PDF Viewer Block */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-rajdhani text-2xl font-bold text-white uppercase tracking-wider">// User Manual Viewer</h3>
              <div className="flex gap-2">
                <a
                  href={pdfManual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-white/10 hover:border-cyan-500/30 bg-[#0a1224]/50 hover:bg-cyan-500/5 text-xs font-semibold font-body text-slate-300 hover:text-cyan-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <BookOpen size={13} /> Open Fullscreen
                </a>
              </div>
            </div>

            {/* PDF Frame Container (Collapsible Landscape-to-Portrait Height) */}
            <div className={`glass rounded-2xl p-1 border border-white/5 bg-slate-950 overflow-hidden shadow-2xl transition-all duration-500 relative ${isPdfExpanded ? 'h-[780px]' : 'h-[320px]'}`}>
              <iframe
                src={`${pdfManual}#view=FitH`}
                className="w-full h-full rounded-xl border-none"
                title="Plug & Defend User Manual"
              />
            </div>

            {/* Expand / Collapse Button */}
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setIsPdfExpanded(!isPdfExpanded)}
                className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-cyan-500/30 bg-[#0a1224]/50 hover:bg-cyan-500/5 text-xs font-semibold font-body text-slate-300 hover:text-cyan-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                {isPdfExpanded ? "Show Less" : "Show More"}
                <ChevronRight className={`transition-transform duration-300 ${isPdfExpanded ? "-rotate-90" : "rotate-90"}`} size={14} />
              </button>
            </div>
          </div>

          {/* Video Demonstration (Landscape Aspect-Video) */}
          <div className="glass rounded-2xl p-8 border border-white/5 space-y-4">
            <h3 className="font-rajdhani text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Play className="text-cyan-400" size={18} /> // Video Demonstration
            </h3>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-950 shadow-lg">
              <video
                src={videoDemo}
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover rounded-xl"
                poster={imgHighlight}
              />
            </div>
            <p className="font-body text-slate-400 text-xs leading-relaxed mt-2">
              A comprehensive visual walk-through showcasing hardware deployment, active network scans, live PCAP analyses, and report signoffs.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
