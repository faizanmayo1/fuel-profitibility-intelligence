import { CalendarClock, Receipt, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { missedDeductions, taxRows, taxSummary, type BASStatus } from '@/data/tax'
import { formatAUD } from '@/utils/format'
import { cn } from '@/utils/cn'

const statusTone: Record<BASStatus, string> = {
  'On track': 'bg-signal-positive-soft text-emerald-deep',
  Watch: 'bg-signal-info-soft text-signal-info',
  'Underpayment risk': 'bg-signal-warning-soft text-signal-warning',
  'At risk': 'bg-signal-risk-soft text-signal-risk',
}

export function TaxRisk() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Client Intelligence · Tax &amp; GST</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Tax &amp; GST risk · Q4 FY26
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            BAS readiness, reserve adequacy, and missed deduction opportunities · BAS due in{' '}
            <span className="font-medium text-ink">{taxSummary.basDueDays} days</span> (28 Jul 2026).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <CalendarClock className="h-3.5 w-3.5" />
            Q4 FY26
          </Button>
          <Button size="sm" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Generate BAS pack
          </Button>
        </div>
      </header>

      {/* Stat strip */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Total Q4 liability" value={formatAUD(taxSummary.totalLiability, { compact: true })} sub="Across 142 clients" tone="ink" />
        <Stat label="Aggregate shortfall" value={`−${formatAUD(taxSummary.aggregateShortfall, { compact: true })}`} sub={`${taxSummary.clientsAtRisk} clients at risk`} tone="warn" />
        <Stat label="On track" value={String(taxSummary.clientsOnTrack)} sub="64% of book" tone="positive" />
        <Stat label="Missed deductions" value={formatAUD(taxSummary.missedDeductionsTotal)} sub="Surfaced this quarter" tone="ink" />
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* BAS readiness table */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-8">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign/8 text-sovereign">
                <Receipt className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  BAS readiness · Q4 FY26
                </h3>
                <p className="text-xs text-ink-muted">
                  Predicted liability vs current reserve · reserves should fund 100% by 28 Jul
                </p>
              </div>
            </div>
            <Badge variant="warning">{taxSummary.clientsAtRisk} need action</Badge>
          </header>

          <div className="grid grid-cols-12 gap-3 border-b border-hairline bg-canvas-subtle/60 px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide-eyebrow text-ink-subtle">
            <div className="col-span-3">Client</div>
            <div className="col-span-2 text-right">Liability</div>
            <div className="col-span-3">Reserve coverage</div>
            <div className="col-span-2 text-right">Shortfall</div>
            <div className="col-span-2">Status</div>
          </div>

          <ul className="divide-y divide-hairline">
            {taxRows.map((row) => {
              const coverage = Math.min((row.reserveCurrent / row.estimatedLiability) * 100, 100)
              return (
                <li
                  key={row.id}
                  className="grid grid-cols-12 items-center gap-3 px-5 py-3 transition-colors hover:bg-canvas-subtle/60"
                >
                  <div className="col-span-3 min-w-0">
                    <p className="truncate text-[13.5px] font-medium text-ink">{row.client}</p>
                    <p className="truncate text-[11px] text-ink-subtle">
                      {row.industry} · BAS {row.basDueDate}
                    </p>
                  </div>
                  <div className="col-span-2 text-right text-[13px] font-medium text-ink tabular">
                    {formatAUD(row.estimatedLiability)}
                  </div>
                  <div className="col-span-3">
                    <div className="h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          coverage >= 100
                            ? 'bg-emerald'
                            : coverage >= 70
                            ? 'bg-signal-info'
                            : coverage >= 40
                            ? 'bg-signal-warning'
                            : 'bg-signal-risk',
                        )}
                        style={{ width: `${coverage}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-ink-subtle tabular">
                      {coverage.toFixed(0)}% covered · reserve {formatAUD(row.reserveCurrent)}
                    </p>
                  </div>
                  <div className="col-span-2 text-right text-[13px] tabular">
                    {row.shortfall > 0 ? (
                      <span className="font-medium text-signal-warning">
                        −{formatAUD(row.shortfall)}
                      </span>
                    ) : (
                      <span className="text-emerald-deep">Funded</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <span className={cn('rounded px-1.5 py-0.5 text-[11px] font-medium', statusTone[row.status])}>
                      {row.status}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Missed deductions */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-4">
          <header className="flex items-center gap-2.5 border-b border-hairline px-5 py-4">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald/12 text-emerald-deep">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                Missed deductions
              </h3>
              <p className="text-xs text-ink-muted">AI-surfaced eligible claims</p>
            </div>
          </header>
          <ul className="divide-y divide-hairline">
            {missedDeductions.map((d) => (
              <li key={d.id} className="px-5 py-3 transition-colors hover:bg-canvas-subtle/60">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[13.5px] font-medium text-ink">{d.client}</p>
                  <span className="text-[13px] font-semibold text-emerald-deep tabular">
                    +{formatAUD(d.amount)}
                  </span>
                </div>
                <p className="text-[12px] text-ink-muted">{d.category}</p>
                <p className="mt-1 text-[11px] text-ink-subtle">{d.evidence}</p>
              </li>
            ))}
          </ul>
          <footer className="border-t border-hairline px-5 py-3 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
              Confirmed against ATO ruling library
            </span>
          </footer>
        </section>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  sub,
  tone = 'ink',
}: {
  label: string
  value: string
  sub: string
  tone?: 'ink' | 'warn' | 'risk' | 'positive'
}) {
  const toneText =
    tone === 'risk'
      ? 'text-signal-risk'
      : tone === 'warn'
      ? 'text-signal-warning'
      : tone === 'positive'
      ? 'text-emerald-deep'
      : 'text-ink'
  return (
    <div className="rounded-lg border border-hairline bg-card p-4 shadow-card-sm">
      <p className="eyebrow">{label}</p>
      <p className={cn('mt-2 text-[22px] font-semibold tabular tracking-tight-bank', toneText)}>{value}</p>
      <p className="mt-0.5 text-[11px] text-ink-subtle">{sub}</p>
    </div>
  )
}
