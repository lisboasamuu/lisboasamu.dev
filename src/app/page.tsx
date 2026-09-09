import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { CvButton } from "@/components/cv-button";
import { EmailComposer } from "@/components/email-composer";
import { ProjectList } from "@/components/project-list";
import { RandomFact } from "@/components/random-fact";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  careerFlow,
  experiences,
  services,
  skillGroups,
  socials,
} from "@/data/portfolio";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden="true" />
          <div className="shell hero-shell">
            <div className="hero-topline">
              <span>SOFTWARE ENGINEERING / AUTOMATION / AI</span>
              <span>PIRACICABA, SÃO PAULO — BRAZIL</span>
            </div>

            <div className="hero-title-wrap">
              <p className="hero-kicker">PERSONAL SPACE / 2026</p>
              <div className="hero-identity">
                <h1 id="hero-title">
                  <span>SAMUEL</span>
                  <span>LISBOA</span>
                </h1>
                <figure className="hero-portrait">
                  <Image
                    src="/images/profile/samuel-lisboa.png"
                    alt="Retrato de Samuel Lisboa"
                    width={1145}
                    height={1374}
                    priority
                  />
                  <figcaption>PROFILE / 2026</figcaption>
                </figure>
              </div>
              <p className="hero-nickname">or just &apos;samuca&apos;</p>
            </div>

            <div className="hero-bottom">
              <div className="hero-copy">
                <p>
                  Construo software, automações e soluções inteligentes para
                  transformar processos e problemas reais em produtos digitais.
                </p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#work">
                    Ver projetos <ArrowDown size={17} aria-hidden="true" />
                  </a>
                  <CvButton />
                </div>
                <div className="hero-socials">
                  {socials.slice(0, 2).map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.label} <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="hero-status" aria-label="Status atual">
                <div>
                  <span>CURRENTLY</span>
                  <strong>BUILDING</strong>
                  <p>Código NS</p>
                </div>
                <div>
                  <span>STUDYING</span>
                  <strong>SOFTWARE ENGINEERING</strong>
                  <p>UAM</p>
                </div>
                <div>
                  <span>EXPLORING</span>
                  <strong>AI ENGINEERING</strong>
                  <p>Applied systems</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="shell">
            <SectionHeading
              index="01"
              eyebrow="ABOUT / SOBRE"
              title="Engenharia aplicada a problemas reais."
            />
            <div className="about-grid">
              <Reveal className="about-copy">
                <p>
                  Sou Samuel Lisboa, nascido em Paracambi, Rio de Janeiro.
                  Completamente apaixonado por tecnologia e por tudo que ela pode
                  trazer a nós.
                </p>
                <p>
                  Estudante de Engenharia de Software e profissional de Melhoria
                  Contínua. Minha área de interesse está na interseção entre
                  software, automação, inteligência artificial e operações.
                </p>
                <p>
                  Gosto de encontrar processos manuais, entender onde existe
                  desperdício e transformar essas necessidades em sistemas mais
                  simples, rápidos e confiáveis.
                </p>
                <RandomFact />
              </Reveal>

              <Reveal className="facts-grid" delay={0.08}>
                {[
                  ["BASED IN", "Piracicaba, São Paulo — Brasil"],
                  ["STUDYING", "Software Engineering — UAM"],
                  ["FOCUS", "Software · Automation · AI"],
                  ["BUILDING", "Código NS"],
                ].map(([label, value]) => (
                  <div key={label} className="fact">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section id="work" className="section section-surface">
          <div className="shell">
            <SectionHeading
              index="02"
              eyebrow="WORK"
              title="Selected work"
              description="Sistemas, automações e produtos que construí."
            />
            <ProjectList compact />
          </div>
        </section>

        <section id="experience" className="section">
          <div className="shell">
            <SectionHeading index="03" eyebrow="EXPERIENCE" title="Experiência" />
            <div className="experience-layout">
              <div className="timeline">
                {experiences.map((experience, index) => (
                  <Reveal key={experience.period} delay={index * 0.05}>
                    <article className="timeline-item">
                      <div className="timeline-date">{experience.period}</div>
                      <div className="timeline-content">
                        <h3>{experience.role}</h3>
                        <p className="timeline-company">{experience.company}</p>
                        <p>{experience.summary}</p>
                        <div className="tag-list">
                          {experience.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal className="career-flow">
                <span className="meta-label">SYSTEM / EVOLUTION</span>
                {careerFlow.map((step, index) => (
                  <div key={step}>
                    <strong>{step}</strong>
                    {index < careerFlow.length - 1 ? <span>↓</span> : null}
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-surface">
          <div className="shell">
            <SectionHeading
              index="04"
              eyebrow="CAPABILITIES"
              title="Skills por domínio"
            />
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <Reveal key={group.title} delay={index * 0.03}>
                  <article className="skill-group">
                    <h3>{group.title}</h3>
                    <div>
                      {group.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <SectionHeading
              index="05"
              eyebrow="EDUCATION"
              title="Formação"
            />
            <Reveal>
              <article className="education-card">
                <div>
                  <span className="meta-label">CURRENT</span>
                  <h3>SOFTWARE ENGINEERING</h3>
                </div>
                <p>Universidade Anhembi Morumbi — UAM</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section id="services" className="section section-surface">
          <div className="shell">
            <SectionHeading
              index="06"
              eyebrow="WHAT I BUILD"
              title="Do problema à solução digital."
            />
            <div className="services-grid">
              {services.map((service, index) => (
                <Reveal key={service.number} delay={index * 0.04}>
                  <article className="service-card">
                    <span>{service.number}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className="services-cta">
              <p>TEM ALGUM PROCESSO QUE PODERIA VIRAR SOFTWARE?</p>
              <a className="text-link" href={siteConfig.emailHref}>
                Vamos conversar <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="venture-section">
          <div className="shell venture-grid">
            <div>
              <span className="section-label">VENTURE / 2026</span>
              <h2>CÓDIGO NS</h2>
            </div>
            <div className="venture-content">
              <div className="venture-disciplines" aria-label="Áreas da Código NS">
                {["WEB", "SOFTWARE", "AUTOMATION", "AI", "DESIGN"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p>
                Também estou construindo a Código NS, iniciativa voltada à criação
                de soluções digitais para empresas e pequenos negócios.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="shell contact-grid">
            <div>
              <span className="section-label">07 / CONTACT</span>
              <h2>TEM ALGO PRA CONSTRUIR?</h2>
              <p className="contact-intro">
                Escreva do jeito que vier. O botão só prepara o email e abre o
                Gmail — nenhuma mensagem passa por servidor deste site.
              </p>
              <div className="contact-socials">
                <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a href={siteConfig.github} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a href={siteConfig.emailHref}>{siteConfig.email}</a>
              </div>
            </div>
            <EmailComposer />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
