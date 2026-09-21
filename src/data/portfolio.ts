import { siteConfig } from "@/lib/site";

export type ProjectMedia = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  status: string;
  year?: string;
  note?: string;
  media?: ProjectMedia[];
  href?: string;
  linkLabel?: string;
  links?: ProjectLink[];
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
    name: "Código-S Negócios",
    category: "BUSINESS / WEB / MANAGEMENT",
    description:
      "Iniciativa voltada à criação de sites e landing pages profissionais para negócios, com foco em presença digital, agendamentos, visitas, depoimentos, gestão centralizada e experiência moderna para o cliente.",
    stack: [
      "Sites profissionais",
      "Landing pages",
      "Agendamentos",
      "Gestão centralizada",
      "Dashboards",
      "Next.js",
    ],
    year: "2026",
    status: "BUILDING / CASES LIVE",
    note:
      "Visão 2.0: análise automatizada dos dados do negócio com inteligência artificial.",
    media: [
      {
        src: "/images/projects/codigo-s-negocios/banner.png",
        alt: "Banner da iniciativa Código-S Negócios com exemplos de sites profissionais para diferentes segmentos.",
        width: 1672,
        height: 941,
      },
    ],
  },
  {
    number: "02",
    name: "Site para clínica",
    category: "WEB / HEALTH / APPOINTMENTS",
    description:
      "Landing page moderna para clínica de estética, com foco em presença digital profissional, apresentação de tratamentos, diferenciais da marca e agendamento online.",
    stack: [
      "Landing Page",
      "Agendamento",
      "Responsive Design",
      "UI/UX",
      "Next.js",
    ],
    year: "2026",
    status: "LIVE",
    href: "https://clinica.lisboasamu.com/clinica-lisboa/",
    linkLabel: "Acessar site da clínica",
    media: [
      {
        src: "/images/projects/clinica/mockup.png",
        alt: "Mockup do site para clínica exibido em desktop e mobile.",
        width: 1086,
        height: 1448,
      },
    ],
  },
  {
    number: "03",
    name: "Site para veterinária",
    category: "WEB / VETERINARY / APPOINTMENTS",
    description:
      "Site institucional e de agendamento para clínica veterinária, com linguagem acolhedora, apresentação de serviços, experiência mobile e foco em confiança para os tutores.",
    stack: [
      "Landing Page",
      "Agendamento",
      "Responsive Design",
      "Branding",
      "Next.js",
    ],
    year: "2026",
    status: "LIVE",
    href: "https://veterinaria.lisboasamu.com/aurora/",
    linkLabel: "Acessar site da veterinária",
    media: [
      {
        src: "/images/projects/veterinaria/mockup.png",
        alt: "Mockup do site para veterinária exibido em desktop e mobile.",
        width: 1254,
        height: 1254,
      },
    ],
  },
  {
    number: "04",
    name: "Site para barbearia",
    category: "WEB / BARBERSHOP / APPOINTMENTS",
    description:
      "Site de alta presença visual para barbearia, com identidade forte, vitrine dos serviços, experiência responsiva e fluxo de agendamento online.",
    stack: [
      "Landing Page",
      "Agendamento",
      "Responsive Design",
      "Brand Identity",
      "Next.js",
    ],
    year: "2026",
    status: "LIVE",
    href: "https://barbearia.lisboasamu.com/barbearia-lisboa/",
    linkLabel: "Acessar site da barbearia",
    media: [
      {
        src: "/images/projects/barbearia/mockup.png",
        alt: "Mockup do site para barbearia exibido em desktop e mobile.",
        width: 1086,
        height: 1448,
      },
    ],
  },
  {
    number: "05",
    name: "Operational Automation Suite",
    category: "AUTOMATION / OPERATIONS",
    description:
      "Conjunto de soluções desenvolvidas para reduzir atividades operacionais repetitivas, organizar informações e automatizar fluxos e relatórios.",
    stack: ["Python", "Selenium", "Pandas", "OpenPyXL", "RPA"],
    status: "PROFESSIONAL WORK",
    note:
      "Interface ilustrativa. Informações sensíveis e elementos internos foram removidos ou anonimizados.",
    media: [
      {
        src: "/images/projects/automation-suite/file-recovery-automation.png",
        alt: "Interface ilustrativa de automação para recuperação de arquivos, com dados internos removidos.",
      },
      {
        src: "/images/projects/automation-suite/reporting-automation.png",
        alt: "Interface ilustrativa de automação de relatórios, com dados internos removidos.",
      },
    ],
  },
  {
    number: "06",
    name: "Operational AI Assistants",
    category: "AI / AUTOMATION",
    description:
      "Assistentes e agentes baseados em inteligência artificial criados para consulta de conhecimento, suporte operacional e automatização de atividades.",
    stack: [
      "AI",
      "Agents",
      "Knowledge Systems",
      "Prompt Engineering",
      "Automation",
    ],
    status: "EXPLORATION / BUILDING",
    note:
      "Informações corporativas, clientes, métricas e ferramentas internas não são publicadas.",
  },
];

export const experiences: Experience[] = [
  {
    period: "2025 — PRESENT",
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
  {
    label: "Operações",
    description:
      "Atuação em operações de alta complexidade, com análise de demandas críticas, suporte especializado e resolução de casos que exigem leitura cuidadosa do processo e tomada de decisão operacional.",
    stack: "OPERAÇÕES · ANÁLISE · RESOLUÇÃO DE CASOS",
  },
  {
    label: "Identificação de problemas",
    description:
      "Mapeio gargalos, manualidades, retrabalho e pontos de atrito na operação. Transformo dores do dia a dia em problemas bem definidos, requisitos e oportunidades de melhoria — incluindo mais de 15 oportunidades de automação já identificadas e documentadas.",
    stack: "PROCESS MAPPING · ROOT CAUSE · OPPORTUNITY DISCOVERY",
  },
  {
    label: "Melhoria contínua",
    description:
      "Redesenho fluxos e proponho melhorias para tornar processos mais simples, rápidos e confiáveis. Conecto conhecimento operacional, dados e tecnologia para gerar ganhos de produtividade, qualidade e experiência no trabalho.",
    stack: "PROCESS IMPROVEMENT · EFFICIENCY · STANDARDIZATION",
  },
  {
    label: "Automação",
    description:
      "Criei 3 soluções em Python e RPA para reduzir tarefas repetitivas e manualidades operacionais. Em processos específicos, essas soluções contribuíram para reduções de até 40% no tempo de atendimento.",
    stack: "PYTHON · SELENIUM · PANDAS · OPENPYXL · RPA",
  },
  {
    label: "Software",
    description:
      "Desenvolvo sistemas e ferramentas digitais voltados a problemas reais, conectando interface, backend, dados e integrações. Entre os projetos, construo soluções web e uma plataforma de atendimento e agendamentos integrada ao WhatsApp.",
    stack: "TYPESCRIPT · NODE.JS · REACT / NEXT.JS · POSTGRESQL · APIS",
  },
  {
    label: "IA",
    description:
      "Criei 2 agentes Copilot aplicados ao trabalho: um para geração de imagens dentro de padrões definidos e outro baseado em conhecimento operacional, criado para apoiar consultas, dúvidas e atividades do dia a dia.",
    stack: "AI AGENTS · COPILOT · PROMPT ENGINEERING · KNOWLEDGE SYSTEMS",
  },
] as const;
