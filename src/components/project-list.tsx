import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import { Reveal } from "./reveal";

type ProjectListProps = {
  compact?: boolean;
};

export function ProjectList({ compact = false }: ProjectListProps) {
  const visibleProjects = compact ? projects.slice(0, 4) : projects;

  return (
    <div className="project-list">
      {visibleProjects.map((project, index) => (
        <Reveal key={project.number} delay={index * 0.04}>
          <article className="project-row">
            <div className="project-index">
              <span>PROJECT_{project.number}</span>
              <span>{project.year ?? "V1"}</span>
            </div>

            <div className="project-main">
              <p className="project-category">{project.category}</p>
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>

              <div className="tag-list" aria-label={`Tecnologias de ${project.name}`}>
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              {project.note ? <p className="privacy-note">{project.note}</p> : null}
            </div>

            <div className="project-meta">
              <span className="meta-label">STATUS</span>
              <strong>{project.status}</strong>
              <div className="mockup" aria-hidden="true">
                <span />
                <span />
                <span />
                <div />
              </div>
            </div>
          </article>
        </Reveal>
      ))}

      {compact ? (
        <Link className="text-link" href="/projects">
          Ver todos os projetos <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
