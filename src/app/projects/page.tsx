import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectList } from "@/components/project-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos selecionados de Samuel Lisboa em software, automação e inteligência artificial.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <section className="page-hero">
          <div className="shell">
            <Link className="back-link" href="/">
              <ArrowLeft size={15} aria-hidden="true" /> Início
            </Link>
            <div className="page-title-grid">
              <span className="section-label">ARCHIVE / V1</span>
              <div>
                <h1>PROJECTS</h1>
                <p>
                  Software, automações e iniciativas construídas na interseção entre
                  engenharia, operações e inteligência artificial.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-surface">
          <div className="shell">
            <ProjectList />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
