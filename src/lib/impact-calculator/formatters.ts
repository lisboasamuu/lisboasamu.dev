export function formatCurrency(value: number) {
  const safe = Number.isFinite(value) ? value : 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(safe);
}

export function formatNumber(
  value: number,
  maximumFractionDigits = 1,
) {
  const safe = Number.isFinite(value) ? value : 0;

  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits,
  }).format(safe);
}

export function formatHours(value: number) {
  return `${formatNumber(value)}h`;
}

export function formatPercent(value: number) {
  return `${formatNumber(value)}%`;
}