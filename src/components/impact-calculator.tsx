"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { useRef, useState } from "react";

import {
  calculateAppImpact,
  calculateAutomationImpact,
  calculateLandingPageImpact,
  calculateSystemImpact,
  calculateWebsiteImpact,
  formatCurrency,
  formatHours,
  formatNumber,
  formatPercent,
  trackImpactEvent,
} from "@/lib/impact-calculator";

import type {
  AppImpact,
  AppInput,
  AutomationImpact,
  AutomationInput,
  LandingPageImpact,
  LandingPageInput,
  SolutionType,
  SystemImpact,
  SystemInput,
  WebsiteImpact,
  WebsiteInput,
} from "@/lib/impact-calculator";

const solutionOptions: Array<{
  value: SolutionType;
  label: string;
  description: string;
}> = [
  {
    value: "automation",
    label: "Automação",
    description:
      "Reduza atividades manuais e libere capacidade operacional.",
  },
  {
    value: "website",
    label: "Site",
    description:
      "Fortaleça sua presença digital e crie novas oportunidades.",
  },
  {
    value: "landing-page",
    label: "Landing Page",
    description:
      "Explore o impacto potencial de uma conversão mais eficiente.",
  },
  {
    value: "system",
    label: "Sistema Completo",
    description:
      "Centralize processos, reduza retrabalho e ganhe eficiência.",
  },
  {
    value: "app",
    label: "Aplicativo",
    description:
      "Projete o ganho de tempo gerado por interações digitais.",
  },
];

const solutionLabels: Record<SolutionType, string> = {
  automation: "Automação",
  website: "Site",
  "landing-page": "Landing Page",
  system: "Sistema Completo",
  app: "Aplicativo",
};

type ResultState =
  | {
      type: "automation";
      data: AutomationImpact;
    }
  | {
      type: "website";
      data: WebsiteImpact;
    }
  | {
      type: "landing-page";
      data: LandingPageImpact;
    }
  | {
      type: "system";
      data: SystemImpact;
    }
  | {
      type: "app";
      data: AppImpact;
    };

type ResultMetric = {
  value: string;
  label: string;
};

type ResultView = {
  title: string;
  description: string;
  metrics: ResultMetric[];
  comparison?: {
    beforeLabel: string;
    beforeValue: number;
    beforeText: string;
    afterLabel: string;
    afterValue: number;
    afterText: string;
  };
  monthlyProjectionValue: number;
  projectionLabel: string;
  contactImpact: string;
  contactFinancial: string;
};

const initialAutomation: AutomationInput = {
  people: 3,
  weeklyHoursPerPerson: 8,
  hourlyCost: 35,
  automatablePercent: 70,
};

const initialWebsite: WebsiteInput = {
  monthlyLeads: 100,
  averageTicket: 500,
  conversionRate: 10,
  opportunityIncreasePercent: 10,
};

const initialLanding: LandingPageInput = {
  monthlyTraffic: 1000,
  currentConversionRate: 2,
  averageTicket: 300,
  targetConversionRate: 3,
};

const initialSystem: SystemInput = {
  collaborators: 5,
  weeklyProcessHours: 30,
  hourlyCost: 35,
  reductionPercent: 40,
  monthlyReworkCount: 8,
  hoursPerRework: 1,
};

const initialApp: AppInput = {
  objective: "service",
  monthlyUsers: 500,
  interactionsPerUser: 4,
  minutesSavedPerInteraction: 3,
  hourlyCost: 35,
};

