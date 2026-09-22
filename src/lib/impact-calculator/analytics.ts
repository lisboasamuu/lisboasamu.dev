import type { SolutionType } from "./types";

export type ImpactAnalyticsEvent =
  | "impact_calculator_started"
  | "impact_solution_selected"
  | "impact_calculator_completed"
  | "impact_cta_clicked"
  | "impact_demo_clicked";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackImpactEvent(
  event: ImpactAnalyticsEvent,
  solution?: SolutionType,
) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    feature: "impact_calculator",
    ...(solution ? { solution } : {}),
  };

  /*
   * Nunca enviar leads, ticket, salários,
   * economia estimada ou qualquer outro
   * dado financeiro.
   */
  window.dataLayer?.push(payload);

  window.dispatchEvent(
    new CustomEvent("codigo-s:analytics", {
      detail: payload,
    }),
  );
}