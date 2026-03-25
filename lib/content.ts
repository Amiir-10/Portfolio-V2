export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  primaryTech: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: "languages" | "frameworks" | "tools" | "other";
}

export interface SocialLink {
  platform: "email" | "github" | "linkedin" | "whatsapp";
  url: string;
  label: string;
  icon: string;
}

export const personalInfo = {
  name: "Amir Hany",
  title: "Computer Engineer & Developer",
  bio: [
    "I'm a Computer Engineering student at the German University in Cairo, passionate about building things that live on the web.",
    "I love crafting interactive, performant experiences — from scroll animations to full-stack applications. Every pixel and every millisecond matters.",
    "When I'm not coding, I'm exploring new technologies and pushing the boundaries of what's possible in the browser.",
  ],
};

export const projects: Project[] = [
  {
    id: "face-recognition",
    title: "Face Recognition System",
    description: "Real-time face detection and identification from a live camera feed with confidence scoring.",
    longDescription: "A real-time face recognition system using Python, OpenCV, and dlib. Detects, labels, and registers faces from a live webcam feed with simultaneous multi-face labeling, confidence scoring, live registration, bulk image importing, and persistent database storage across sessions. Supports optional GPU acceleration via CUDA.",
    techStack: ["Python", "OpenCV", "dlib", "NumPy"],
    primaryTech: "Python",
    githubUrl: "https://github.com/Amiir-10/face-recognition-demo",
  },
  {
    id: "pms",
    title: "Patient Management System",
    description: "A PWA for doctors to track patient visits, measurements, and diagnoses.",
    longDescription: "A Progressive Web App built with Vue and TypeScript that enables healthcare providers to maintain patient records including visit history, vital sign measurements, and clinical diagnoses through a web-based interface accessible offline. Deployed on Vercel.",
    techStack: ["TypeScript", "Vue", "Vite"],
    primaryTech: "Vue",
    githubUrl: "https://github.com/Amiir-10/PMS",
    liveUrl: "https://pms-theta-flax.vercel.app",
  },
  {
    id: "portfolio-v1",
    title: "Portfolio V1",
    description: "Personal portfolio with smooth animations and modern UI components.",
    longDescription: "First iteration of my personal portfolio built with Next.js 14, featuring Framer Motion animations, Lenis smooth scrolling, and components from Aceternity UI and Magic UI for a polished, interactive experience.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Lenis"],
    primaryTech: "Next.js",
    githubUrl: "https://github.com/Amiir-10/Portfolio",
    liveUrl: "https://portfolio-one-gilt-53.vercel.app",
  },
  {
    id: "zapvent",
    title: "Zapvent",
    description: "University event management system with multi-role portals and Stripe payments.",
    longDescription: "A full-stack event management platform for universities that unifies event planning, vendor coordination, ticketing, and student engagement. Features multi-role authentication, wallet and mixed payment processing via Stripe, attendance tracking, vendor onboarding, and reporting dashboards. Built with Next.js 14, MongoDB, and Material UI.",
    techStack: ["Next.js", "MongoDB", "Stripe", "Material UI"],
    primaryTech: "MongoDB",
    githubUrl: "https://github.com/ahmedbr1/Zapvent",
  },
  {
    id: "processor-simulator",
    title: "Processor Simulator",
    description: "5-stage pipeline CPU simulator that assembles and executes custom assembly code.",
    longDescription: "An educational processor simulator written in C that reads assembly code, translates it into machine code, and executes it through a detailed 5-stage pipeline (IF, ID, EX, MEM, WB). Supports 12 instruction types across R-Type, I-Type, and J-Type formats, with 2048-word memory simulation, 31 general-purpose registers, and color-coded pipeline stage logging.",
    techStack: ["C", "C++", "CMake", "Assembly"],
    primaryTech: "C",
    githubUrl: "https://github.com/FamALouiz/processor-simulator",
  },
];

export const skills: Skill[] = [
  { name: "TypeScript", icon: "SiTypescript", category: "languages" },
  { name: "JavaScript", icon: "SiJavascript", category: "languages" },
  { name: "Python", icon: "SiPython", category: "languages" },
  { name: "C++", icon: "SiCplusplus", category: "languages" },
  { name: "Java", icon: "SiOpenjdk", category: "languages" },
  { name: "React", icon: "SiReact", category: "frameworks" },
  { name: "Next.js", icon: "SiNextdotjs", category: "frameworks" },
  { name: "Node.js", icon: "SiNodedotjs", category: "frameworks" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", category: "frameworks" },
  { name: "Git", icon: "SiGit", category: "tools" },
  { name: "VS Code", icon: "SiVscodium", category: "tools" },
  { name: "Figma", icon: "SiFigma", category: "tools" },
  { name: "Vercel", icon: "SiVercel", category: "tools" },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "email",
    url: "mailto:amirhany.business@gmail.com",
    label: "Email",
    icon: "LuMail",
  },
  {
    platform: "github",
    url: "https://github.com/Amiir-10",
    label: "GitHub",
    icon: "LuGithub",
  },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/amirrhanyy1/",
    label: "LinkedIn",
    icon: "LuLinkedin",
  },
  {
    platform: "whatsapp",
    url: "https://wa.me/491628871218",
    label: "WhatsApp",
    icon: "LuMessageCircle",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
