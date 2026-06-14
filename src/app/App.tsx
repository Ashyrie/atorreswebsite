import { useState, useEffect, useRef, useMemo } from "react";
import {
  Mail, Phone, ExternalLink, ArrowRight, Github, Linkedin,
  Menu, X, Cpu, Download, Trophy, Layers, Star,
  Award, ChevronRight, CheckCircle, Globe, Camera, Eye,
  Facebook, MessageCircle, Shield, Wifi, Code2, Wrench
} from "lucide-react";
import profileImg from "@/assets/profile_professional.png";
import resumePdf from "@/assets/A.TORRES_CV.pdf";
import { SKILLS, PROJECTS, CERTS, AWARDS } from "./data";
import ResumePage from "./components/ResumePage";
import InternshipPhotos from "./components/InternshipPhotos";
import CertificationsDetail from "./components/CertificationsDetail";
import RecognitionsDetail from "./components/RecognitionsDetail";
import PlugAndDefend from "./components/projects/PlugAndDefend";
import FlagCityProperties from "./components/projects/FlagCityProperties";
import DeltechSystem from "./components/projects/DeltechSystem";
import NexerPlatform from "./components/projects/NexerPlatform";
import FCPIPosters from "./components/projects/FCPIPosters";
import ParticleCanvas from "./components/ui/ParticleCanvas";
import GlitchText from "./components/ui/GlitchText";

import qrCall from "@/assets/qr/call.jpg";
import qrFacebook from "@/assets/qr/facebook.jpg";
import qrGmail from "@/assets/qr/gmail.jpg";
import qrLinkedin from "@/assets/qr/linkedin.jpg";
import qrViber from "@/assets/qr/viber.jpg";

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

