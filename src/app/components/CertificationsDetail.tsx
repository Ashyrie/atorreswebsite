import { useState } from "react";
import { X, ArrowRight, Award, ChevronLeft, ChevronRight, FileText } from "lucide-react";

// ── Certificate Images ─────────────────────────────────────────────────────────
import imgCisco1 from "@/assets/certifications/Screenshot 2026-06-06 172955.png";
import imgCisco2 from "@/assets/certifications/Screenshot 2026-06-06 173007.png";
import imgTesda from "@/assets/certifications/Screenshot 2026-06-06 173037.png";
import imgGrandstream from "@/assets/certifications/Screenshot 2026-06-06 173227.png";
import imgAlibabaAca from "@/assets/certifications/Screenshot 2026-06-06 173247.png";
import imgQualys1 from "@/assets/certifications/Screenshot 2026-06-06 173306.png";
import imgQualys2 from "@/assets/certifications/Screenshot 2026-06-06 173314.png";
import imgQualys3 from "@/assets/certifications/Screenshot 2026-06-06 173321.png";
import imgAlibabaCloud1 from "@/assets/certifications/Screenshot 2026-06-06 173432.png";
import imgAlibabaCloud2 from "@/assets/certifications/Screenshot 2026-06-06 173442.png";
import imgAlibabaCloud3 from "@/assets/certifications/Screenshot 2026-06-06 173449.png";
import imgAlibabaCloud4 from "@/assets/certifications/Screenshot 2026-06-06 173457.png";
import imgShepp1 from "@/assets/certifications/Screenshot 2026-06-06 173627.png";
import imgShepp2 from "@/assets/certifications/Screenshot 2026-06-06 173640.png";
import imgWordPressIntro from "@/assets/certifications/Screenshot 2026-06-13 193044.png";
import imgWordPressAdv from "@/assets/certifications/Screenshot 2026-06-13 193055.png";

// ── Types ──────────────────────────────────────────────────────────────────────

interface CertItem {
  src: string;
  title: string;
  desc: string;
  date: string;
}

interface CertGroup {
  category: string;
  year: string;
  accentCls: string;
  borderCls: string;
  bgCls: string;
  dotCls: string;
  note?: string;
  certs: CertItem[];
}

// ── Data ───────────────────────────────────────────────────────────────────────

