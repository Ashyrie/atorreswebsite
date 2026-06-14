import {
  Wifi, Shield, Code2, Database, Layers, Wrench, Cpu,
  Globe, Server, Monitor, Award, Trophy, Star, Palette, LucideIcon, BarChart3
} from "lucide-react";

import imgPlugDefend from "@/assets/projects/plug_and_defend/plug_defend_highlight.png";
import imgFlagCity from "@/assets/projects/flag_city/client/Screenshot 2026-06-06 091502.png";
import imgDeltech from "@/assets/projects/deltech/client/Screenshot 2026-06-06 153556.png";
import imgNexer from "@/assets/projects/nexer/nexer_landing.png";
import imgFCPIPosters from "@/assets/posters/1.png";

export interface Project {
  title: string;
  subtitle: string;
  date: string;
  desc: string;
  tech: string[];
  icon: LucideIcon;
  grad: string;
  accent: string;
  hover: string;
  image?: string;
}

export const SKILLS = [
  { category: "Networking", icon: Wifi, grad: "from-blue-500/20 to-cyan-600/10", iconCls: "text-blue-400", hborder: "group-hover:border-blue-400/40", items: ["Network Config", "Subnetting", "Routing & Switching", "TCP/IP Protocols", "DNS/DHCP Admin", "VPN Basics", "Network Troubleshooting", "Cisco Fundamentals", "Connectivity Diagnostics"] },
  { category: "Cybersecurity", icon: Shield, grad: "from-cyan-500/20 to-blue-600/10", iconCls: "text-cyan-400", hborder: "group-hover:border-cyan-500/40", items: ["Cybersecurity Principles", "Secure Coding Practices", "Endpoint Security", "Vulnerability Assessment", "Information Security Fundamentals"] },
  { category: "Programming & Dev", icon: Code2, grad: "from-violet-500/20 to-purple-600/10", iconCls: "text-violet-400", hborder: "group-hover:border-violet-400/40", items: ["Python", "Java", "C++", "HTML", "CSS", "PHP", "SQL/MySQL", "Web Development", "Application Development", "System Integration", "Basic Software Maintenance"] },
  { category: "Database Management", icon: Database, grad: "from-emerald-500/20 to-teal-600/10", iconCls: "text-emerald-400", hborder: "group-hover:border-emerald-400/40", items: ["Database Queries", "MySQL Admin", "DBMS", "Web-Based Database Systems"] },
  { category: "Data Analytics & Visualization", icon: BarChart3, grad: "from-teal-500/20 to-emerald-600/10", iconCls: "text-teal-400", hborder: "group-hover:border-teal-400/40", items: ["Microsoft Excel", "Google Sheets", "Basic Statistical Analysis"] },
  { category: "Web Design & UI/UX", icon: Layers, grad: "from-pink-500/20 to-rose-600/10", iconCls: "text-pink-400", hborder: "group-hover:border-pink-400/40", items: ["Wireframing", "Layout Design", "Web Accessibility Basics", "UX/UI Design Fundamentals", "Responsive Design Principles"] },
  { category: "Technical Support", icon: Wrench, grad: "from-amber-500/20 to-orange-600/10", iconCls: "text-amber-400", hborder: "group-hover:border-amber-400/40", items: ["Printer Troubleshooting", "User Account Assistance", "IT Support Ops", "Software Troubleshooting", "Hardware Troubleshooting", "Technical Issue Resolution"] },
  { category: "Tools & Tech", icon: Cpu, grad: "from-sky-500/20 to-blue-600/10", iconCls: "text-sky-400", hborder: "group-hover:border-sky-400/40", items: ["VS Code", "XAMPP", "Laragon", "phpMyAdmin", "Browser Dev Tools", "VMware", "Cisco Tools", "Canva", "Figma", "Antigravity"] },
];