export function ImpactCalculator({
  contactHref,
}: {
  contactHref: string;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [solution, setSolution] =
    useState<SolutionType>("automation");

  const [automation, setAutomation] =
    useState(initialAutomation);

  const [website, setWebsite] =
    useState(initialWebsite);

  const [landing, setLanding] =
    useState(initialLanding);

  const [system, setSystem] =
    useState(initialSystem);

  const [app, setApp] =
    useState(initialApp);

  const [result, setResult] =
    useState<ResultState | null>(null);

  const started = useRef(false);

  function ensureStarted() {
    if (started.current) return;

    started.current = true;

    trackImpactEvent(
      "impact_calculator_started",
      solution,
    );
  }

  function chooseSolution(value: SolutionType) {
    ensureStarted();

    setSolution(value);
    setResult(null);

    trackImpactEvent(
      "impact_solution_selected",
      value,
    );
  }

  function calculate() {
    let nextResult: ResultState;

    switch (solution) {
      case "automation":
        nextResult = {
          type: "automation",
          data: calculateAutomationImpact(
            automation,
          ),
        };
        break;

      case "website":
        nextResult = {
          type: "website",
          data: calculateWebsiteImpact(website),
        };
        break;

      case "landing-page":
        nextResult = {
          type: "landing-page",
          data:
            calculateLandingPageImpact(landing),
        };
        break;

      case "system":
        nextResult = {
          type: "system",
          data: calculateSystemImpact(system),
        };
        break;

      case "app":
        nextResult = {
          type: "app",
          data: calculateAppImpact(app),
        };
        break;
    }

    setResult(nextResult);
    setStep(3);

    trackImpactEvent(
      "impact_calculator_completed",
      solution,
    );
  }

  function resetCalculator() {
    setResult(null);
    setStep(1);
  }

  const view = result
    ? buildResultView(result)
    : null;

  const contactLink =
    result && view
      ? createContactLink(
          contactHref,
          solutionLabels[result.type],
          view,
        )
      : contactHref;

  return (
    <section className="impact-section">
      <div className="shell impact-shell">
        <div className="impact-progress">
          {[
            ["01", "Solução"],
            ["02", "Seu negócio"],
            ["03", "Impacto"],
          ].map(([number, label], index) => {
            const itemStep = (index + 1) as
              | 1
              | 2
              | 3;

            const active = step >= itemStep;

            return (
              <div
                className={`impact-progress-item${
                  active ? " is-active" : ""
                }`}
                key={number}
              >
                <span>{number}</span>
                <strong>{label}</strong>
              </div>
            );
          })}
        </div>

        {step === 1 ? (
          <div className="impact-panel">
            <div className="impact-panel-heading">
              <span className="impact-micro">
                01 / ESCOLHA
              </span>

              <h2>O que você precisa?</h2>

              <p>
                Selecione a solução que mais se
                aproxima do desafio atual do seu
                negócio.
              </p>
            </div>

            <div className="impact-solutions">
              {solutionOptions.map(
                (option, index) => (
                  <button
                    type="button"
                    key={option.value}
                    className={`impact-solution${
                      solution === option.value
                        ? " is-selected"
                        : ""
                    }`}
                    onClick={() =>
                      chooseSolution(option.value)
                    }
                  >
                    <span>
                      0{index + 1}
                    </span>

                    <div>
                      <strong>
                        {option.label}
                      </strong>

                      <p>
                        {option.description}
                      </p>
                    </div>

                    {solution ===
                    option.value ? (
                      <Check
                        size={18}
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ),
              )}
            </div>

            <div className="impact-navigation impact-navigation-end">
              <button
                type="button"
                className="button button-primary"
                onClick={() => {
                  ensureStarted();
                  setStep(2);
                }}
              >
                CONTINUAR
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="impact-panel">
            <div className="impact-panel-heading">
              <span className="impact-micro">
                02 / CONTEXTO
              </span>

              <h2>
                {solutionLabels[solution]}
              </h2>

              <p>
                Use valores aproximados. A intenção
                é construir um cenário útil, não uma
                promessa de resultado.
              </p>
            </div>

            <div className="impact-form">
              {solution === "automation" ? (
                <>
                  <NumberField
                    label="Quantas pessoas realizam essa atividade?"
                    value={automation.people}
                    min={1}
                    max={10_000}
                    onChange={(people) =>
                      setAutomation((current) => ({
                        ...current,
                        people,
                      }))
                    }
                  />

                  <NumberField
                    label="Quantas horas por semana cada pessoa gasta nessa atividade?"
                    value={
                      automation.weeklyHoursPerPerson
                    }
                    min={0}
                    max={168}
                    suffix="h"
                    onChange={(
                      weeklyHoursPerPerson,
                    ) =>
                      setAutomation((current) => ({
                        ...current,
                        weeklyHoursPerPerson,
                      }))
                    }
                  />

                  <NumberField
                    label="Qual o custo médio estimado da hora desse profissional?"
                    value={automation.hourlyCost}
                    min={0}
                    max={1_000_000}
                    prefix="R$"
                    onChange={(hourlyCost) =>
                      setAutomation((current) => ({
                        ...current,
                        hourlyCost,
                      }))
                    }
                  />

                  <RangeField
                    label="Quanto dessa atividade poderia ser automatizada?"
                    value={
                      automation.automatablePercent
                    }
                    min={10}
                    max={100}
                    onChange={(
                      automatablePercent,
                    ) =>
                      setAutomation((current) => ({
                        ...current,
                        automatablePercent,
                      }))
                    }
                  />
                </>
              ) : null}

              {solution === "website" ? (
                <>
                  <NumberField
                    label="Quantos contatos ou leads seu negócio recebe por mês?"
                    value={website.monthlyLeads}
                    min={0}
                    max={10_000_000}
                    onChange={(monthlyLeads) =>
                      setWebsite((current) => ({
                        ...current,
                        monthlyLeads,
                      }))
                    }
                  />

                  <NumberField
                    label="Qual o ticket médio de uma venda?"
                    value={website.averageTicket}
                    min={0}
                    max={100_000_000}
                    prefix="R$"
                    onChange={(averageTicket) =>
                      setWebsite((current) => ({
                        ...current,
                        averageTicket,
                      }))
                    }
                  />

                  <NumberField
                    label="Quantos desses contatos atualmente viram clientes?"
                    value={website.conversionRate}
                    min={0}
                    max={100}
                    suffix="%"
                    onChange={(conversionRate) =>
                      setWebsite((current) => ({
                        ...current,
                        conversionRate,
                      }))
                    }
                  />

                  <RangeField
                    label="Quanto uma presença digital mais forte poderia aumentar suas oportunidades?"
                    value={
                      website.opportunityIncreasePercent
                    }
                    min={5}
                    max={30}
                    step={5}
                    onChange={(
                      opportunityIncreasePercent,
                    ) =>
                      setWebsite((current) => ({
                        ...current,
                        opportunityIncreasePercent,
                      }))
                    }
                  />
                </>
              ) : null}

              {solution === "landing-page" ? (
                <>
                  <NumberField
                    label="Quantas pessoas chegam à página ou campanha por mês?"
                    value={landing.monthlyTraffic}
                    min={0}
                    max={10_000_000}
                    onChange={(monthlyTraffic) =>
                      setLanding((current) => ({
                        ...current,
                        monthlyTraffic,
                      }))
                    }
                  />

                  <NumberField
                    label="Qual a conversão atual?"
                    value={
                      landing.currentConversionRate
                    }
                    min={0}
                    max={100}
                    suffix="%"
                    step={0.1}
                    onChange={(
                      currentConversionRate,
                    ) =>
                      setLanding((current) => ({
                        ...current,
                        currentConversionRate,
                      }))
                    }
                  />

                  <NumberField
                    label="Qual o ticket médio?"
                    value={landing.averageTicket}
                    min={0}
                    max={100_000_000}
                    prefix="R$"
                    onChange={(averageTicket) =>
                      setLanding((current) => ({
                        ...current,
                        averageTicket,
                      }))
                    }
                  />

                  <NumberField
                    label="Qual a meta de conversão?"
                    value={
                      landing.targetConversionRate
                    }
                    min={0}
                    max={100}
                    suffix="%"
                    step={0.1}
                    onChange={(
                      targetConversionRate,
                    ) =>
                      setLanding((current) => ({
                        ...current,
                        targetConversionRate,
                      }))
                    }
                  />
                </>
              ) : null}

              {solution === "system" ? (
                <>
                  <NumberField
                    label="Quantos colaboradores utilizariam o sistema?"
                    value={system.collaborators}
                    min={1}
                    max={10_000}
                    onChange={(collaborators) =>
                      setSystem((current) => ({
                        ...current,
                        collaborators,
                      }))
                    }
                  />

                  <NumberField
                    label="Quantas horas por semana a equipe gasta nesses processos?"
                    hint="Considere o total somado da equipe."
                    value={
                      system.weeklyProcessHours
                    }
                    min={0}
                    max={
                      168 *
                      Math.max(
                        1,
                        system.collaborators,
                      )
                    }
                    suffix="h"
                    onChange={(
                      weeklyProcessHours,
                    ) =>
                      setSystem((current) => ({
                        ...current,
                        weeklyProcessHours,
                      }))
                    }
                  />

                  <NumberField
                    label="Qual o custo médio da hora operacional?"
                    value={system.hourlyCost}
                    min={0}
                    max={1_000_000}
                    prefix="R$"
                    onChange={(hourlyCost) =>
                      setSystem((current) => ({
                        ...current,
                        hourlyCost,
                      }))
                    }
                  />

                  <RangeField
                    label="Qual percentual desse trabalho poderia ser reduzido?"
                    value={
                      system.reductionPercent
                    }
                    min={10}
                    max={80}
                    onChange={(
                      reductionPercent,
                    ) =>
                      setSystem((current) => ({
                        ...current,
                        reductionPercent,
                      }))
                    }
                  />

                  <NumberField
                    label="Quantos erros ou retrabalhos acontecem por mês?"
                    hint="Opcional."
                    value={
                      system.monthlyReworkCount ??
                      0
                    }
                    min={0}
                    max={1_000_000}
                    onChange={(
                      monthlyReworkCount,
                    ) =>
                      setSystem((current) => ({
                        ...current,
                        monthlyReworkCount,
                      }))
                    }
                  />

                  <NumberField
                    label="Quanto tempo leva para corrigir cada erro?"
                    hint="Opcional."
                    value={
                      system.hoursPerRework ?? 0
                    }
                    min={0}
                    max={168}
                    suffix="h"
                    step={0.25}
                    onChange={(hoursPerRework) =>
                      setSystem((current) => ({
                        ...current,
                        hoursPerRework,
                      }))
                    }
                  />
                </>
              ) : null}

              {solution === "app" ? (
                <>
                  <label className="impact-field">
                    <span>
                      Qual seria o principal objetivo
                      do aplicativo?
                    </span>

                    <select
                      value={app.objective}
                      onChange={(event) =>
                        setApp((current) => ({
                          ...current,
                          objective:
                            event.target.value as AppInput["objective"],
                        }))
                      }
                    >
                      <option value="service">
                        Melhorar atendimento
                      </option>

                      <option value="automation">
                        Automatizar processo
                      </option>

                      <option value="sales">
                        Vender produtos/serviços
                      </option>

                      <option value="customer-channel">
                        Criar canal para clientes
                      </option>

                      <option value="internal">
                        Uso interno da equipe
                      </option>
                    </select>
                  </label>

                  <NumberField
                    label="Usuários estimados por mês"
                    value={app.monthlyUsers}
                    min={0}
                    max={10_000_000}
                    onChange={(monthlyUsers) =>
                      setApp((current) => ({
                        ...current,
                        monthlyUsers,
                      }))
                    }
                  />

                  <NumberField
                    label="Interações ou processos por usuário"
                    value={
                      app.interactionsPerUser
                    }
                    min={0}
                    max={10_000}
                    onChange={(
                      interactionsPerUser,
                    ) =>
                      setApp((current) => ({
                        ...current,
                        interactionsPerUser,
                      }))
                    }
                  />

                  <NumberField
                    label="Tempo médio economizado por interação"
                    value={
                      app.minutesSavedPerInteraction
                    }
                    min={0}
                    max={1440}
                    suffix="min"
                    onChange={(
                      minutesSavedPerInteraction,
                    ) =>
                      setApp((current) => ({
                        ...current,
                        minutesSavedPerInteraction,
                      }))
                    }
                  />

                  <NumberField
                    label="Valor médio da hora operacional"
                    value={app.hourlyCost}
                    min={0}
                    max={1_000_000}
                    prefix="R$"
                    onChange={(hourlyCost) =>
                      setApp((current) => ({
                        ...current,
                        hourlyCost,
                      }))
                    }
                  />
                </>
              ) : null}
            </div>

            <div className="impact-navigation">
              <button
                type="button"
                className="button"
                onClick={() => setStep(1)}
              >
                <ArrowLeft
                  size={16}
                  aria-hidden="true"
                />
                VOLTAR
              </button>

              <button
                type="button"
                className="button button-primary"
                onClick={calculate}
              >
                CALCULAR IMPACTO
                <Sparkles
                  size={16}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 && result && view ? (
          <div className="impact-result">
            <div className="impact-result-heading">
              <div>
                <span className="impact-micro">
                  03 / SEU IMPACTO ESTIMADO
                </span>

                <h2>{view.title}</h2>

                <p>{view.description}</p>
              </div>

              <BarChart3
                size={36}
                aria-hidden="true"
              />
            </div>

            <div className="impact-metrics">
              {view.metrics.map(
                (metric, index) => (
                  <article
                    key={metric.label}
                    className={
                      index === 0
                        ? "impact-metric is-primary"
                        : "impact-metric"
                    }
                  >
                    <strong>
                      {metric.value}
                    </strong>

                    <span>
                      {metric.label}
                    </span>
                  </article>
                ),
              )}
            </div>

            {view.comparison ? (
              <Comparison
                {...view.comparison}
              />
            ) : null}

            <div className="impact-projection">
              <div className="impact-projection-heading">
                <span className="impact-micro">
                  PROJEÇÃO
                </span>

                <strong>
                  {view.projectionLabel}
                </strong>
              </div>

              <div className="impact-projection-grid">
                {[3, 6, 12, 24].map(
                  (months) => (
                    <div key={months}>
                      <span>
                        {months} meses
                      </span>

                      <strong>
                        {formatCurrency(
                          view.monthlyProjectionValue *
                            months,
                        )}
                      </strong>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="impact-disclaimer">
              <strong>
                ESTIMATIVA, NÃO GARANTIA.
              </strong>

              <p>
                Estimativa baseada nas informações
                fornecidas por você. Resultados reais
                dependem de fatores como operação,
                adoção, mercado, implementação e
                características específicas do
                negócio.
              </p>
            </div>

            <div className="impact-final-cta">
              <span className="impact-micro">
                PRÓXIMO PASSO
              </span>

              <h3>
                Agora imagine isso funcionando no
                seu negócio.
              </h3>

              <p>
                Cada operação é diferente. Podemos
                analisar seu processo e descobrir
                onde tecnologia realmente pode gerar
                impacto.
              </p>

              <div>
                <a
                  className="button button-primary"
                  href={contactLink}
                  onClick={() =>
                    trackImpactEvent(
                      "impact_cta_clicked",
                      solution,
                    )
                  }
                >
                  QUERO ANALISAR MEU NEGÓCIO
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                  />
                </a>

                <Link
                  className="button"
                  href="/demo"
                  onClick={() =>
                    trackImpactEvent(
                      "impact_demo_clicked",
                      solution,
                    )
                  }
                >
                  VER DEMOS
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <button
              type="button"
              className="impact-reset"
              onClick={resetCalculator}
            >
              <RotateCcw
                size={14}
                aria-hidden="true"
              />
              FAZER NOVA SIMULAÇÃO
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function NumberField({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="impact-field">
      <span>{label}</span>

      {hint ? <small>{hint}</small> : null}

      <div className="impact-input-wrap">
        {prefix ? (
          <b>{prefix}</b>
        ) : null}

        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) =>
            onChange(
              Number(event.target.value),
            )
          }
        />

        {suffix ? (
          <b>{suffix}</b>
        ) : null}
      </div>
    </label>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="impact-field impact-range-field">
      <span>{label}</span>

      <strong>{value}%</strong>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
      />

      <div>
        <small>{min}%</small>
        <small>{max}%</small>
      </div>
    </label>
  );
}

function Comparison({
  beforeLabel,
  beforeValue,
  beforeText,
  afterLabel,
  afterValue,
  afterText,
}: NonNullable<ResultView["comparison"]>) {
  const maximum = Math.max(
    beforeValue,
    afterValue,
    1,
  );

  return (
    <div className="impact-comparison">
      <span className="impact-micro">
        COMPARAÇÃO
      </span>

      <div>
        <div className="impact-bar-row">
          <header>
            <span>{beforeLabel}</span>
            <strong>{beforeText}</strong>
          </header>

          <div className="impact-bar">
            <i
              style={{
                width: `${
                  (beforeValue / maximum) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <div className="impact-bar-row is-after">
          <header>
            <span>{afterLabel}</span>
            <strong>{afterText}</strong>
          </header>

          <div className="impact-bar">
            <i
              style={{
                width: `${
                  (afterValue / maximum) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function buildResultView(
  result: ResultState,
): ResultView {
  switch (result.type) {
    case "automation": {
      const data = result.data;

      return {
        title:
          "Seu negócio pode recuperar aproximadamente",

        description:
          "Tempo operacional que pode ser redirecionado para atividades que realmente exigem atenção humana.",

        metrics: [
          {
            value: formatHours(
              data.automatedHoursMonthly,
            ),
            label: "liberadas todos os meses",
          },
          {
            value: formatCurrency(
              data.monthlyCapacity,
            ),
            label:
              "em capacidade operacional estimada / mês",
          },
          {
            value: formatHours(
              data.annualHoursReleased,
            ),
            label: "liberadas em 12 meses",
          },
          {
            value: formatCurrency(
              data.annualCapacity,
            ),
            label:
              "em capacidade operacional estimada / ano",
          },
        ],

        comparison: {
          beforeLabel: "HOJE",
          beforeValue: data.monthlyHours,
          beforeText: formatHours(
            data.monthlyHours,
          ),

          afterLabel: "COM AUTOMAÇÃO",
          afterValue:
            data.remainingHoursMonthly,

          afterText: formatHours(
            data.remainingHoursMonthly,
          ),
        },

        monthlyProjectionValue:
          data.monthlyCapacity,

        projectionLabel:
          "Capacidade operacional acumulada",

        contactImpact: `${formatHours(
          data.automatedHoursMonthly,
        )}/mês`,

        contactFinancial: `${formatCurrency(
          data.monthlyCapacity,
        )}/mês`,
      };
    }

    case "website": {
      const data = result.data;

      return {
        title:
          "O impacto potencial de uma presença digital mais forte",

        description:
          "Um cenário baseado no volume atual de contatos, conversão informada e aumento potencial de oportunidades.",

        metrics: [
          {
            value: `+${formatNumber(
              data.newOpportunitiesMonthly,
            )}`,
            label:
              "oportunidades potenciais / mês",
          },
          {
            value: `+${formatNumber(
              data.additionalClientsAnnual,
            )}`,
            label:
              "clientes potenciais adicionais / ano",
          },
          {
            value: formatCurrency(
              data.potentialMonthlyRevenue,
            ),
            label:
              "em oportunidades comerciais / mês",
          },
          {
            value: formatCurrency(
              data.potentialAnnualRevenue,
            ),
            label:
              "em oportunidades comerciais potenciais / ano",
          },
        ],

        comparison: {
          beforeLabel: "OPORTUNIDADES ATUAIS",
          beforeValue: data.monthlyLeads,
          beforeText: formatNumber(
            data.monthlyLeads,
          ),

          afterLabel: "CENÁRIO POTENCIAL",
          afterValue:
            data.monthlyLeads +
            data.newOpportunitiesMonthly,

          afterText: formatNumber(
            data.monthlyLeads +
              data.newOpportunitiesMonthly,
          ),
        },

        monthlyProjectionValue:
          data.potentialMonthlyRevenue,

        projectionLabel:
          "Oportunidades comerciais acumuladas",

        contactImpact: `+${formatNumber(
          data.newOpportunitiesMonthly,
        )} oportunidades/mês`,

        contactFinancial: `${formatCurrency(
          data.potentialMonthlyRevenue,
        )}/mês em oportunidades potenciais`,
      };
    }

    case "landing-page": {
      const data = result.data;

      return {
        title: `De ${formatPercent(
          data.currentConversionRate,
        )} para ${formatPercent(
          data.targetConversionRate,
        )}`,

        description:
          "Este cenário mostra o efeito matemático da meta de conversão informada, mantendo o tráfego e o ticket médio fornecidos.",

        metrics: [
          {
            value: `+${formatNumber(
              data.additionalConversions,
            )}`,
            label:
              "conversões potenciais / mês",
          },
          {
            value: formatCurrency(
              data.potentialMonthlyRevenue,
            ),
            label:
              "em oportunidades / mês",
          },
          {
            value: formatCurrency(
              data.potentialAnnualRevenue,
            ),
            label:
              "em oportunidades potenciais / ano",
          },
        ],

        comparison: {
          beforeLabel: "CONVERSÃO ATUAL",
          beforeValue:
            data.currentConversions,

          beforeText: formatNumber(
            data.currentConversions,
          ),

          afterLabel: "META INFORMADA",
          afterValue:
            data.estimatedConversions,

          afterText: formatNumber(
            data.estimatedConversions,
          ),
        },

        monthlyProjectionValue:
          data.potentialMonthlyRevenue,

        projectionLabel:
          "Oportunidades potenciais acumuladas",

        contactImpact: `+${formatNumber(
          data.additionalConversions,
        )} conversões/mês`,

        contactFinancial: `${formatCurrency(
          data.potentialMonthlyRevenue,
        )}/mês em oportunidades potenciais`,
      };
    }

    case "system": {
      const data = result.data;

      return {
        title:
          "Quanto trabalho um sistema pode centralizar",

        description:
          "Estimativa de capacidade liberada ao reduzir processos manuais e parte do retrabalho informado.",

        metrics: [
          {
            value: formatHours(
              data.currentMonthlyHours,
            ),
            label:
              "processamento atual / mês",
          },
          {
            value: formatHours(
              data.releasedMonthlyHours,
            ),
            label:
              "tempo potencialmente liberado / mês",
          },
          {
            value: formatHours(
              data.releasedAnnualHours,
            ),
            label:
              "capacidade liberada em 12 meses",
          },
          {
            value: formatCurrency(
              data.annualCapacity,
            ),
            label:
              "em capacidade operacional estimada / ano",
          },
        ],

        comparison: {
          beforeLabel: "ANTES",
          beforeValue:
            data.currentMonthlyHours,

          beforeText: formatHours(
            data.currentMonthlyHours,
          ),

          afterLabel: "COM SISTEMA",
          afterValue:
            data.remainingMonthlyHours,

          afterText: formatHours(
            data.remainingMonthlyHours,
          ),
        },

        monthlyProjectionValue:
          data.monthlyCapacity,

        projectionLabel:
          "Capacidade operacional acumulada",

        contactImpact: `${formatHours(
          data.releasedMonthlyHours,
        )}/mês`,

        contactFinancial: `${formatCurrency(
          data.monthlyCapacity,
        )}/mês`,
      };
    }

    case "app": {
      const data = result.data;

      return {
        title:
          "O impacto potencial das interações digitais",

        description:
          "Projeção baseada no uso mensal e no tempo informado como potencialmente economizado por interação.",

        metrics: [
          {
            value: formatNumber(
              data.monthlyInteractions,
            ),
            label: "interações / mês",
          },
          {
            value: formatHours(
              data.monthlyHoursSaved,
            ),
            label:
              "potencialmente liberadas / mês",
          },
          {
            value: formatHours(
              data.annualHoursSaved,
            ),
            label:
              "potencialmente liberadas / ano",
          },
          {
            value: formatCurrency(
              data.annualCapacity,
            ),
            label:
              "em capacidade operacional estimada / ano",
          },
        ],

        monthlyProjectionValue:
          data.monthlyCapacity,

        projectionLabel:
          "Capacidade operacional acumulada",

        contactImpact: `${formatHours(
          data.monthlyHoursSaved,
        )}/mês`,

        contactFinancial: `${formatCurrency(
          data.monthlyCapacity,
        )}/mês`,
      };
    }
  }
}

function createContactLink(
  baseHref: string,
  solution: string,
  view: ResultView,
) {
  const message = [
    "Olá! Fiz a Calculadora de Impacto no site da Código S.",
    "",
    `Solução escolhida: ${solution}`,
    `Impacto estimado: ${view.contactImpact}`,
    `Impacto financeiro estimado: ${view.contactFinancial}`,
    "",
    "Gostaria de conversar sobre uma solução para meu negócio.",
  ].join("\n");

  if (!baseHref.startsWith("mailto:")) {
    return baseHref;
  }

  const separator = baseHref.includes("?")
    ? "&"
    : "?";

  return `${baseHref}${separator}subject=${encodeURIComponent(
    "Código S — análise do meu negócio",
  )}&body=${encodeURIComponent(message)}`;
}