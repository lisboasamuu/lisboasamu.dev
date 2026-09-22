import type {
  AutomationImpact,
  AutomationInput,
} from "./types";

import {
  clampNumber,
  MONTHS_PER_YEAR,
  percentage,
  safeResult,
  WEEKS_PER_MONTH,
} from "./utils";

export function calculateAutomationImpact(
  input: AutomationInput,
): AutomationImpact {
  const people = clampNumber(input.people, 1, 10_000, 1);

  const weeklyHours = clampNumber(
    input.weeklyHoursPerPerson,
    0,
    168,
  );

  const hourlyCost = clampNumber(
    input.hourlyCost,
    0,
    1_000_000,
  );

  const automationRate = percentage(
    input.automatablePercent,
  );

  const monthlyHours =
    people * weeklyHours * WEEKS_PER_MONTH;

  const automatedHoursMonthly =
    monthlyHours * automationRate;

  const monthlyCapacity =
    automatedHoursMonthly * hourlyCost;

  return {
    monthlyHours: safeResult(monthlyHours),

    automatedHoursMonthly:
      safeResult(automatedHoursMonthly),

    remainingHoursMonthly:
      safeResult(monthlyHours - automatedHoursMonthly),

    monthlyCapacity:
      safeResult(monthlyCapacity),

    annualCapacity:
      safeResult(monthlyCapacity * MONTHS_PER_YEAR),

    annualHoursReleased:
      safeResult(
        automatedHoursMonthly * MONTHS_PER_YEAR,
      ),
  };
}