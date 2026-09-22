import type {
  WebsiteImpact,
  WebsiteInput,
} from "./types";

import {
  clampNumber,
  MONTHS_PER_YEAR,
  percentage,
  safeResult,
} from "./utils";

export function calculateWebsiteImpact(
  input: WebsiteInput,
): WebsiteImpact {
  const monthlyLeads = clampNumber(
    input.monthlyLeads,
    0,
    10_000_000,
  );

  const averageTicket = clampNumber(
    input.averageTicket,
    0,
    100_000_000,
  );

  const conversionRate = clampNumber(
    input.conversionRate,
    0,
    100,
  );

  const increasePercent = clampNumber(
    input.opportunityIncreasePercent,
    0,
    100,
  );

  const currentClientsMonthly =
    monthlyLeads * percentage(conversionRate);

  const newOpportunitiesMonthly =
    monthlyLeads * percentage(increasePercent);

  const additionalClientsMonthly =
    newOpportunitiesMonthly *
    percentage(conversionRate);

  const potentialMonthlyRevenue =
    additionalClientsMonthly * averageTicket;

  return {
    monthlyLeads,

    currentClientsMonthly:
      safeResult(currentClientsMonthly),

    newOpportunitiesMonthly:
      safeResult(newOpportunitiesMonthly),

    additionalClientsMonthly:
      safeResult(additionalClientsMonthly),

    additionalClientsAnnual:
      safeResult(
        additionalClientsMonthly * MONTHS_PER_YEAR,
      ),

    potentialMonthlyRevenue:
      safeResult(potentialMonthlyRevenue),

    potentialAnnualRevenue:
      safeResult(
        potentialMonthlyRevenue * MONTHS_PER_YEAR,
      ),

    conversionRate,
    opportunityIncreasePercent: increasePercent,
  };
}