const CERT_GROUPS: CertGroup[] = [
  {
    category: "WordPress Development",
    year: "2026",
    accentCls: "text-pink-400",
    borderCls: "hover:border-pink-500/40 group-hover:border-pink-500/40",
    bgCls: "from-pink-500/20 to-pink-900/10",
    dotCls: "bg-pink-400",
    certs: [
      {
        src: imgWordPressIntro,
        title: "Introduction to WordPress",
        desc: "Completed the Introduction to WordPress course through Simplilearn, covering blogging basics, theme management, content creation, and WordPress dashboard operations.",
        date: "JUN 12, 2026",
      },
      {
        src: imgWordPressAdv,
        title: "Advanced WordPress Development Techniques",
        desc: "Passed the Advanced WordPress Development Techniques certification by Packt through Coursera, focusing on custom plugin development, theme customization, performance optimization, and advanced database integration.",
        date: "JUN 12, 2026",
      },
    ],
  },
  {
    category: "Cisco Networking Academy",
    year: "2026",
    accentCls: "text-sky-400",
    borderCls: "hover:border-sky-500/40 group-hover:border-sky-500/40",
    bgCls: "from-sky-500/20 to-sky-900/10",
    dotCls: "bg-sky-400",
    certs: [
      {
        src: imgCisco2,
        title: "Ethical Hacker",
        desc: "Completed the Ethical Hacker course through Cisco Networking Academy, covering penetration testing techniques, vulnerability assessment, and ethical hacking methodologies.",
        date: "MAR 03, 2026",
      },
      {
        src: imgCisco1,
        title: "Endpoint Security",
        desc: "Completed the Endpoint Security course through Cisco Networking Academy, covering threat detection, endpoint protection strategies, and security policy enforcement.",
        date: "MAR 26, 2026",
      },
    ],
  },
  {
    category: "Microsoft Cybersecurity (TESDA)",
    year: "2026",
    accentCls: "text-blue-400",
    borderCls: "hover:border-blue-500/40 group-hover:border-blue-500/40",
    bgCls: "from-blue-500/20 to-blue-900/10",
    dotCls: "bg-blue-400",
    certs: [
      {
        src: imgTesda,
        title: "Microsoft Cybersecurity Course: Security, Compliance, and Identity Fundamentals",
        desc: "Certificate of Completion issued by TESDA for successfully finishing the Microsoft Cybersecurity course focused on Security, Compliance, and Identity Fundamentals — covering cloud security, compliance frameworks, and identity management.",
        date: "FEB 21, 2026",
      },
    ],
  },
  {
    category: "Alibaba Cloud",
    year: "2025",
    accentCls: "text-orange-400",
    borderCls: "hover:border-orange-500/40 group-hover:border-orange-500/40",
    bgCls: "from-orange-500/20 to-orange-900/10",
    dotCls: "bg-orange-400",
    note: "Additional Alibaba Cloud certifications are available — check my CV for the full list.",
    certs: [
      {
        src: imgAlibabaAca,
        title: "Alibaba Cloud Certified Associate – Business User",
        desc: "Official Alibaba Cloud Certified Associate (ACA) credential for Business User, validating understanding of Alibaba Cloud products and services for business operations. Certificate ID: IACA09250400203630L, valid until April 24, 2027.",
        date: "APR 24, 2025",
      },
      {
        src: imgAlibabaCloud1,
        title: "Cloud Computing Basics",
        desc: "Completed the Alibaba Cloud Academy course on Cloud Computing Basics, covering foundational concepts of cloud architecture, deployment models, and core Alibaba Cloud services.",
        date: "FEB 28, 2025",
      },
      {
        src: imgAlibabaCloud2,
        title: "Compute on the Cloud",
        desc: "Completed the Alibaba Cloud Academy course on Compute on the Cloud, covering elastic computing, ECS instance management, auto-scaling, and load balancing solutions.",
        date: "FEB 28, 2025",
      },
      {
        src: imgAlibabaCloud3,
        title: "Data Management on the Cloud",
        desc: "Completed the Alibaba Cloud Academy course on Data Management on the Cloud, covering database services, data storage solutions, and cloud-based data management best practices.",
        date: "FEB 28, 2025",
      },
      {
        src: imgAlibabaCloud4,
        title: "Networking on the Cloud",
        desc: "Completed the Alibaba Cloud Academy course on Networking on the Cloud, covering Virtual Private Cloud (VPC), routing, network security groups, and cloud connectivity solutions.",
        date: "FEB 28, 2025",
      },
    ],
  },
  {
    category: "QUALYS Certified Specialist",
    year: "2025",
    accentCls: "text-emerald-400",
    borderCls: "hover:border-emerald-500/40 group-hover:border-emerald-500/40",
    bgCls: "from-emerald-500/20 to-emerald-900/10",
    dotCls: "bg-emerald-400",
    certs: [
      {
        src: imgQualys1,
        title: "Endpoint Detection and Response",
        desc: "Passed the Qualys certification exam for Endpoint Detection and Response, demonstrating ability to deploy and manage Qualys Cloud Platform solutions for endpoint threat detection and incident response.",
        date: "NOV 20, 2025",
      },
      {
        src: imgQualys2,
        title: "CyberSecurity Asset Management",
        desc: "Passed the Qualys certification exam for CyberSecurity Asset Management, covering asset inventory, risk prioritization, and continuous monitoring of IT infrastructure.",
        date: "NOV 20, 2025",
      },
      {
        src: imgQualys3,
        title: "PCI Compliance",
        desc: "Passed the Qualys certification exam for PCI Compliance, demonstrating knowledge of Payment Card Industry standards, compliance scanning, and remediation workflows.",
        date: "NOV 20, 2025",
      },
    ],
  },
  {
    category: "Grandstream Certified Specialist",
    year: "2025",
    accentCls: "text-amber-400",
    borderCls: "hover:border-amber-500/40 group-hover:border-amber-500/40",
    bgCls: "from-amber-500/20 to-amber-900/10",
    dotCls: "bg-amber-400",
    certs: [
      {
        src: imgGrandstream,
        title: "Grandstream Certified Specialist – UC Solution",
        desc: "Certified as a Grandstream Specialist in Unified Communications (UC) Solution, validating knowledge in VoIP systems, IP PBX configuration, and UC deployment best practices.",
        date: "MAR 13, 2025",
      },
    ],
  },
  {
    category: "SHE++ by PhilDev & Alibaba Cloud",
    year: "2025",
    accentCls: "text-violet-400",
    borderCls: "hover:border-violet-500/40 group-hover:border-violet-500/40",
    bgCls: "from-violet-500/20 to-violet-900/10",
    dotCls: "bg-violet-400",
    certs: [
      {
        src: imgShepp1,
        title: "SHE++ Masterclass on Alibaba Cloud System",
        desc: "Certificate of Completion from PhilDev S&T Development Foundation and Alibaba Cloud Philippines for active participation in the SHE++ Masterclass on Alibaba Cloud System — an 8-hour program held at the University of Makati.",
        date: "FEB 28, 2025",
      },
      {
        src: imgShepp2,
        title: "SHE++ Workshop on Leadership and Technopreneurial Mindset",
        desc: "Certificate of Participation from the SHE++ Empowerment Program for Women in Tech, for completing the Workshop on Leadership and Technopreneurial Mindset — an 8-hour session held at the University of Makati.",
        date: "FEB 05 & 07, 2025",
      },
    ],
  },
];

