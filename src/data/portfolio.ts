import { siteConfig } from "@/lib/site";

export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  status: string;
  year?: string;
  note?: string;
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  summary: string;
  tags: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Service = {
  number: string;
  title: string;
  description: string;
};

export const navigation = [
  { label: "Sobre", href: "/#about" },
  { label: "Projetos", href: "/#work" },
  { label: "Experiência", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Serviços", href: "/#services" },
  { label: "Contato", href: "/#contact" },
] as const;

export const socials = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Email", href: siteConfig.emailHref },
] as const;

export const projects: Project[] = [
  {
    number: "01",
    name: "NS Chat Platform",
    category: "FULL-STACK / COMMUNICATION",
    description:
      "Plataforma full-stack para gerenciamento de atendimento, clientes, conversas e agendamentos através do WhatsApp.",
    stack: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "React / Next.js",
      "WhatsApp Integration"
    ],
    status: "IN DEVELOPMENT",
  },
  {
    number: "02",
    name: "Operational Automation Suite",
    category: "AUTOMATION / OPERATIONS",
    description:
      "Conjunto de soluções desenvolvidas para reduzir atividades operacionais repetitivas, organizar informações e automatizar fluxos e relatórios.",
    stack: ["Python", "Selenium", "Pandas", "OpenPyXL", "RPA"],
    status: "PROFESSIONAL WORK",
    note:
      "Interface ilustrativa. Informações sensíveis e elementos internos foram removidos ou anonimizados.",
  },
  {
    number: "03",
    name: "Operational AI Assistants",
    category: "AI / AUTOMATION",
    description:
      "Assistentes e agentes baseados em inteligência artificial criados para consulta de conhecimento, suporte operacional e automatização de atividades.",
    stack: [
      "AI",
      "Agents",
      "Knowledge Systems",
      "Prompt Engineering",
      "Automation"
    ],
    status: "EXPLORATION / BUILDING",
    note:
      "Informações corporativas, clientes, métricas e ferramentas internas não são publicadas.",
  },
  {
    number: "04",
    name: "Código NS",
    category: "ENTREPRENEURSHIP / SOFTWARE / AUTOMATION / AI",
    description:
      "Iniciativa criada para desenvolver soluções digitais em desenvolvimento web, software, automação, inteligência artificial e design.",
    stack: ["Web", "Software", "Automation", "AI", "Design"],
    year: "2026",
    status: "BUILDING",
  },
];

export const experiences: Experience[] = [
  {
    period: "2026 — PRESENT",
    role: "ESPECIALISTA DE MELHORIA CONTÍNUA",
    company: "TOOLS DS | Santander Brasil",
    summary:
      "Atuação em automação de processos, inteligência artificial e eficiência operacional, desenvolvendo soluções tecnológicas voltadas à redução de atividades manuais e otimização de fluxos.",
    tags: ["AUTOMATION", "PYTHON", "AI", "PROCESS IMPROVEMENT"],
  },
  {
    period: "2025 — JAN 2026",
    role: "ESPECIALISTA DE OPERAÇÕES",
    company: "TOOLS DS | Santander Brasil",
    summary:
      "Atuação especializada em operações críticas, resolução de demandas complexas e suporte operacional.",
    tags: ["OPERATIONS", "ANALYSIS", "PROBLEM SOLVING"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "ENGINEERING",
    items: ["TypeScript", "JavaScript", "Python", "Node.js", "Git", "Linux"],
  },
  {
    title: "BACKEND & DATA",
    items: ["PostgreSQL", "Prisma", "REST APIs", "Data Modeling"],
  },
  {
    title: "AUTOMATION",
    items: ["Selenium", "RPA", "Pandas", "OpenPyXL", "Process Automation"],
  },
  {
    title: "ARTIFICIAL INTELLIGENCE",
    items: [
      "AI Agents",
      "Copilot",
      "Prompt Engineering",
      "Knowledge Systems",
      "LLM Applications",
    ],
  },
  {
    title: "FRONTEND",
    items: ["React", "Next.js", "HTML", "CSS", "Responsive Design"],
  },
];

export const services: Service[] = [
  {
    number: "01",
    title: "WEB DEVELOPMENT",
    description:
      "Sites, landing pages, dashboards e aplicações web responsivas.",
  },
  {
    number: "02",
    title: "AUTOMATION",
    description:
      "Automação de processos, atividades administrativas e tarefas repetitivas.",
  },
  {
    number: "03",
    title: "AI SOLUTIONS",
    description:
      "Assistentes, agentes e aplicações utilizando inteligência artificial.",
  },
  {
    number: "04",
    title: "DATA & REPORTING",
    description:
      "Relatórios, consolidação de dados e fluxos automatizados.",
  },
];

export const certifications = [
  "Citizen RPA",
  "Citizen Power Platform",
  "Citizen Maisa IA",
] as const;

export const careerFlow = [
  "Operações",
  "Identificação de problemas",
  "Melhoria contínua",
  "Automação",
  "Software",
  "IA",
] as const;
