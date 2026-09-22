import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { EmailComposer } from "@/components/email-composer";

export const metadata: Metadata = {
  title: "Demos | Lisboa.Samu",
  description:
    "Demonstrações de sites profissionais desenvolvidos por Samuel Lisboa.",
};

const demos = [
  {
    number: "01",
    category: "SAÚDE / ESTÉTICA",
    title: "Site para clínica",
    description:
      "Presença digital profissional, apresentação de tratamentos, diferenciais e fluxo de agendamento.",
    href: "https://clinica.lisboasamu.com/clinica-lisboa/",
  },
  {
    number: "02",
    category: "SAÚDE ANIMAL",
    title: "Site para veterinária",
    description:
      "Experiência acolhedora e responsiva para apresentar serviços e facilitar o agendamento da clínica.",
    href: "https://veterinaria.lisboasamu.com/aurora/",
  },
  {
    number: "03",
    category: "SERVIÇOS / BARBEARIA",
    title: "Site para barbearia",
    description:
      "Identidade forte, vitrine de serviços e agendamento online pensado para desktop e celular.",
    href: "https://barbearia.lisboasamu.com/barbearia-lisboa/",
  },
] as const;

export default function DemoPage() {
  return (
    <main className="demo-page">
      <div className="demo-glow" aria-hidden="true" />

      <div className="demo-shell">
        <header className="demo-header">
          <Link href="/" className="demo-brand">
            <span>//</span> LISBOA.SAMU
          </Link>

          <Link href="/" className="demo-back">
            <ArrowLeft size={15} aria-hidden="true" />
            PORTFÓLIO
          </Link>
        </header>

        <section className="demo-hero">
          <p className="demo-kicker">CÓDIGO-S / DEMOS</p>

          <h1>
            Sites que transformam
            <span> presença em negócio.</span>
          </h1>

          <p className="demo-intro">
            Demonstrações de experiências digitais criadas para negócios.
            Escolha um projeto abaixo e navegue pelo site completo.
          </p>
        </section>

        <section className="demo-grid">
          {demos.map((demo) => (
            <a
              key={demo.href}
              href={demo.href}
              target="_blank"
              rel="noreferrer"
              className="demo-card"
            >
              <div className="demo-card-head">
                <span>{demo.number}</span>
                <span>{demo.category}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>

              <div className="demo-card-content">
                <h2>{demo.title}</h2>
                <p>{demo.description}</p>
              </div>

              <div className="demo-card-link">
                ABRIR DEMONSTRAÇÃO
                <ArrowUpRight size={14} aria-hidden="true" />
              </div>
            </a>
          ))}
        </section>

        <section className="demo-contact">
          <div className="demo-contact-copy">
            <p className="demo-kicker">CONTATO</p>

            <h2>Quer algo assim para o seu negócio?</h2>

            <p>
              Me conte o que você precisa. O formulário usa o mesmo contato
              do meu portfólio e não adiciona nenhum backend ao site.
            </p>
          </div>

          <EmailComposer />
        </section>

        <footer className="demo-footer">
          <span>LISBOA.SAMU / 2026</span>

          <Link href="/">
            VER PORTFÓLIO COMPLETO →
          </Link>
        </footer>
      </div>
    </main>
  );
}