function useTypewriter(words: string[], speed = 78, pause = 2300) {
  const [text, setText] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pausing, setPausing] = useState(false);
  const wsRef = useRef(words);

  useEffect(() => {
    if (pausing) return;
    const ws = wsRef.current;
    const word = ws[wIdx];
    if (!deleting && cIdx === word.length) {
      setPausing(true);
      const t = setTimeout(() => { setDeleting(true); setPausing(false); }, pause);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, cIdx + 1));
        setCIdx(c => c + 1);
      } else if (cIdx > 0) {
        setText(word.slice(0, cIdx - 1));
        setCIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWIdx(w => (w + 1) % ws.length);
      }
    }, deleting ? 38 : speed);
    return () => clearTimeout(t);
  }, [cIdx, deleting, wIdx, speed, pause, pausing]);

  return text;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AnimatedSection({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView();
  return (
    <div id={id} ref={ref} className={`pf-fade ${inView ? "pf-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="font-mono-dm text-xs text-cyan-400/60 tracking-[0.2em] uppercase mb-3">// {label}</p>
      <h2 className="font-rajdhani text-4xl lg:text-5xl font-bold text-white leading-none">{title}</h2>
      <div className="w-14 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-4" />
    </div>
  );
}

function getThemeByCls(cls: string) {
  const clean = (cls || "").replace("text-", "").split("-")[0];
  switch (clean) {
    case "cyan":
      return {
        color1: "#06b6d4",
        color2: "#3b82f6",
        glow: "rgba(6, 182, 212, 0.25)",
        neonClass: "hover-neon-sec"
      };
    case "blue":
      return {
        color1: "#3b82f6",
        color2: "#06b6d4",
        glow: "rgba(59, 130, 246, 0.25)",
        neonClass: "hover-neon-net"
      };
    case "sky":
      return {
        color1: "#0ea5e9",
        color2: "#2563eb",
        glow: "rgba(14, 165, 233, 0.25)",
        neonClass: "hover-neon-tools"
      };
    case "violet":
    case "purple":
      return {
        color1: "#8b5cf6",
        color2: "#d946ef",
        glow: "rgba(139, 92, 246, 0.25)",
        neonClass: "hover-neon-dev"
      };
    case "pink":
    case "fuchsia":
    case "rose":
      return {
        color1: "#ec4899",
        color2: "#f43f5e",
        glow: "rgba(236, 72, 153, 0.25)",
        neonClass: "hover-neon-ui"
      };
    case "emerald":
    case "teal":
    case "green":
      return {
        color1: "#10b981",
        color2: "#14b8a6",
        glow: "rgba(16, 185, 129, 0.25)",
        neonClass: "hover-neon-db"
      };
    case "amber":
    case "orange":
    case "yellow":
      return {
        color1: "#f59e0b",
        color2: "#f97316",
        glow: "rgba(245, 158, 11, 0.25)",
        neonClass: "hover-neon-sup"
      };
    default:
      return {
        color1: "#ffffff",
        color2: "#cccccc",
        glow: "rgba(255, 255, 255, 0.1)",
        neonClass: ""
      };
  }
}

const SOCIAL_QRS = [
  {
    name: "Facebook",
    icon: Facebook,
    qr: qrFacebook,
    href: "https://www.facebook.com/",
    pillCls: "text-[#1877F2] bg-[#1877F2]/10 border-[#1877F2]/20",
    borderCls: "border-white/5 hover:border-[#1877F2]/40 hover:shadow-[#1877F2]/10 hover-neon-fb",
    qrBorderCls: "border-[#1877F2]/30 group-hover:border-[#1877F2]",
    glowColor: "rgba(24,119,242,0.12)",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    qr: qrLinkedin,
    href: "https://www.linkedin.com/in/ailene-torres-2300302a5/",
    pillCls: "text-[#0A66C2] bg-[#0A66C2]/10 border-[#0A66C2]/20",
    borderCls: "border-white/5 hover:border-[#0A66C2]/40 hover:shadow-[#0A66C2]/10 hover-neon-li",
    qrBorderCls: "border-[#0A66C2]/30 group-hover:border-[#0A66C2]",
    glowColor: "rgba(10,102,194,0.12)",
  },
  {
    name: "Viber",
    icon: MessageCircle,
    qr: qrViber,
    href: "viber://chat?number=%2B639559880972",
    pillCls: "text-[#7360F2] bg-[#7360F2]/10 border-[#7360F2]/20",
    borderCls: "border-white/5 hover:border-[#7360F2]/40 hover:shadow-[#7360F2]/10 hover-neon-vb",
    qrBorderCls: "border-[#7360F2]/30 group-hover:border-[#7360F2]",
    glowColor: "rgba(115,96,242,0.12)",
  },
  {
    name: "Gmail",
    icon: Mail,
    qr: qrGmail,
    href: "mailto:torresailene25@gmail.com",
    pillCls: "text-[#EA4335] bg-[#EA4335]/10 border-[#EA4335]/20",
    borderCls: "border-white/5 hover:border-[#EA4335]/40 hover:shadow-[#EA4335]/10 hover-neon-gm",
    qrBorderCls: "border-[#EA4335]/30 group-hover:border-[#EA4335]",
    glowColor: "rgba(234,67,53,0.12)",
  },
  {
    name: "Call",
    icon: Phone,
    qr: qrCall,
    href: "tel:+639559880972",
    pillCls: "text-[#34A853] bg-[#34A853]/10 border-[#34A853]/20",
    borderCls: "border-white/5 hover:border-[#34A853]/40 hover:shadow-[#34A853]/10 hover-neon-cl",
    qrBorderCls: "border-[#34A853]/30 group-hover:border-[#34A853]",
    glowColor: "rgba(52,168,83,0.12)",
  },
];

const HERO_TAGS = [
  { label: "Cybersecurity", icon: Shield, color: "#06b6d4", cls: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]" },
  { label: "Network Security", icon: Wifi, color: "#3b82f6", cls: "text-blue-400 border-blue-400/20 bg-blue-400/5 hover:border-blue-400/50 hover:bg-blue-400/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]" },
  { label: "Web Development", icon: Code2, color: "#8b5cf6", cls: "text-violet-400 border-violet-400/20 bg-violet-400/5 hover:border-violet-400/50 hover:bg-violet-400/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]" },
  { label: "IT Support", icon: Wrench, color: "#f59e0b", cls: "text-amber-400 border-amber-400/20 bg-amber-400/5 hover:border-amber-400/50 hover:bg-amber-400/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]" },
  { label: "Troubleshooting", icon: Cpu, color: "#10b981", cls: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]" },
];

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showCertDetail, setShowCertDetail] = useState<number | null>(null);
  const [showRecogDetail, setShowRecogDetail] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const heroTitle = useTypewriter(
    ["Aspiring IT Professional", "Full-Stack Web Developer", "Network Engineer", "IT Problem Solver"],
    76, 2300
  );
  const greeting = useMemo(() => { const h = new Date().getHours(); if (h < 12) return "Good Morning"; else if (h < 18) return "Good Afternoon"; else return "Good Evening"; }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    (window as any).goToLandingPage = () => {
      setShowResume(false);
      setShowPhotos(false);
      setShowCertDetail(null);
      setShowRecogDetail(null);
      setActiveProject(null);
      setTimeout(() => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    };
    return () => {
      window.removeEventListener("scroll", fn);
      delete (window as any).goToLandingPage;
    };
  }, []);

  useEffect(() => {
    if (showResume) {
      document.title = "A. Torres | Resume";
    } else if (showPhotos) {
      document.title = "A. Torres | Internship Documentation";
    } else if (showCertDetail !== null) {
      document.title = "A. Torres | Certification Details";
    } else if (showRecogDetail !== null) {
      document.title = "A. Torres | Recognition Details";
    } else if (activeProject !== null) {
      document.title = `A. Torres | ${activeProject}`;
    }
  }, [showResume, showPhotos, showCertDetail, showRecogDetail, activeProject]);

  useEffect(() => {
    if (showResume || showPhotos || showCertDetail !== null || showRecogDetail !== null || activeProject !== null) {
      return;
    }

    const sections = ["hero", "about", "skills", "experience", "projects", "certifications", "awards", "contact"];
    const sectionTitles: { [key: string]: string } = {
      hero: "A. Torres | Website Portfolio",
      about: "A. Torres | About Me",
      skills: "A. Torres | Technical Expertise",
      experience: "A. Torres | Work Experience",
      projects: "A. Torres | Featured Projects",
      certifications: "A. Torres | Certifications",
      awards: "A. Torres | Recognition",
      contact: "A. Torres | Get In Touch",
    };

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (sectionTitles[id]) {
            document.title = sectionTitles[id];
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showResume, showPhotos, showCertDetail, showRecogDetail, activeProject]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const navLinks = ["About", "Skills", "Experience", "Projects", "Certifications", "Contact"];

  if (showResume) {
    return (
      <ResumePage
        onClose={() => {
          setShowResume(false);
          setTimeout(() => {
            document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
        resumePdf={resumePdf}
        profileImg={profileImg}
      />
    );
  }

  if (showPhotos) {
    return (
      <InternshipPhotos
        onClose={() => {
          setShowPhotos(false);
          setTimeout(() => {
            document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
      />
    );
  }

  if (showCertDetail !== null) {
    return (
      <CertificationsDetail
        onClose={() => {
          setShowCertDetail(null);
          setTimeout(() => {
            document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
        initialGroupIdx={showCertDetail}
      />
    );
  }

  if (showRecogDetail !== null) {
    return (
      <RecognitionsDetail
        onClose={() => {
          setShowRecogDetail(null);
          setTimeout(() => {
            document.getElementById("awards")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
        initialGroupIdx={showRecogDetail}
      />
    );
  }

  if (activeProject === "Plug and Defend: A Portable Cybersecurity Toolkit") {
    return (
      <PlugAndDefend
        onClose={() => {
          setActiveProject(null);
          setTimeout(() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
      />
    );
  }

  if (activeProject === "Flag City Properties, Inc. Website") {
    return (
      <FlagCityProperties
        onClose={() => {
          setActiveProject(null);
          setTimeout(() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
      />
    );
  }

  if (activeProject === "FCPI Holiday Observance Posters") {
    return (
      <FCPIPosters
        onClose={() => {
          setActiveProject(null);
          setTimeout(() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
      />
    );
  }

  if (activeProject === "Deltech Integrated Reservation & Client Management System") {
    return (
      <DeltechSystem
        onClose={() => {
          setActiveProject(null);
          setTimeout(() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
      />
    );
  }

  if (activeProject === "Nexer: A Netflix Inspired Streaming Platform") {
    return (
      <NexerPlatform
        onClose={() => {
          setActiveProject(null);
          setTimeout(() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }}
      />
    );
  }

  const getSkillColors = (cat: string) => {
    switch (cat) {
      case "Networking":
        return {
          color1: "#3b82f6", // blue-500
          color2: "#06b6d4", // cyan-500
          glow: "rgba(59, 130, 246, 0.25)",
          glowHex: "#3b82f6",
          textCls: "text-blue-400",
          pillCls: "hover:text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/30",
          neonClass: "hover-neon-net"
        };
      case "Cybersecurity":
        return {
          color1: "#06b6d4", // cyan-500
          color2: "#3b82f6", // blue-500
          glow: "rgba(6, 182, 212, 0.25)",
          glowHex: "#06b6d4",
          textCls: "text-cyan-400",
          pillCls: "hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/30",
          neonClass: "hover-neon-sec"
        };
      case "Programming & Dev":
        return {
          color1: "#8b5cf6", // violet-500
          color2: "#d946ef", // purple-500
          glow: "rgba(139, 92, 246, 0.25)",
          glowHex: "#8b5cf6",
          textCls: "text-violet-400",
          pillCls: "hover:text-violet-300 hover:bg-violet-500/10 hover:border-violet-400/30",
          neonClass: "hover-neon-dev"
        };
      case "Database Management":
        return {
          color1: "#10b981", // emerald-500
          color2: "#14b8a6", // teal-500
          glow: "rgba(16, 185, 129, 0.25)",
          glowHex: "#10b981",
          textCls: "text-emerald-400",
          pillCls: "hover:text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400/30",
          neonClass: "hover-neon-db"
        };
      case "Web Design & UI/UX":
        return {
          color1: "#ec4899", // pink-500
          color2: "#f43f5e", // rose-500
          glow: "rgba(236, 72, 153, 0.25)",
          glowHex: "#ec4899",
          textCls: "text-pink-400",
          pillCls: "hover:text-pink-300 hover:bg-pink-500/10 hover:border-pink-400/30",
          neonClass: "hover-neon-ui"
        };
      case "Technical Support":
        return {
          color1: "#f59e0b", // amber-500
          color2: "#f97316", // orange-500
          glow: "rgba(245, 158, 11, 0.25)",
          glowHex: "#f59e0b",
          textCls: "text-amber-400",
          pillCls: "hover:text-amber-300 hover:bg-amber-500/10 hover:border-amber-400/30",
          neonClass: "hover-neon-sup"
        };
      case "Tools & Tech":
        return {
          color1: "#0ea5e9", // sky-500
          color2: "#2563eb", // blue-600
          glow: "rgba(14, 165, 233, 0.25)",
          glowHex: "#0ea5e9",
          textCls: "text-sky-400",
          pillCls: "hover:text-sky-300 hover:bg-sky-500/10 hover:border-sky-400/30",
          neonClass: "hover-neon-tools"
        };
      default:
        return {
          color1: "#ffffff",
          color2: "#cccccc",
          glow: "rgba(255, 255, 255, 0.1)",
          glowHex: "#ffffff",
          textCls: "text-white",
          pillCls: "hover:bg-white/10 hover:text-white",
          neonClass: ""
        };
    }
  };

  const getSkillProficiency = (cat: string) => {
    switch (cat) {
      case "Networking": return { val: 90, status: "Secure & Routed" };
      case "Cybersecurity": return { val: 85, status: "Hardened Shield" };
      case "Programming & Dev": return { val: 80, status: "Clean & Code-ready" };
      case "Database Management": return { val: 75, status: "Indexed & Scalable" };
      case "Web Design & UI/UX": return { val: 85, status: "Fluid & Responsive" };
      case "Technical Support": return { val: 95, status: "Optimal Operations" };
      case "Tools & Tech": return { val: 90, status: "Efficient Dev Workflow" };
      default: return { val: 80, status: "Active" };
    }
  };

  const getTagHoverCls = (cat: string) => {
    return getSkillColors(cat).pillCls;
  };

  return (
    <div className="min-h-screen bg-[#060b16] text-white overflow-x-hidden">

      {/* ── Global Styles ── */}
      <style>{`
        @keyframes pf-float  { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
        @keyframes pf-float2 { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-7px)}  }
        @keyframes pf-float3 { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-13px)} }
        @keyframes pf-glow   { 0%,100%{box-shadow:0 0 22px rgba(6,182,212,.22)} 50%{box-shadow:0 0 55px rgba(6,182,212,.55),0 0 110px rgba(6,182,212,.14)} }
        @keyframes pf-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pf-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes btn-shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes scan-line {
          0% { top: 0%; opacity: 0.2; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0.2; }
        }
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        @keyframes timeline-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -135; }
        }
        .pf-float  { animation: pf-float  4s ease-in-out infinite; }
        .pf-float2 { animation: pf-float2 5.5s ease-in-out infinite 1.2s; }
        .pf-float3 { animation: pf-float3 6s ease-in-out infinite 2.8s; }
        .pf-glow   { animation: pf-glow   3s ease-in-out infinite; }
        .pf-spin   { animation: pf-spin   28s linear infinite; }
        .pf-spin-reverse { animation: pf-spin 34s linear infinite reverse; }
        .pf-spin-slow { animation: pf-spin   14s linear infinite; }
        .pf-cursor { display:inline-block; width:2px; height:1.05em; background:#0ea5e9; margin-left:2px; vertical-align:middle; animation:pf-blink 1s step-end infinite; }
        .btn-shine-effect {
          position: relative;
          overflow: hidden;
        }
        .btn-shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: btn-shine 4s ease-in-out infinite;
        }
        .pf-fade { opacity:0; transform:translateY(22px); transition:opacity .75s ease, transform .75s ease; }
        .pf-visible { opacity:1!important; transform:translateY(0)!important; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-mono-dm  { font-family: 'DM Mono', monospace; }
        .font-body     { font-family: 'DM Sans', system-ui, sans-serif; }
        .glow-text { transition: text-shadow 0.3s ease, color 0.3s ease; }
        .glow-text:hover { color: #fff; text-shadow: 0 0 10px rgba(6, 182, 212, 0.6), 0 0 20px rgba(6, 182, 212, 0.4), 0 0 30px rgba(6, 182, 212, 0.2); }
        .glass { background:rgba(10,18,36,.65); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,.07); }
        .glass-nav { background:rgba(6,11,22,.88); backdrop-filter:blur(24px); border-bottom:1px solid rgba(255,255,255,.06); }
        .grad-blue { background:linear-gradient(135deg,#38bdf8,#0ea5e9,#06b6d4); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .grad-gold { background:linear-gradient(135deg,#f59e0b,#fbbf24); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .btn-blue { background:linear-gradient(135deg,#0ea5e9,#0284c7); transition:all .25s ease; }
        .btn-blue:hover { background:linear-gradient(135deg,#38bdf8,#0ea5e9); box-shadow:0 8px 30px rgba(14,165,233,.4); transform:translateY(-2px); }
        .card-lift { transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .card-lift:hover { transform:translateY(-4px); }
        .grid-dots { background-image:linear-gradient(rgba(14,165,233,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,.045) 1px,transparent 1px); background-size:54px 54px; }
        .section-rule { height:1px; background:linear-gradient(to right,transparent,rgba(14,165,233,.2),transparent); }
        ::-webkit-scrollbar { display:none; }
        html { scrollbar-width:none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Contact QR Card Glow and Sweep Effects */
        @keyframes qr-shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .qr-shine-effect {
          position: relative;
          overflow: hidden;
        }
        .qr-shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          transition: none;
        }
        .group:hover .qr-shine-effect::after {
          animation: qr-shine 1.6s ease-in-out infinite;
        }
        
        @keyframes neon-fb {
          0%, 100% { border-color: rgba(24,119,242,0.2); box-shadow: 0 4px 20px rgba(24,119,242,0.05); }
          50% { border-color: rgba(24,119,242,0.6); box-shadow: 0 4px 25px rgba(24,119,242,0.25), 0 0 10px rgba(24,119,242,0.1); }
        }
        @keyframes neon-li {
          0%, 100% { border-color: rgba(10,102,194,0.2); box-shadow: 0 4px 20px rgba(10,102,194,0.05); }
          50% { border-color: rgba(10,102,194,0.6); box-shadow: 0 4px 25px rgba(10,102,194,0.25), 0 0 10px rgba(10,102,194,0.1); }
        }
        @keyframes neon-vb {
          0%, 100% { border-color: rgba(115,96,242,0.2); box-shadow: 0 4px 20px rgba(115,96,242,0.05); }
          50% { border-color: rgba(115,96,242,0.6); box-shadow: 0 4px 25px rgba(115,96,242,0.25), 0 0 10px rgba(115,96,242,0.1); }
        }
        @keyframes neon-gm {
          0%, 100% { border-color: rgba(234,67,53,0.2); box-shadow: 0 4px 20px rgba(234,67,53,0.05); }
          50% { border-color: rgba(234,67,53,0.6); box-shadow: 0 4px 25px rgba(234,67,53,0.25), 0 0 10px rgba(234,67,53,0.1); }
        }
        @keyframes neon-cl {
          0%, 100% { border-color: rgba(52,168,83,0.2); box-shadow: 0 4px 20px rgba(52,168,83,0.05); }
          50% { border-color: rgba(52,168,83,0.6); box-shadow: 0 4px 25px rgba(52,168,83,0.25), 0 0 10px rgba(52,168,83,0.1); }
        }
        .hover-neon-fb:hover { animation: neon-fb 2.5s ease-in-out infinite; }
        .hover-neon-li:hover { animation: neon-li 2.5s ease-in-out infinite; }
        .hover-neon-vb:hover { animation: neon-vb 2.5s ease-in-out infinite; }
        .hover-neon-gm:hover { animation: neon-gm 2.5s ease-in-out infinite; }
        .hover-neon-cl:hover { animation: neon-cl 2.5s ease-in-out infinite; }

        /* Technical Expertise Custom Neon Animations */
        @keyframes neon-net {
          0%, 100% { border-color: rgba(59,130,246,0.15); box-shadow: 0 4px 20px rgba(59,130,246,0.03); }
          50% { border-color: rgba(59,130,246,0.55); box-shadow: 0 8px 30px rgba(59,130,246,0.22), 0 0 12px rgba(59,130,246,0.15); }
        }
        @keyframes neon-sec {
          0%, 100% { border-color: rgba(6,182,212,0.15); box-shadow: 0 4px 20px rgba(6,182,212,0.03); }
          50% { border-color: rgba(6,182,212,0.55); box-shadow: 0 8px 30px rgba(6,182,212,0.22), 0 0 12px rgba(6,182,212,0.15); }
        }
        @keyframes neon-dev {
          0%, 100% { border-color: rgba(139,92,246,0.15); box-shadow: 0 4px 20px rgba(139,92,246,0.03); }
          50% { border-color: rgba(139,92,246,0.55); box-shadow: 0 8px 30px rgba(139,92,246,0.22), 0 0 12px rgba(139,92,246,0.15); }
        }
        @keyframes neon-db {
          0%, 100% { border-color: rgba(16,185,129,0.15); box-shadow: 0 4px 20px rgba(16,185,129,0.03); }
          50% { border-color: rgba(16,185,129,0.55); box-shadow: 0 8px 30px rgba(16,185,129,0.22), 0 0 12px rgba(16,185,129,0.15); }
        }
        @keyframes neon-ui {
          0%, 100% { border-color: rgba(236,72,153,0.15); box-shadow: 0 4px 20px rgba(236,72,153,0.03); }
          50% { border-color: rgba(236,72,153,0.55); box-shadow: 0 8px 30px rgba(236,72,153,0.22), 0 0 12px rgba(236,72,153,0.15); }
        }
        @keyframes neon-sup {
          0%, 100% { border-color: rgba(245,158,11,0.15); box-shadow: 0 4px 20px rgba(245,158,11,0.03); }
          50% { border-color: rgba(245,158,11,0.55); box-shadow: 0 8px 30px rgba(245,158,11,0.22), 0 0 12px rgba(245,158,11,0.15); }
        }
        @keyframes neon-tools {
          0%, 100% { border-color: rgba(14,165,233,0.15); box-shadow: 0 4px 20px rgba(14,165,233,0.03); }
          50% { border-color: rgba(14,165,233,0.55); box-shadow: 0 8px 30px rgba(14,165,233,0.22), 0 0 12px rgba(14,165,233,0.15); }
        }
        
        .hover-neon-net:hover { animation: neon-net 2.5s ease-in-out infinite; }
        .hover-neon-sec:hover { animation: neon-sec 2.5s ease-in-out infinite; }
        .hover-neon-dev:hover { animation: neon-dev 2.5s ease-in-out infinite; }
        .hover-neon-db:hover  { animation: neon-db 2.5s ease-in-out infinite; }
        .hover-neon-ui:hover  { animation: neon-ui 2.5s ease-in-out infinite; }
        .hover-neon-sup:hover { animation: neon-sup 2.5s ease-in-out infinite; }
        .hover-neon-tools:hover { animation: neon-tools 2.5s ease-in-out infinite; }
        
        .card-grid-dots {
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 8px 8px;
        }

        .prof-bar {
          width: 0%;
          transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover .prof-bar {
          width: var(--prof-val);
        }

      `}</style>

      {/* ══════════════════════════════ NAV ══════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav py-3" : "py-5 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono-dm text-base font-medium select-none flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <span className="text-cyan-400">{"<"}</span>
            <span className="text-white mx-0.5">AT</span>
            <span className="text-cyan-400">{"/>"}</span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(lnk => (
              <button
                key={lnk}
                onClick={() => scrollTo(lnk.toLowerCase())}
                className="font-body text-sm text-slate-400 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {lnk}
              </button>
            ))}
          </div>

          <button onClick={() => scrollTo("contact")} className="hidden md:block btn-blue font-body text-white text-sm font-semibold px-5 py-2 rounded-lg">
            Hire Me
          </button>

          <button className="md:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mx-4 mt-2 glass rounded-xl p-5">
            <div className="flex flex-col gap-3">
              {navLinks.map(lnk => (
                <button key={lnk} onClick={() => scrollTo(lnk.toLowerCase())} className="font-body text-left text-sm text-slate-300 hover:text-white transition-colors py-1">
                  {lnk}
                </button>
              ))}
              <button onClick={() => scrollTo("contact")} className="btn-blue font-body text-white text-sm font-semibold px-5 py-2.5 rounded-lg mt-1">
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center grid-dots overflow-hidden select-none" onContextMenu={(e) => e.preventDefault()}>
        {/* Interactive network canvas mesh background */}
        <ParticleCanvas />

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[30%] w-[520px] h-[520px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
          <div className="absolute bottom-[20%] right-[25%] w-[420px] h-[420px] rounded-full bg-blue-700/[0.07] blur-[120px]" />
          <div className="absolute top-[55%] left-[15%] w-[280px] h-[280px] rounded-full bg-violet-600/[0.05] blur-[100px]" />
        </div>

        {/* Floating background hud and shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[15%] left-[10%] w-6 h-6 border-t border-l border-cyan-500/20 pointer-events-none pf-float" />
          <div className="absolute bottom-[25%] left-[8%] w-6 h-6 border-b border-l border-cyan-500/20 pointer-events-none pf-float3" />
          <div className="absolute top-[30%] right-[12%] w-6 h-6 border-t border-r border-blue-500/20 pointer-events-none pf-float2" />
          <div className="absolute bottom-[15%] right-[22%] w-6 h-6 border-b border-r border-violet-500/20 pointer-events-none pf-float" />

          <div className="absolute top-[25%] left-[25%] w-24 h-24 border border-dashed border-white/5 rounded-full pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute bottom-[30%] right-[30%] w-32 h-32 border border-dashed border-white/5 rounded-full pointer-events-none animate-[pulse_5s_ease-in-out_infinite]" />


        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center pt-24 pb-20 z-10">

          {/* Left: Text */}
          <div className="space-y-7">
            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-cyan-400" />
              <span className="font-mono-dm text-[11px] text-cyan-400/60 tracking-[0.2em] uppercase">Portfolio · 2026</span>
            </div>

            <div>
              <p className="font-mono-dm text-slate-500 text-sm mb-1 select-none">{greeting}, I am</p>
              <h1 className="font-rajdhani font-bold leading-none tracking-tight text-white glow-text cursor-default select-none" style={{ fontSize: "clamp(3rem,8vw,5.5rem)" }}>
                <GlitchText text="Ailene Torres" />
              </h1>
              <div className="w-20 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full my-4" />
              <div className="font-rajdhani text-2xl lg:text-3xl font-semibold select-none">
                <span className="grad-blue">{heroTitle}</span>
              </div>
            </div>

            <p className="font-body text-slate-400 text-[15px] leading-[1.8] max-w-md">
              Passionate IT graduate fueled by curiosity and driven by impact. Dedicated to creating secure, innovative, and user-focused solutions that bridge technology with real-world needs.
            </p>

            <div className="flex flex-nowrap items-center gap-1.5 pt-1 overflow-x-auto scrollbar-none w-full">
              {HERO_TAGS.map(tag => {
                const TagIcon = tag.icon;
                return (
                  <span
                    key={tag.label}
                    className={`font-mono-dm text-[8px] flex items-center gap-1 border px-2.5 py-1 rounded-full transition-all duration-300 cursor-default select-none flex-shrink-0 ${tag.cls}`}
                  >
                    <TagIcon size={9} />
                    {tag.label}
                  </span>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              <button onClick={() => scrollTo("projects")} className="btn-blue btn-shine-effect font-body text-white font-semibold px-7 py-3 rounded-xl flex items-center gap-2 text-sm cursor-pointer shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                View Projects <ArrowRight size={15} />
              </button>
              <button
                onClick={() => {
                  setShowResume(true);
                  window.scrollTo(0, 0);
                }}
                className="group/btn font-body text-sm font-semibold px-7 py-3 rounded-xl border border-white/10 text-slate-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-white hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_18px_rgba(6,182,212,0.15)] transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Download size={15} className="group-hover/btn:translate-y-[1.5px] transition-transform duration-200" /> Resume
              </button>
              <button onClick={() => scrollTo("contact")} className="group/contact font-body text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 font-medium cursor-pointer">
                Contact Me <ChevronRight size={14} className="group-hover/contact:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Right: Profile */}
          <div className="relative flex items-center justify-center lg:justify-end">

            {/* Wrapper to align photo and badges together */}
            <div className="relative w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] flex-shrink-0">



              {/* Concentric SVG HUD dials (Rotating in opposite directions) */}
              <svg className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)] pointer-events-none z-0 animate-[pf-spin_42s_linear_infinite]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="95" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="0.8" fill="none" strokeDasharray="5 15" />
                <circle cx="100" cy="100" r="90" stroke="rgba(14, 165, 233, 0.1)" strokeWidth="0.5" fill="none" />
                <path d="M 100 5 A 95 95 0 0 1 195 100" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.2" fill="none" strokeDasharray="30 150" />
                <path d="M 100 195 A 95 95 0 0 1 5 100" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.2" fill="none" strokeDasharray="30 150" />
              </svg>
              <svg className="absolute -inset-12 w-[calc(100%+96px)] h-[calc(100%+96px)] pointer-events-none z-0 animate-[pf-spin_58s_linear_infinite_reverse]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="95" stroke="rgba(139, 92, 246, 0.08)" strokeWidth="1" fill="none" strokeDasharray="2 6" />
                <path d="M 5 100 A 95 95 0 0 1 100 5" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1.5" fill="none" strokeDasharray="10 80" />
                <path d="M 195 100 A 95 95 0 0 1 100 195" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" fill="none" strokeDasharray="10 80" />
              </svg>

              {/* Tech corner brackets */}
              <div className="absolute -inset-5 pointer-events-none z-0 animate-[pulse_3s_ease-in-out_infinite]">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/30 rounded-tl-sm" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/30 rounded-tr-sm" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/30 rounded-bl-sm" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/30 rounded-br-sm" />
              </div>

              {/* Profile ring with rotating border gradient */}
              <div className="pf-glow w-full h-full rounded-full p-[2.5px] relative z-10 overflow-hidden select-none" onContextMenu={(e) => e.preventDefault()}>
                <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400 via-blue-600 to-violet-500 pf-spin-slow" />
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0f2347] to-[#07132a] flex items-center justify-center relative overflow-hidden z-10">
                  {/* Biometric Laser Scanner Line */}
                  <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#06b6d4] animate-[scan-line_4s_linear_infinite] pointer-events-none z-20" />
                  {/* Grid overlay for holographic look */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-20 opacity-30 mix-blend-overlay" />

                  <img
                    src={profileImg}
                    alt="Ailene Torres"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ pointerEvents: "none" }}
                    className="w-full h-full object-cover relative z-10 rounded-full"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10">
          <span className="font-mono-dm text-[9px] text-slate-500 tracking-[0.25em] animate-pulse">SCROLL</span>
          <div className="w-[18px] h-[30px] rounded-full border border-slate-600/60 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 rounded-full bg-cyan-400 animate-[scroll-dot_1.8s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      <div className="section-rule" />

      {/* ══════════════════════════════ ABOUT ══════════════════════════════ */}
      <AnimatedSection id="about">
        <div className="max-w-7xl mx-auto px-6 py-24 relative">

          <SectionHeader label="01. about" title="About Me" />

          <div className="grid lg:grid-cols-[1fr_280px] gap-14 mt-16 items-start">

            {/* Hacker Dossier Glass Card */}
            <div className="group/dossier relative rounded-2xl p-[1.5px] overflow-hidden transition-all duration-500 hover:scale-[1.01] hover-neon-sec flex-grow">
              {/* Spinning Neon Border Gradient (Visible on hover) */}
              <div className="absolute inset-0 opacity-0 group-hover/dossier:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                <div
                  className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_6s_linear_infinite]"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, #06b6d4 25%, transparent 50%, #3b82f6 75%, transparent)`
                  }}
                />
              </div>

              {/* Inner Glass Card Content */}
              <div className="relative p-6 md:p-8 bg-[#0b1326]/95 backdrop-blur-xl rounded-[15px] border border-white/5 group-hover/dossier:border-transparent transition-colors duration-500 overflow-hidden space-y-6 qr-shine-effect h-full flex flex-col justify-between">
                {/* Card dot grid background */}
                <div className="absolute inset-0 card-grid-dots opacity-5 group-hover/dossier:opacity-12 transition-opacity duration-500 pointer-events-none" />

                {/* Dossier status label in corner */}
                <div className="absolute top-3 right-4 font-mono-dm text-[8.5px] text-slate-500/75 select-none tracking-widest uppercase z-10">
                  DOC.REF // BSIT.AT_2026
                </div>

                {/* Ambient Glow inside card */}
                <div className="absolute inset-0 opacity-0 group-hover/dossier:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)]" />

                {/* Glowing corner brackets */}
                {/* Top-Left */}
                <div className="absolute top-0 left-0 w-6 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent transition-all duration-500 group-hover/dossier:w-12 z-20" />
                <div className="absolute top-0 left-0 w-[2px] h-6 bg-gradient-to-b from-cyan-400 to-transparent transition-all duration-500 group-hover/dossier:h-12 z-20" />
                {/* Bottom-Right */}
                <div className="absolute bottom-0 right-0 w-6 h-[2px] bg-gradient-to-l from-cyan-400 to-transparent transition-all duration-500 group-hover/dossier:w-12 z-20" />
                <div className="absolute bottom-0 right-0 w-[2px] h-6 bg-gradient-to-t from-cyan-400 to-transparent transition-all duration-500 group-hover/dossier:h-12 z-20" />

                <div className="relative z-10 space-y-6">
                  <p className="font-body text-slate-300 text-[15px] leading-[1.85] transition-all duration-300">
                    Recent graduate with a <span className="text-white font-semibold border-b border-cyan-500/30 pb-0.5">Bachelor’s Degree in Information Technology</span> from the University of Makati, equipped with foundational knowledge in technical support, troubleshooting, and a focus on <span className="grad-blue font-semibold">networking and cybersecurity</span>.
                  </p>
                  <p className="font-body text-slate-300 text-[15px] leading-[1.85] transition-all duration-300">
                    Demonstrates adaptability, problem-solving skills, and experience working in <span className="text-white font-semibold">collaborative team environments</span> through academic and internship-related activities.
                  </p>
                  <p className="font-body text-slate-400 text-[15px] leading-[1.85] transition-all duration-300">
                    Eager to apply technical expertise, learn emerging technologies, improve <span className="text-white font-semibold">operational efficiency</span>, and provide reliable IT support in fast-paced work environments.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3.5 pt-2 relative z-10">
                  {[
                    { icon: Mail, label: "torresailene25@gmail.com", href: "mailto:torresailene25@gmail.com", cls: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_12px_rgba(6,182,212,0.15)]" },
                    { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/ailene-torres-2300302a5/", cls: "text-blue-400 border-blue-400/20 bg-blue-400/5 hover:border-blue-400/50 hover:bg-blue-400/10 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]" },
                    { icon: Github, label: "GitHub", href: "https://github.com/Ashyrie", cls: "text-slate-300 border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]" },
                  ].map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`font-mono-dm flex items-center gap-2 text-[10.5px] border px-4 py-2.5 rounded-xl transition-all duration-300 select-none ${item.cls}`}
                    >
                      <item.icon size={12} /> {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {[
                { label: "Projects", value: "5", icon: Layers, color1: "#06b6d4", color2: "#3b82f6", glow: "rgba(6,182,212,0.15)", neonClass: "hover-neon-sec" },
                { label: "Certifications", value: "14+", icon: Award, color1: "#f59e0b", color2: "#fbbf24", glow: "rgba(245,158,11,0.15)", neonClass: "hover-neon-sup" },
                { label: "Technologies", value: "25+", icon: Cpu, color1: "#8b5cf6", color2: "#d946ef", glow: "rgba(139,92,246,0.15)", neonClass: "hover-neon-dev" },
                { label: "IT Education", value: "4 Yrs", icon: Star, color1: "#10b981", color2: "#14b8a6", glow: "rgba(16,185,129,0.15)", neonClass: "hover-neon-db" },
              ].map(s => (
                <div
                  key={s.label}
                  className={`group relative rounded-xl p-[1.5px] overflow-hidden transition-all duration-500 hover:scale-[1.05] ${s.neonClass}`}
                >
                  {/* Conic rotating border on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
                    <div
                      className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_5s_linear_infinite]"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${s.color1} 25%, transparent 50%, ${s.color2} 75%, transparent)`
                      }}
                    />
                  </div>

                  {/* Inner Content Card */}
                  <div className="relative bg-[#0b1326]/95 backdrop-blur-xl rounded-[11px] p-5 text-center z-10 border border-white/5 group-hover:border-transparent transition-colors duration-500 overflow-hidden h-full flex flex-col justify-center">
                    {/* Grid dots background overlay */}
                    <div className="absolute inset-0 card-grid-dots opacity-5 group-hover:opacity-12 transition-opacity duration-500 pointer-events-none rounded-xl" />

                    {/* Glowing radial ambient background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`
                      }}
                    />

                    {/* Tech corners */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l opacity-35 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: s.color1 }} />
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r opacity-35 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: s.color1 }} />
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l opacity-35 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: s.color1 }} />
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r opacity-35 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: s.color1 }} />

                    <s.icon size={18} className="mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ color: s.color1 }} />
                    <p className="font-rajdhani text-[2.2rem] font-bold leading-none transition-all duration-300" style={{ color: s.color1 }}>
                      {s.value}
                    </p>
                    <p className="font-body text-[10px] text-slate-500 mt-1.5 font-semibold leading-tight group-hover:text-slate-300 transition-colors uppercase tracking-wider">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="section-rule" />

      {/* ══════════════════════════════ SKILLS ══════════════════════════════ */}
      <AnimatedSection id="skills">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeader label="02. skills" title="Technical Expertise" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-16">
            {SKILLS.map((sk, i) => {
              const colors = getSkillColors(sk.category);
              const prof = getSkillProficiency(sk.category);
              return (
                <div
                  key={sk.category}
                  className={`group relative rounded-xl p-[1.5px] overflow-hidden transition-all duration-500 hover:scale-[1.03] h-full ${colors.neonClass}`}
                  style={{ transitionDelay: `${i * 55}ms` }}
                >
                  {/* Spinning Neon Border Gradient (Visible on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
                    <div
                      className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_5s_linear_infinite]"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${colors.color1} 25%, transparent 50%, ${colors.color2} 75%, transparent)`
                      }}
                    />
                  </div>

                  {/* Inner Glass Card Content */}
                  <div className="relative bg-[#0b1326]/95 backdrop-blur-xl rounded-[11px] p-6 h-full flex flex-col z-10 border border-white/5 group-hover:border-transparent transition-colors duration-500 overflow-hidden qr-shine-effect">
                    {/* card grid pattern */}
                    <div className="absolute inset-0 card-grid-dots opacity-5 group-hover:opacity-12 transition-opacity duration-500 pointer-events-none rounded-xl" />

                    {/* Ambient Glow inside card */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`
                      }}
                    />

                    {/* Tech Corner Brackets */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" style={{ borderColor: colors.color1 }} />
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ borderColor: colors.color1 }} />
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" style={{ borderColor: colors.color1 }} />
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" style={{ borderColor: colors.color1 }} />

                    {/* Upper content */}
                    <div className="relative z-10">
                      {/* Icon and Category Title Row */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${colors.color1}20, ${colors.color2}10)`,
                            border: `1px solid ${colors.color1}30`
                          }}
                        >
                          <sk.icon size={17} style={{ color: colors.color1 }} />
                        </div>
                        <h3 className="font-rajdhani font-bold text-white text-[16px] leading-tight tracking-wide">{sk.category}</h3>
                      </div>

                      {/* Proficiency Bar Section */}
                      <div className="mb-5 mt-1 space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-mono-dm uppercase tracking-wider text-slate-500">
                          <span className="group-hover:text-slate-400 transition-colors">{prof.status}</span>
                          <span style={{ color: colors.color1 }} className="font-bold opacity-80 group-hover:opacity-100 transition-all">{prof.val}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/[0.03] border border-white/[0.05] rounded-full overflow-hidden p-[1px]">
                          <div
                            className="h-full rounded-full prof-bar bg-gradient-to-r"
                            style={{
                              "--prof-val": `${prof.val}%`,
                              background: `linear-gradient(to right, ${colors.color1}, ${colors.color2})`
                            } as React.CSSProperties}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Lower content: Tags */}
                    <div className="grid grid-cols-2 gap-1.5 relative z-10 mt-4 w-full">
                      {sk.items.map((item, idx) => {
                        const isLast = idx === sk.items.length - 1;
                        const isOddTotal = sk.items.length % 2 !== 0;
                        const spanClass = isLast && isOddTotal ? "col-span-2" : "";
                        return (
                          <span
                            key={item}
                            className={`font-mono-dm text-[9.5px] text-slate-400 bg-white/[0.02] border border-white/[0.04] px-2 py-1.5 rounded-md transition-all duration-300 cursor-default group-hover:text-slate-200 group-hover:border-white/[0.08] flex items-center justify-center text-center ${spanClass} ${colors.pillCls}`}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <div className="section-rule" />

      {/* ══════════════════════════════ EXPERIENCE ══════════════════════════════ */}
      <AnimatedSection id="experience">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeader label="03. experience" title="Work Experience" />

          <div className="mt-16 grid lg:grid-cols-[200px_36px_1fr] gap-x-6 gap-y-12 items-start relative">

            {/* Left meta */}
            <div className="lg:sticky lg:top-28 space-y-4">
              <span className="font-mono-dm inline-flex text-xs text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-full">
                Feb 2026 – Apr 2026
              </span>
              <div>
                <p className="font-rajdhani text-white font-semibold text-lg leading-tight">Flag City Properties, Inc.</p>
                <p className="font-mono-dm text-xs text-slate-500 mt-1">One Park Drive, BGC, Taguig</p>
              </div>
              <div className="flex flex-col gap-2.5 pt-1">
                {["Website Development", "Front-end & Back-end", "Technical Support", "Canva Designing"].map(tag => (
                  <span key={tag} className="font-body text-xs text-slate-400 flex items-center gap-2 group/metatag cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover/metatag:bg-cyan-400 group-hover/metatag:shadow-[0_0_6px_#06b6d4] transition-all duration-300 flex-shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  setShowPhotos(true);
                  window.scrollTo(0, 0);
                }}
                className="btn-blue btn-shine-effect font-body text-white font-semibold px-4 py-2.5 rounded-full inline-flex items-center gap-1.5 text-xs cursor-pointer mt-3 w-fit hover:scale-102 active:scale-95 transition-all shadow-lg"
              >
                View Documentation <Camera size={13} />
              </button>
            </div>

            {/* Middle Column: High-Tech Animated Timeline Pipeline */}
            <div className="hidden lg:flex flex-col items-center h-full min-h-[300px] relative">
              {/* Animated pulses on pipeline */}
              <div className="w-3 h-3 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center relative z-10 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>

              {/* Vertical SVG Pipeline with flowing data pulse */}
              <svg className="w-6 h-full min-h-[260px] absolute top-3 bottom-0 left-1/2 -translate-x-1/2" viewBox="0 0 24 300" preserveAspectRatio="none">
                <line x1="12" y1="0" x2="12" y2="300" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 12,0 L 12,300" stroke="url(#pipeline-grad)" strokeWidth="2" strokeDasharray="15 120" strokeDashoffset="0" className="animate-[timeline-flow_6s_linear_infinite]" />
                <defs>
                  <linearGradient id="pipeline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Right card (Experience card with conic gradient hover) */}
            <div className="group relative rounded-xl p-[1.5px] overflow-hidden transition-all duration-500 hover:scale-[1.01] hover-neon-sec">
              {/* Conic rotating border on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
                <div
                  className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_6s_linear_infinite]"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, #06b6d4 25%, transparent 50%, #3b82f6 75%, transparent)`
                  }}
                />
              </div>

              {/* Card content */}
              <div className="relative bg-[#0b1326]/95 backdrop-blur-xl rounded-[11px] p-8 h-full flex flex-col z-10 border border-white/5 group-hover:border-transparent transition-colors duration-500 overflow-hidden">
                {/* Holographic grid overlay */}
                <div className="absolute inset-0 card-grid-dots opacity-5 group-hover:opacity-12 transition-opacity duration-500 pointer-events-none rounded-xl" />

                {/* Glowing ambient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)]" />

                {/* Tech corner brackets */}
                <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: "#06b6d4" }} />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: "#06b6d4" }} />
                <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: "#06b6d4" }} />
                <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: "#06b6d4" }} />

                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Globe size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-rajdhani text-xl font-bold text-white">Full Stack Web Developer Intern</h3>
                    <p className="font-body text-slate-400 text-sm mt-0.5">Technology & Real Estate Sector</p>
                  </div>
                </div>

                <div className="space-y-3 mb-7 relative z-10">
                  {[
                    "Assisted in front-end and back-end website development and functionality enhancement.",
                    "Provided staff technical support, including account management, printer troubleshooting, software diagnostics, and Microsoft Office assistance.",
                    "Handled and encoded sensitive information with accuracy and confidentiality.",
                    "Designed promotional and informational materials using Canva.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group/bullet">
                      <span className="text-cyan-400 select-none font-bold text-xs mt-[3px] transition-transform duration-200 group-hover/bullet:translate-x-1 font-mono-dm">&gt;</span>
                      <p className="font-body text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-5 border-t border-white/[0.06] relative z-10">
                  {["PHP", "MySQL", "JavaScript", "SEO", "Canva", "IT Support"].map(t => (
                    <span
                      key={t}
                      className="font-mono-dm text-[9.5px] text-cyan-400/80 bg-cyan-400/[0.04] border border-cyan-400/20 hover:border-cyan-400/60 hover:bg-cyan-400/15 hover:shadow-[0_0_10px_rgba(6,182,212,0.12)] px-2.5 py-1 rounded-md transition-all duration-300 select-none cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="section-rule" />

      {/* ══════════════════════════════ PROJECTS ══════════════════════════════ */}
      <AnimatedSection id="projects">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeader label="04. projects" title="Featured Projects" />

          <div className="flex flex-wrap justify-center gap-5 mt-16">
            {PROJECTS.map(proj => {
              const theme = getThemeByCls(proj.accent);
              return (
                <div
                  key={proj.title}
                  onClick={() => {
                    setActiveProject(proj.title);
                    window.scrollTo(0, 0);
                  }}
                  className={`w-full md:w-[calc(50%-10px)] group relative rounded-xl p-[1.5px] overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer ${theme.neonClass}`}
                >
                  {/* Spinning Neon Border Gradient (Visible on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
                    <div
                      className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_6s_linear_infinite]"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${theme.color1} 25%, transparent 50%, ${theme.color2} 75%, transparent)`
                      }}
                    />
                  </div>

                  {/* Inner Glass Card Content */}
                  <div className="relative bg-[#0b1326]/95 backdrop-blur-xl rounded-[11px] h-full flex flex-col z-10 border border-white/5 group-hover:border-transparent transition-colors duration-500 overflow-hidden qr-shine-effect">
                    {/* card grid pattern */}
                    <div className="absolute inset-0 card-grid-dots opacity-5 group-hover:opacity-12 transition-opacity duration-500 pointer-events-none rounded-xl" />

                    {/* Ambient Glow inside card */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`
                      }}
                    />

                    {/* Tech Corner Brackets */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />

                    {/* Preview */}
                    <div className="h-48 relative flex items-center justify-center overflow-hidden bg-slate-950 border-b border-white/[0.04]">
                      {proj.image ? (
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        />
                      ) : (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-br ${proj.grad}`} />
                          <div className="absolute inset-0 grid-dots opacity-30" />
                          <proj.icon size={52} className={`${proj.accent} opacity-25 group-hover:opacity-55 transition-opacity duration-300`} />
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060b16]/80 via-transparent to-black/30" />

                      {/* Decorative dots */}
                      <div className="absolute top-3.5 right-4 flex items-center gap-1.5 z-10">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                      <div className="absolute bottom-3.5 left-4 z-10">
                        <span className={`font-mono-dm text-[9px] ${proj.accent} bg-[#060b16]/90 border border-white/10 px-2.5 py-1 rounded shadow-lg uppercase tracking-wider`}>
                          {proj.subtitle} · {proj.date}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-rajdhani text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400" style={{ color: theme.color1 }}>{proj.title}</h3>
                          <span className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:border-white/20 transition-all">
                            <ExternalLink size={13} />
                          </span>
                        </div>
                        <p className="font-body text-slate-400 text-sm leading-[1.75] mb-5">{proj.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map(t => (
                          <span key={t} className="font-mono-dm text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded-md border border-white/[0.03] group-hover:text-slate-300 group-hover:border-white/[0.08] transition-colors">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <div className="section-rule" />

      {/* ══════════════════════════════ CERTIFICATIONS ══════════════════════════════ */}
      <AnimatedSection id="certifications">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeader label="05. certifications" title="Certifications" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
            {CERTS.map((cert, i) => {
              const theme = getThemeByCls(cert.cls);
              return (
                <div
                  key={cert.name}
                  onClick={() => {
                    const groupIdx = {
                      "Simplilearn WordPress Course": 0,
                      "Packt WordPress Development": 0,
                      "Cisco Networking Academy": 1,
                      "Microsoft Cybersecurity Fundamentals": 2,
                      "Alibaba Cloud Certified Associate": 3,
                      "QUALYS Certified Specialist": 4,
                      "Grandstream Certified Specialist": 5,
                      "Alibaba Cloud Systems Masterclass": 6,
                    }[cert.name] ?? 0;
                    setShowCertDetail(groupIdx);
                    window.scrollTo(0, 0);
                  }}
                  className={`group relative rounded-xl p-[1.5px] overflow-hidden transition-all duration-500 hover:scale-[1.03] cursor-pointer ${theme.neonClass}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {/* Spinning Neon Border Gradient (Visible on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
                    <div
                      className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_5s_linear_infinite]"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${theme.color1} 25%, transparent 50%, ${theme.color2} 75%, transparent)`
                      }}
                    />
                  </div>

                  {/* Inner Glass Card Content */}
                  <div className="relative bg-[#0b1326]/95 backdrop-blur-xl rounded-[11px] p-6 h-full flex flex-col justify-between z-10 border border-white/5 group-hover:border-transparent transition-colors duration-500 overflow-hidden qr-shine-effect">
                    {/* card grid pattern */}
                    <div className="absolute inset-0 card-grid-dots opacity-5 group-hover:opacity-12 transition-opacity duration-500 pointer-events-none rounded-xl" />

                    {/* Ambient Glow inside card */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`
                      }}
                    />

                    {/* Tech Corner Brackets */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cert.bg} flex items-center justify-center mb-5 border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        <Award size={20} className={cert.cls} />
                      </div>
                      <h3 className="font-rajdhani font-bold text-white text-[15px] leading-snug mb-1 transition-colors duration-300" style={{ color: theme.color1 }}>{cert.name}</h3>
                      <p className="font-body text-sm text-slate-500 font-medium mb-4 group-hover:text-slate-400 transition-colors duration-300">{cert.issuer}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto relative z-10 pt-2">
                      <span className={`font-mono-dm text-[10px] ${cert.cls} bg-white/5 px-2.5 py-1 rounded-md border border-white/[0.03] group-hover:border-white/[0.08]`}>{cert.year}</span>
                      <ExternalLink size={12} className="text-slate-700 group-hover:text-slate-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <div className="section-rule" />

      {/* ══════════════════════════════ AWARDS ══════════════════════════════ */}
      <AnimatedSection id="awards">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeader label="06. awards" title="Recognition" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
            {AWARDS.map(a => {
              const theme = getThemeByCls(a.cls);
              return (
                <div
                  key={a.title}
                  className={`group relative rounded-xl p-[1.5px] overflow-hidden transition-all duration-500 hover:scale-[1.03] ${theme.neonClass}`}
                >
                  {/* Spinning Neon Border Gradient (Visible on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
                    <div
                      className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_5s_linear_infinite]"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${theme.color1} 25%, transparent 50%, ${theme.color2} 75%, transparent)`
                      }}
                    />
                  </div>

                  {/* Inner Glass Card Content */}
                  <div className="relative bg-[#0b1326]/95 backdrop-blur-xl rounded-[11px] p-8 h-full flex flex-col justify-between z-10 border border-white/5 group-hover:border-transparent transition-colors duration-500 overflow-hidden qr-shine-effect">
                    {/* card grid pattern */}
                    <div className="absolute inset-0 card-grid-dots opacity-5 group-hover:opacity-12 transition-opacity duration-500 pointer-events-none rounded-xl" />

                    {/* Ambient Glow inside card */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`
                      }}
                    />

                    {/* Tech Corner Brackets */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: theme.color1 }} />

                    {/* Eye icon — opens certificate detail */}
                    <button
                      onClick={() => {
                        setShowRecogDetail(a.groupIdx ?? 0);
                        window.scrollTo(0, 0);
                      }}
                      className={`absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center ${a.cls} opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer border border-white/10 hover:border-white/20 z-25`}
                      title="View Certificate"
                    >
                      <Eye size={14} />
                    </button>

                    {/* Content */}
                    <div className="relative z-10 flex-grow flex flex-col justify-start">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.bg} flex items-center justify-center mb-5 border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        <a.icon size={26} className={a.cls} />
                      </div>
                      <p className="font-mono-dm text-[10px] text-slate-500 mb-1.5 transition-colors duration-300 group-hover:text-slate-400">{a.org}</p>
                      <h3 className="font-rajdhani text-xl font-bold text-white mb-3 transition-colors duration-300" style={{ color: theme.color1 }}>{a.title}</h3>
                      <p className="font-body text-slate-400 text-sm leading-[1.75] mb-5">{a.desc}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.04] relative z-10">
                      <span className={`font-mono-dm text-[10px] ${a.cls} bg-white/5 px-3 py-1 rounded-full border border-white/[0.03] group-hover:border-white/[0.08]`}>{a.year}</span>
                      <button
                        onClick={() => {
                          setShowRecogDetail(a.groupIdx ?? 0);
                          window.scrollTo(0, 0);
                        }}
                        className={`font-body text-[11px] font-semibold ${a.cls} flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer`}
                      >
                        <Eye size={12} /> View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </AnimatedSection>

      <div className="section-rule" />

      {/* ══════════════════════════════ CONTACT ══════════════════════════════ */}
      <AnimatedSection id="contact">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeader label="07. contact" title="Get In Touch" />

          <div className="flex flex-col gap-12 mt-16 relative">
            {/* Background Glows inside section */}
            <div className="absolute top-[60%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[600px] h-[300px] rounded-full bg-gradient-to-r from-fuchsia-500/5 to-cyan-500/5 blur-[120px] pointer-events-none" />

            {/* Top Row: Description & Contact Icons */}
            <div className="group relative rounded-xl p-[1.5px] overflow-hidden transition-all duration-500 hover-neon-sec z-10">
              {/* Spinning Neon Border Gradient (Visible on hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
                <div
                  className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_6s_linear_infinite]"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, #06b6d4 25%, transparent 50%, #3b82f6 75%, transparent)`
                  }}
                />
              </div>

              {/* Inner Glass Card Content */}
              <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-[#0b1326]/95 backdrop-blur-xl rounded-[11px] p-8 border border-white/5 group-hover:border-transparent transition-colors duration-500 overflow-hidden qr-shine-effect w-full">
                {/* card grid pattern */}
                <div className="absolute inset-0 card-grid-dots opacity-5 group-hover:opacity-12 transition-opacity duration-500 pointer-events-none rounded-xl" />

                {/* Ambient Glow inside card */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)]" />

                {/* Tech Corner Brackets */}
                <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: "#06b6d4" }} />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: "#06b6d4" }} />
                <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: "#06b6d4" }} />
                <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: "#06b6d4" }} />

                <div className="max-w-xl relative z-10">
                  <p className="font-body text-slate-300 text-[15px] leading-[1.85]">
                    {"I'm"} open to full-time roles, freelance projects, and collaborations in IT, Cybersecurity, or Web Development. {"Let's"} build something great together. Scan a QR code below to connect instantly.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 relative z-10">
                  {[
                    { icon: Mail, label: "Email", href: "mailto:torresailene25@gmail.com", cls: "text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-300" },
                    { icon: Phone, label: "Phone", href: "tel:+639559880972", cls: "text-emerald-400 hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-emerald-300" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ailene-torres-2300302a5/", cls: "text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5 hover:text-blue-300" },
                    { icon: Github, label: "GitHub", href: "https://github.com/Ashyrie", cls: "text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white" },
                  ].map(c => (
                    <a
                      key={c.label}
                      href={c.href}
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-[#0a1224]/35 font-mono-dm text-xs font-semibold ${c.cls} transition-all duration-300 cursor-pointer shadow-md`}
                    >
                      <c.icon size={13} /> {c.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: QR Codes Grid */}
            <div className="flex flex-wrap justify-center gap-6 z-10 relative">
              {SOCIAL_QRS.map((social, i) => {
                const getSocialColors = (name: string) => {
                  switch (name) {
                    case "Facebook": return { c1: "#1877F2", c2: "#3b82f6" };
                    case "LinkedIn": return { c1: "#0A66C2", c2: "#0ea5e9" };
                    case "Viber": return { c1: "#7360F2", c2: "#c084fc" };
                    case "Gmail": return { c1: "#EA4335", c2: "#f87171" };
                    case "Call": return { c1: "#34A853", c2: "#4ade80" };
                    default: return { c1: "#ffffff", c2: "#cccccc" };
                  }
                };
                const sc = getSocialColors(social.name);
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    {...(social.href.startsWith("http") || social.href.startsWith("viber") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`w-[calc(50%-12px)] sm:w-[calc(33.33%-16px)] md:w-[calc(20%-20px)] flex-grow max-w-[240px] min-w-[150px] group relative rounded-2xl p-[1.5px] overflow-hidden transition-all duration-500 hover:scale-104 flex flex-col justify-between shadow-lg select-none cursor-pointer ${social.borderCls}`}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {/* Spinning Neon Border Gradient (Visible on hover) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                      <div
                        className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] animate-[spin_5s_linear_infinite]"
                        style={{
                          background: `conic-gradient(from 0deg, transparent, ${sc.c1} 25%, transparent 50%, ${sc.c2} 75%, transparent)`
                        }}
                      />
                    </div>

                    {/* Inner Glass Card Content */}
                    <div className="relative bg-[#0b1326]/95 backdrop-blur-xl rounded-[15px] p-5 h-full flex flex-col items-center justify-between gap-5 z-10 border border-white/5 group-hover:border-transparent transition-colors duration-500 overflow-hidden w-full">
                      {/* card grid pattern */}
                      <div className="absolute inset-0 card-grid-dots opacity-5 group-hover:opacity-12 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                      {/* Ambient Glow inside card */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none rounded-2xl"
                        style={{
                          background: `radial-gradient(circle, ${social.glowColor} 0%, transparent 70%)`
                        }}
                      />

                      {/* Tech Corner Brackets */}
                      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: sc.c1 }} />
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: sc.c1 }} />
                      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: sc.c1 }} />
                      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-300" style={{ borderColor: sc.c1 }} />

                      {/* Top Badge/Pill */}
                      <div className={`w-full py-1.5 px-3 rounded-full flex items-center justify-center gap-2 text-[10px] font-bold ${social.pillCls} select-none relative z-10 transition-transform duration-300 group-hover:scale-[1.03]`}>
                        <social.icon size={11} className="flex-shrink-0" />
                        <span className="font-mono-dm uppercase tracking-wider">{social.name}</span>
                      </div>

                      {/* QR Image Framed */}
                      <div className={`w-full aspect-square bg-white rounded-2xl p-2.5 border-2 ${social.qrBorderCls} shadow-md flex items-center justify-center relative overflow-hidden qr-shine-effect group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 z-10`}>
                        <img
                          src={social.qr}
                          alt={`${social.name} QR Code`}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                          style={{ pointerEvents: "none" }}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ══════════════════════════════ FOOTER ══════════════════════════════ */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono-dm text-sm select-none">
            <span className="text-cyan-400">{"<"}</span>
            <span className="text-slate-500 mx-0.5">AT</span>
            <span className="text-cyan-400">{"/>"}</span>
          </div>
          <p className="font-mono-dm text-[10px] text-slate-700 text-center">
            © 2026 Ailene Torres · Aspiring IT Professional · Cybersecurity · Full-Stack Dev
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Ashyrie" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-white transition-colors"><Github size={15} /></a>
            <a href="https://www.linkedin.com/in/ailene-torres-2300302a5/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-white transition-colors"><Linkedin size={15} /></a>
            <a href="mailto:torresailene25@gmail.com" className="text-slate-700 hover:text-white transition-colors"><Mail size={15} /></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
