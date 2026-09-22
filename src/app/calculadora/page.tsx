import type { Metadata } from "next";

import { ImpactCalculator } from "@/components/impact-calculator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculadora de Impacto | Lisboa.Samu",
  description:
    "Simule o impacto potencial de automação, sites, landing pages, sistemas e aplicativos no seu negócio.",
};

export default function ImpactCalculatorPage() {
  return (
    <>
      <SiteHeader />

      <main className="impact-page">
        <section className="impact-hero">
          <div className="shell impact-hero-grid">
            <div>
              <span className="section-label">
                CÓDIGO-S / IMPACT LAB
              </span>

              <h1>
                CALCULE
                <span> O IMPACTO.</span>
              </h1>

              <p>
                Descubra quanto tempo, dinheiro e
                oportunidades seu negócio pode estar
                deixando na mesa.
              </p>
            </div>

            <aside>
              <span>SIMULAÇÃO / 2026</span>

              <strong>
                Números reais. Promessas, não.
              </strong>

              <p>
                A ferramenta transforma as
                informações que você fornecer em
                cenários estimados de eficiência,
                capacidade e oportunidade.
              </p>
            </aside>
          </div>
        </section>

        <ImpactCalculator
          contactHref={siteConfig.emailHref}
        />
      </main>

      <SiteFooter />
    </>
  );
}