export const PROJECTS: Project[] = [
  {
    title: "Plug and Defend: A Portable Cybersecurity Toolkit",
    subtitle: "Capstone Project",
    date: "2025 - Present",
    desc: "Developed a portable cybersecurity toolkit with AI-powered threat detection, automated scanning, and real-time monitoring features. Enabled plug-and-play security assessments in low-connectivity environments.",
    tech: ["Python", "AI threat detection", "Vulnerability scanning", "Network Security"],
    icon: Shield,
    grad: "from-cyan-600/30 to-blue-900/70",
    accent: "text-cyan-400",
    hover: "hover:border-cyan-500/40",
    image: imgPlugDefend,
  },
  {
    title: "Flag City Properties, Inc. Website",
    subtitle: "Internship Project",
    date: "2026",
    desc: "Contributed to the development and improvement of a real estate company website, enabling clients to easily browse and view available properties.",
    tech: ["PHP", "MySQL", "JavaScript", "Canva", "SEO"],
    icon: Globe,
    grad: "from-amber-600/30 to-orange-900/70",
    accent: "text-amber-400",
    hover: "hover:border-amber-500/40",
    image: imgFlagCity,
  },
  {
    title: "Deltech Integrated Reservation & Client Management System",
    subtitle: "Academic Project",
    date: "2025",
    desc: "Developed a web portal for parking system sales in partnership with Deltech Parking Systems and Solutions, Inc. Includes an interactive products/services catalog, support inquiry features, and a secure verifier dashboard equipped with an OTP login, live QR scan checks, and CSV log utility.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML5/CSS3", "QR Web API", "2FA OTP"],
    icon: Server,
    grad: "from-violet-600/30 to-purple-900/70",
    accent: "text-violet-400",
    hover: "hover:border-violet-500/40",
    image: imgDeltech,
  },
  {
    title: "Nexer: A Netflix Inspired Streaming Platform",
    subtitle: "Academic Project",
    date: "2024",
    desc: "Implemented user authentication and media management features. Optimized database queries and backend performance to ensure secure and scalable system functionality.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    icon: Monitor,
    grad: "from-pink-600/30 to-rose-900/70",
    accent: "text-pink-400",
    hover: "hover:border-pink-500/40",
    image: imgNexer,
  },
  {
    title: "FCPI Holiday Observance Posters",
    subtitle: "Internship Project",
    date: "2026",
    desc: "Designed 14 corporate and seasonal holiday posters for Flag City Properties, Inc. social media channels. Created custom graphic layouts using Canva to celebrate local Philippine holidays, Japanese observances, and global dates.",
    tech: ["Canva", "Graphic Design", "Social Media Branding"],
    icon: Palette,
    grad: "from-fuchsia-600/30 to-pink-900/70",
    accent: "text-fuchsia-400",
    hover: "hover:border-fuchsia-500/40",
    image: imgFCPIPosters,
  },
];

export const CERTS = [
  { name: "Simplilearn WordPress Course", issuer: "Simplilearn - Introduction to WordPress", year: "2026", cls: "text-pink-400", bg: "from-pink-500/20 to-pink-900/10", hover: "hover:border-pink-500/30" },
  { name: "Packt WordPress Development", issuer: "Packt / Coursera - Advanced WordPress Techniques", year: "2026", cls: "text-violet-400", bg: "from-violet-500/20 to-violet-900/10", hover: "hover:border-violet-500/30" },
  { name: "Cisco Networking Academy", issuer: "Endpoint Security & Ethical Hacker Course", year: "2026", cls: "text-sky-400", bg: "from-sky-500/20 to-sky-900/10", hover: "hover:border-sky-500/30" },
  { name: "Microsoft Cybersecurity Fundamentals", issuer: "TESDA - Security, Compliance, & Identity", year: "2026", cls: "text-blue-400", bg: "from-blue-500/20 to-blue-900/10", hover: "hover:border-blue-500/30" },
  { name: "Alibaba Cloud Certified Associate", issuer: "Alibaba Cloud Academy - Business User", year: "2025", cls: "text-orange-400", bg: "from-orange-500/20 to-orange-900/10", hover: "hover:border-orange-500/30", details: "ID: IACA09250400203630L" },
  { name: "QUALYS Certified Specialist", issuer: "Qualys - Endpoint & PCI Compliance", year: "2025", cls: "text-emerald-400", bg: "from-emerald-500/20 to-emerald-900/10", hover: "hover:border-emerald-500/30" },
  { name: "Grandstream Certified Specialist", issuer: "Grandstream - UC Solution", year: "2025", cls: "text-amber-400", bg: "from-amber-500/20 to-amber-900/10", hover: "hover:border-amber-500/30" },
  { name: "Alibaba Cloud Systems Masterclass", issuer: "Alibaba Cloud / SHE++", year: "2025", cls: "text-violet-400", bg: "from-violet-500/20 to-violet-900/10", hover: "hover:border-violet-500/30" },
];

