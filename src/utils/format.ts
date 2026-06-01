/** AU-localised currency formatter — AUD by default. */
export function formatAUD(value: number, opts?: { compact?: boolean; cents?: boolean }) {
  if (opts?.compact) {
    const abs = Math.abs(value)
    if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
    if (abs >= 1_000) return `$${(value / 1_000).toFixed(0)}k`
    return `$${value.toFixed(0)}`
  }
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: opts?.cents ? 2 : 0,
  }).format(value)
}

export function formatPercent(value: number, opts?: { signed?: boolean; digits?: number }) {
  const digits = opts?.digits ?? 1
  const sign = opts?.signed && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}%`
}

export function formatNumber(value: number, opts?: { signed?: boolean }) {
  const sign = opts?.signed && value > 0 ? '+' : ''
  return `${sign}${new Intl.NumberFormat('en-AU').format(value)}`
}
