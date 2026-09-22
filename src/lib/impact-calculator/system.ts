import type {
  SystemImpact,
  SystemInput,
} from "./types";

import {
  clampNumber,
  MONTHS_PER_YEAR,
  percentage,
  safeResult,
  WEEKS_PER_MONTH,
} from "./utils";

export function calculateSystemImpact(
  input: SystemInput,
): SystemImpact {
  const collaborators = clampNumber(
    input.collaborators,
    1,
    10_000,
    1,
  );

  /*
   * Este campo representa o TOTAL semanal
   * somado da equipe, conforme o briefing.
   */
  const weeklyProcessHours = clampNumber(
    input.weeklyProcessHours,
    0,
    168 * collaborators,
  );

  const hourlyCost = clampNumber(
    input.hourlyCost,
    0,
    1_000_000,
  );

  const reductionPercent = clampNumber(
    input.reductionPercent,
    0,
    80,
  );

  const reworkCount = clampNumber(
    input.monthlyReworkCount ?? 0,
    0,
    1_000_000,
  );

  const hoursPerRework = clampNumber(
    input.hoursPerRework ?? 0,
    0,
    168,
  );

  const baseMonthlyHours =
    weeklyProcessHours * WEEKS_PER_MONTH;

  const reworkHoursMonthly =
    reworkCount * hoursPerRework;

  const currentMonthlyHours =
    baseMonthlyHours + reworkHoursMonthly;

  const reductionRate =
    percentage(reductionPercent);

  const releasedBaseHours =
    baseMonthlyHours * reductionRate;

  const avoidedReworkHoursMonthly =
    reworkHoursMonthly * reductionRate;

  const releasedMonthlyHours =
    releasedBaseHours +
    avoidedReworkHoursMonthly;

  const remainingMonthlyHours = Math.max(
    0,
    currentMonthlyHours - releasedMonthlyHours,
  );

  const monthlyCapacity =
    releasedMonthlyHours * hourlyCost;

  return {
    collaborators,

    currentMonthlyHours:
      safeResult(currentMonthlyHours),

    remainingMonthlyHours:
      safeResult(remainingMonthlyHours),

    releasedMonthlyHours:
      safeResult(releasedMonthlyHours),

    avoidedReworkHoursMonthly:
      safeResult(avoidedReworkHoursMonthly),

    releasedAnnualHours:
      safeResult(
        releasedMonthlyHours * MONTHS_PER_YEAR,
      ),

    monthlyCapacity:
      safeResult(monthlyCapacity),

    annualCapacity:
      safeResult(
        monthlyCapacity * MONTHS_PER_YEAR,
      ),

    reductionPercent,
  };
}