// ── Props ──────────────────────────────────────────────────────────────────────

interface CertificationsDetailProps {
  onClose: () => void;
  initialGroupIdx?: number;
  initialCertIdx?: number;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CertificationsDetail({
  onClose,
  initialGroupIdx,
  initialCertIdx = 0,
}: CertificationsDetailProps) {
  const [lightbox, setLightbox] = useState<{ groupIdx: number; certIdx: number } | null>(
    initialGroupIdx !== undefined
      ? { groupIdx: initialGroupIdx, certIdx: initialCertIdx }
      : null
  );

  const currentGroup = lightbox !== null ? CERT_GROUPS[lightbox.groupIdx] : null;
  const currentCert = lightbox !== null ? currentGroup!.certs[lightbox.certIdx] : null;
  const totalInGroup = currentGroup?.certs.length ?? 0;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightbox === null) return;
    const prevIdx = (lightbox.certIdx - 1 + totalInGroup) % totalInGroup;
    setLightbox({ ...lightbox, certIdx: prevIdx });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightbox === null) return;
    const nextIdx = (lightbox.certIdx + 1) % totalInGroup;
    setLightbox({ ...lightbox, certIdx: nextIdx });
  };

  return (
    <div
      className="min-h-screen bg-[#060b16] text-white overflow-x-hidden flex flex-col relative z-50"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >

      {/* Hidden SVG Sharpening Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="sharpen-cert">
          <feConvolveMatrix
            order="3"
            preserveAlpha="true"
            kernelMatrix="0 -0.35 0 -0.35 2.4 -0.35 0 -0.35 0"
          />
        </filter>
      </svg>

      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] left-[15%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-[15%] right-[18%] w-[420px] h-[420px] rounded-full bg-violet-600/[0.04] blur-[120px]" />
        <div className="absolute top-[50%] right-[35%] w-[300px] h-[300px] rounded-full bg-blue-600/[0.03] blur-[100px]" />
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

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-6 w-full z-10">
        <div className="flex items-center gap-3 mb-2">
          <Award className="text-cyan-400" size={20} />
          <span className="font-mono-dm text-xs text-cyan-400/80 tracking-widest uppercase">// Certifications Gallery</span>
        </div>
        <h1 className="font-rajdhani text-4xl lg:text-5xl font-bold text-white tracking-tight">
          My Certificates
        </h1>
        <p className="font-body text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
          A detailed view of all professional certificates earned across cybersecurity, cloud computing, networking, and technology leadership programs — grouped by issuing organization.
        </p>
        <div className="w-14 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-4" />
      </div>

      {/* Certification Groups */}
      <div className="max-w-7xl mx-auto px-6 pb-24 w-full z-10 space-y-16 flex-grow">
        {CERT_GROUPS.map((group, gIdx) => (
          <div key={group.category}>

            {/* Group Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-3 h-3 rounded-full ${group.dotCls} flex-shrink-0 shadow-[0_0_8px_currentColor]`} />
              <div className="flex-grow">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h2 className={`font-rajdhani text-2xl font-bold ${group.accentCls}`}>
                    {group.category}
                  </h2>
                  <span className={`font-mono-dm text-[10px] ${group.accentCls} bg-white/5 border border-white/10 px-2.5 py-1 rounded-full`}>
                    {group.year}
                  </span>
                  <span className="font-mono-dm text-[10px] text-slate-600">
                    {group.certs.length} certificate{group.certs.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* "More in CV" Note */}
            {group.note && (
              <div className="flex items-start gap-3 mb-5 glass rounded-xl px-5 py-3.5 border border-orange-500/15 bg-orange-500/[0.04]">
                <FileText size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="font-body text-xs text-orange-300/80 leading-relaxed">
                  <span className="font-semibold text-orange-400">Note: </span>
                  {group.note}
                </p>
              </div>
            )}

            {/* Certificate Cards Grid */}
            <div className={`grid gap-5 ${group.certs.length === 1 ? "md:grid-cols-1 max-w-xl" : group.certs.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
              {group.certs.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  onClick={() => setLightbox({ groupIdx: gIdx, certIdx: cIdx })}
                  className={`group relative p-[1px] bg-white/5 hover:bg-gradient-to-r hover:from-${group.dotCls.replace("bg-", "")}/30 rounded-2xl transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.02)] hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]`}
                >
                  {/* Card Glow Wrapper */}
                  <div className={`w-full h-full glass rounded-[15px] overflow-hidden flex flex-col group ${group.borderCls} transition-all duration-300`}>

                    {/* Image */}
                    <div className="h-52 bg-slate-950 relative overflow-hidden flex items-center justify-center select-none">
                      <img
                        src={cert.src}
                        alt={cert.title}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        style={{
                          imageRendering: "auto",
                          filter: "url(#sharpen-cert) contrast(1.06) brightness(1.02) saturate(1.04)",
                          WebkitTouchCallout: "none",
                          pointerEvents: "none",
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Watermark overlay – always visible, blocks interaction */}
                      <div
                        className="absolute inset-0 flex items-end justify-end p-3 pointer-events-none select-none"
                        style={{ userSelect: "none", WebkitUserSelect: "none" }}
                      >
                        <span
                          className="font-mono-dm text-[8px] text-white/25 tracking-widest uppercase"
                          style={{ textShadow: "0 0 4px rgba(0,0,0,0.6)" }}
                        >
                          © Ailene Torres
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#060b16]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className={`font-body text-xs font-semibold ${group.accentCls.replace("text-", "bg-").replace("400", "500/90")} text-white px-4 py-2 rounded-xl shadow-lg border border-white/10 tracking-wider`}>
                          View Only
                        </span>
                      </div>

                      {/* Date badge */}
                      <span className={`absolute bottom-3 left-3 font-mono-dm text-[9px] ${group.accentCls} bg-[#060b16]/85 border border-white/10 px-2.5 py-1 rounded shadow-lg uppercase tracking-wider`}>
                        {cert.date}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-grow flex flex-col justify-between bg-[#0a1224]/30 border-t border-white/[0.03]">
                      <div>
                        <h3 className={`font-rajdhani text-[15px] font-bold text-white mb-2 leading-snug group-hover:${group.accentCls} transition-colors`}>
                          {cert.title}
                        </h3>
                        <p className="font-body text-slate-500 text-xs leading-relaxed">
                          {cert.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Separator */}
            {gIdx < CERT_GROUPS.length - 1 && (
              <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && currentCert && currentGroup && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/96 z-[999] flex flex-col justify-between p-6 animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full z-10">
            <span className="font-mono-dm text-xs text-slate-500 uppercase tracking-wider">
              {currentGroup.category} · {lightbox.certIdx + 1} / {totalInGroup}
            </span>
            <button
              onClick={() => setLightbox(null)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Center: Image + Navigation */}
          <div className="relative flex items-center justify-center flex-grow py-4 select-none">
            <div className={`absolute w-[60vw] h-[55vh] rounded-full ${currentGroup.bgCls.replace("from-", "bg-").split(" ")[0]}/10 blur-[130px] pointer-events-none`} />

            {totalInGroup > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 lg:left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer z-10 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Cert image wrapper – blocks all save/copy actions */}
            <div
              className="relative z-10 select-none"
              onContextMenu={(e) => e.preventDefault()}
              style={{ userSelect: "none", WebkitUserSelect: "none" }}
            >
              <img
                src={currentCert.src}
                alt={currentCert.title}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onClick={(e) => e.stopPropagation()}
                style={{
                  imageRendering: "auto",
                  filter: "url(#sharpen-cert) contrast(1.06) brightness(1.02) saturate(1.04)",
                  WebkitTouchCallout: "none",
                  pointerEvents: "none",
                }}
                className="max-h-[68vh] max-w-[88vw] lg:max-w-[72vw] object-contain rounded-lg shadow-2xl border border-white/5"
              />
              {/* Lightbox watermark */}
              <div
                className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none select-none"
                style={{ userSelect: "none" }}
              >
                <span
                  className="font-mono-dm text-[9px] text-white/20 tracking-[0.25em] uppercase"
                  style={{ textShadow: "0 0 6px rgba(0,0,0,0.8)" }}
                >
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
              {currentCert.title}
            </h2>
            <p className="font-body text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
              {currentCert.desc}
            </p>
            {totalInGroup > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {currentGroup.certs.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightbox({ groupIdx: lightbox.groupIdx, certIdx: i }); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === lightbox.certIdx ? `${currentGroup.dotCls} w-4` : "bg-white/20 hover:bg-white/40"}`}
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