export const AWARDS = [
  {
    title: "Best in Network Security",
    org: "University of Makati",
    desc: "Awarded for outstanding performance and proficiency in Information Technology and Network Security — recognizing commitment to security, network infrastructure design, and technology-driven development.",
    icon: Shield,
    cls: "text-cyan-400",
    bg: "from-cyan-500/20 to-blue-900/10",
    hover: "hover:border-cyan-500/35",
    year: "2026",
    groupIdx: 0,
  },
  {
    title: "Best Capstone Project",
    org: "University of Makati",
    desc: "Recognized for showcasing remarkable talent, innovation, and passion in the design, development, and implementation of the final-year IT capstone project (Second Place).",
    icon: Trophy,
    cls: "text-amber-400",
    bg: "from-amber-500/20 to-orange-900/10",
    hover: "hover:border-amber-500/35",
    year: "2026",
    groupIdx: 1,
  },
  {
    title: "Consistent Dean's Lister",
    org: "University of Makati",
    desc: "Recognized for proving exemplary academic performance as a consistent Dean's Lister in the Bachelor of Science in Information Technology program.",
    icon: Award,
    cls: "text-violet-400",
    bg: "from-violet-500/20 to-purple-900/10",
    hover: "hover:border-violet-500/35",
    year: "2022–2026",
    groupIdx: 2,
  },
  {
    title: "Graduate with High Honors",
    org: "Maximo Estrella Senior High School",
    desc: "Awarded Certificate of Recognition With High Honors for commendable academic performance in the STEM Strand, School Year 2021–2022, issued by the Department of Education, National Capital Region.",
    icon: Star,
    cls: "text-emerald-400",
    bg: "from-emerald-500/20 to-teal-900/10",
    hover: "hover:border-emerald-500/35",
    year: "2022",
    groupIdx: 3,
  },
];

export const SEMINARS = [
  { name: "AWS User Group BuildHers+ Philippines: Breaking In & Building Forward", year: "2026" },
  { name: "AWS User Group BuildHers+ Philippines: HERmazing Race: Run the World", year: "2026" },
  { name: "AWS User Group BuildHers+ Summit", year: "2025" },
  { name: "K8SUG Philippines: AWS Collab Workshop", year: "2025" },
  { name: "PICSPro: The Human Firewall - First Line of Cyber Defense", year: "2025" },
  { name: "SHE++ Workshop on Leadership and Technopreneurial Mindset (University of Makati)", year: "2025" },
  { name: "SHE++ Masterclass on Alibaba Cloud System (University of Makati)", year: "2025" }
];

export const REFERENCES = [
  { name: "Famela S. Boy", role: "Technical Lead", company: "Barhead, an Akkodis Company", phone: "09175519953" },
  { name: "Mark Kevin Boy", role: "Full-Stack Software Engineer", company: "Manulife IT Delivery Center Asia Inc.", phone: "09954335359" },
  { name: "Jesus Perry L. Caudilla", role: "Associate Professor", company: "University of Makati", phone: "09260352432" },
  { name: "Fred Mark Salido", role: "Internship Supervisor / GM", company: "Flag City Properties Inc.", phone: "09685566547" }
];
