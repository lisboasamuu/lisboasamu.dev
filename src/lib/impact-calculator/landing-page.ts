import type {
  LandingPageImpact,
  LandingPageInput,
} from "./types";

import {
  clampNumber,
  MONTHS_PER_YEAR,
  percentage,
  safeResult,
} from "./utils";

export function calculateLandingPageImpact(
  input: LandingPageInput,
): LandingPageImpact {
  const monthlyTraffic = clampNumber(
    input.monthlyTraffic,
    0,
    10_000_000,
  );

  const averageTicket = clampNumber(
    input.averageTicket,
    0,
    100_000_000,
  );

  const currentConversionRate = clampNumber(
    input.currentConversionRate,
    0,
    100,
  );

  const requestedTarget = clampNumber(
    input.targetConversionRate,
    0,
    100,
  );

  const targetConversionRate = Math.max(
    currentConversionRate,
    requestedTarget,
  );

  const currentConversions =
    monthlyTraffic *
    percentage(currentConversionRate);

  const estimatedConversions =
    monthlyTraffic *
    percentage(targetConversionRate);

  const additionalConversions = Math.max(
    0,
    estimatedConversions - currentConversions,
  );

  const potentialMonthlyRevenue =
    additionalConversions * averageTicket;

  return {
    monthlyTraffic,
    currentConversionRate,
    targetConversionRate,

    currentConversions:
      safeResult(currentConversions),

    estimatedConversions:
      safeResult(estimatedConversions),

    additionalConversions:
      safeResult(additionalConversions),

    potentialMonthlyRevenue:
      safeResult(potentialMonthlyRevenue),

    potentialAnnualRevenue:
      safeResult(
        potentialMonthlyRevenue * MONTHS_PER_YEAR,
      ),
  };
}