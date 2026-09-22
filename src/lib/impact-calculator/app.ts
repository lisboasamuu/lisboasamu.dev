import type {
  AppImpact,
  AppInput,
} from "./types";

import {
  clampNumber,
  MONTHS_PER_YEAR,
  safeResult,
} from "./utils";

export function calculateAppImpact(
  input: AppInput,
): AppImpact {
  const monthlyUsers = clampNumber(
    input.monthlyUsers,
    0,
    10_000_000,
  );

  const interactionsPerUser = clampNumber(
    input.interactionsPerUser,
    0,
    10_000,
  );

  const minutesSavedPerInteraction =
    clampNumber(
      input.minutesSavedPerInteraction,
      0,
      1_440,
    );

  const hourlyCost = clampNumber(
    input.hourlyCost,
    0,
    1_000_000,
  );

  const monthlyInteractions =
    monthlyUsers * interactionsPerUser;

  const monthlyMinutesSaved =
    monthlyInteractions *
    minutesSavedPerInteraction;

  const monthlyHoursSaved =
    monthlyMinutesSaved / 60;

  const monthlyCapacity =
    monthlyHoursSaved * hourlyCost;

  return {
    objective: input.objective,

    monthlyInteractions:
      safeResult(monthlyInteractions),

    monthlyMinutesSaved:
      safeResult(monthlyMinutesSaved),

    monthlyHoursSaved:
      safeResult(monthlyHoursSaved),

    annualHoursSaved:
      safeResult(
        monthlyHoursSaved * MONTHS_PER_YEAR,
      ),

    monthlyCapacity:
      safeResult(monthlyCapacity),

    annualCapacity:
      safeResult(
        monthlyCapacity * MONTHS_PER_YEAR,
      ),
  };
}