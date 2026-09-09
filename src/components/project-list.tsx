import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
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
            </div>

            {project.media?.length ? (
              <div
                className={`project-media${project.media.length === 1 ? " project-media-single" : ""}`}
              >
                {project.media.map((media, mediaIndex) => {
                  const isSingleMedia = project.media?.length === 1;

                  return (
                    <figure
                      key={media.src}
                      className={
                        isSingleMedia
                          ? "project-shot project-shot-single"
                          : mediaIndex === 0
                            ? "project-shot project-shot-featured"
                            : "project-shot"
                      }
                    >
                      <Image
                        src={media.src}
                        alt={media.alt}
                        width={isSingleMedia ? 2048 : 1600}
                        height={isSingleMedia ? 682 : 1000}
                        sizes="(max-width: 760px) 100vw, (max-width: 1200px) 75vw, 980px"
                      />
                    </figure>
                  );
                })}
              </div>
            ) : (
              <div className="project-placeholder" aria-hidden="true">
                <span>{project.category.split(" / ")[0]}</span>
                <strong>{project.name}</strong>
                <span>MEDIA / PENDING</span>
              </div>
            )}
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
