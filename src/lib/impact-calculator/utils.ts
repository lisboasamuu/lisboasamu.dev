export const MONTHS_PER_YEAR = 12;
export const WEEKS_PER_MONTH = 4.33;

export function clampNumber(
  value: number,
  min: number,
  max: number,
  fallback = 0,
) {
  if (!Number.isFinite(value)) return fallback;

  return Math.min(max, Math.max(min, value));
}

export function percentage(value: number) {
  return clampNumber(value, 0, 100) / 100;
}

export function safeResult(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}