import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { CvButton } from "@/components/cv-button";
import {
  certifications,
  experiences,
  projects,
  skillGroups,
} from "@/data/portfolio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resumo profissional de Samuel Lisboa — Software Engineering, Automation & AI.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-shell">
        <header className="resume-header">
          <div>
            <Link className="back-link no-print" href="/">
              <ArrowLeft size={15} aria-hidden="true" /> Portfolio
            </Link>
            <h1>SAMUEL LISBOA</h1>
            <p className="resume-descriptor">
              SOFTWARE ENGINEERING · AUTOMATION · ARTIFICIAL INTELLIGENCE
            </p>
          </div>

          <div className="resume-actions no-print">
            <CvButton compact />
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href={siteConfig.emailHref}>
              Email <Mail size={14} aria-hidden="true" />
            </a>
          </div>
        </header>

        <section className="resume-section">
          <h2>SOBRE</h2>
          <p className="resume-lead">
            Estudante de Engenharia de Software e profissional de Melhoria
            Contínua, com atuação e interesse na interseção entre software,
            automação, inteligência artificial e operações. Foco em transformar
            processos manuais e problemas reais em sistemas mais simples,
            rápidos e confiáveis.
          </p>
        </section>

        <section className="resume-section">
          <h2>EXPERIÊNCIA</h2>
          <div className="resume-list">
            {experiences.map((experience) => (
              <article key={experience.period} className="resume-item">
                <div>
                  <span>{experience.period}</span>
                </div>
                <div>
                  <h3>{experience.role}</h3>
                  <strong>{experience.company}</strong>
                  <p>{experience.summary}</p>
                  <p className="resume-tags">{experience.tags.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>PROJETOS PRINCIPAIS</h2>
          <div className="resume-list">
            {projects.map((project) => (
              <article key={project.number} className="resume-item">
                <div>
                  <span>{project.number}</span>
                </div>
                <div>
                  <h3>{project.name}</h3>
                  <strong>{project.category}</strong>
                  <p>{project.description}</p>
                  <p className="resume-tags">{project.stack.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>SKILLS</h2>
          <div className="resume-skills">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section resume-two-col">
          <div>
            <h2>FORMAÇÃO</h2>
            <h3>SOFTWARE ENGINEERING</h3>
            <p>Universidade Anhembi Morumbi — UAM</p>
          </div>
          <div>
            <h2>CERTIFICAÇÕES</h2>
            <ul>
              {certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>CONTATO</h2>
          <div className="resume-contact">
            <a href={siteConfig.emailHref}>{siteConfig.email}</a>
            <a href={siteConfig.github}>{siteConfig.github}</a>
            <a href={siteConfig.linkedin}>{siteConfig.linkedin}</a>
            <span>São Paulo, Brasil</span>
          </div>
        </section>
      </div>
    </main>
  );
}
