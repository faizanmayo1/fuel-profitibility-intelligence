import { Activity, ArrowRight, Banknote, ChevronDown, Filter, Sparkles, TrendingDown, Users2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  benchmarks,
  causeBreakdown,
  leakSummary,
  leaks,
  type LeakRootCause,
} from '@/data/profitability'
import { formatAUD, formatPercent } from '@/utils/format'
import { cn } from '@/utils/cn'

const causeMeta: Record<
  LeakRootCause,
  { Icon: typeof TrendingDown; tone: string }
> = {
  Pricing: { Icon: TrendingDown, tone: 'text-signal-risk bg-signal-risk-soft' },
  'Cost inflation': { Icon: Banknote, tone: 'text-signal-warning bg-signal-warning-soft' },
  'Labor inefficiency': { Icon: Users2, tone: 'text-signal-info bg-signal-info-soft' },
  'Cash timing': { Icon: Activity, tone: 'text-ink-muted bg-canvas-subtle' },
}

export function ProfitabilityLeaks() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Client Intelligence · Profitability</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Profitability leaks across the portfolio
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            {leakSummary.activeLeaks} active leaks detected · est. quarterly impact{' '}
            <span className="font-medium text-ink">{formatAUD(leakSummary.trailingImpact, { compact: true })}</span> ·{' '}
            {formatAUD(leakSummary.trailingRecovered, { compact: true })} recovered to date through Fuel recommendations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Industry
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Root cause
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Run AI scan
          </Button>
        </div>
      </header>

      {/* Root cause breakdown */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {causeBreakdown.map((c) => {
          const meta = causeMeta[c.cause]
          return (
            <div
              key={c.cause}
              className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm"
            >
              <div className="flex items-center justify-between">
                <div className={cn('grid h-9 w-9 place-items-center rounded-md', meta.tone)}>
                  <meta.Icon className="h-4 w-4" />
                </div>
                <span className="text-[11px] uppercase tracking-wide-eyebrow text-ink-subtle">
                  Root cause
                </span>
              </div>
              <p className="mt-3 text-[15px] font-semibold text-ink">{c.cause}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[22px] font-semibold tabular text-ink">{c.count}</span>
                <span className="text-xs text-ink-subtle">leaks</span>
              </div>
              <p className="mt-1 text-[12px] text-ink-muted tabular">
                {formatAUD(c.impact, { compact: true })} qtr impact
              </p>
            </div>
          )
        })}
      </section>

      {/* Two-col: leak list + benchmark */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Leak list */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-8">
          <header className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4">
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                Active margin leaks
              </h3>
              <p className="text-xs text-ink-muted">Ranked by quarterly impact</p>
            </div>
            <Badge variant="warning">
              Avg margin {formatPercent(leakSummary.avgMarginDeltaPp, { signed: true })}
            </Badge>
          </header>
          <ul className="divide-y divide-hairline">
            {leaks.map((leak) => {
              const meta = causeMeta[leak.rootCause]
              const slug = leak.client.toLowerCase().split(' ')[0]
              return (
                <li key={leak.id}>
                  <Link
                    to={`/client/${slug}`}
                    className="group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-canvas-subtle/60"
                  >
                  <div className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-md', meta.tone)}>
                    <meta.Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[14px] font-medium text-ink">{leak.client}</p>
                      <span className="text-[11px] text-ink-subtle">· {leak.serviceLine}</span>
                      <Badge variant="secondary" className="px-1.5">
                        {leak.rootCause}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[13px] text-ink-muted">{leak.recommendation}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-ink-subtle">
                      <span>{leak.industry}</span>
                      <span>·</span>
                      <span>{leak.detectedAt}</span>
                      <span>·</span>
                      <span className="tabular">Confidence {(leak.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="hidden text-right md:block">
                    <p className="text-[11px] uppercase tracking-wide-eyebrow text-ink-subtle">Margin</p>
                    <p className="text-[14px] font-semibold text-signal-warning tabular">
                      {formatPercent(leak.marginDeltaPp, { signed: true })} pp
                    </p>
                    <p className="mt-0.5 text-[11px] text-ink-muted tabular">
                      {formatAUD(leak.estQuarterlyImpact, { compact: true })} qtr
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-ink-subtle opacity-0 transition group-hover:opacity-100 group-hover:text-ink"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Benchmark */}
        <section className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm xl:col-span-4">
          <p className="eyebrow">Benchmark</p>
          <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">
            Margin vs industry baseline
          </h3>
          <p className="mt-1 text-xs text-ink-muted">
            Fuel client average vs AU/NZ industry baseline · trailing 12 months
          </p>

          <ul className="mt-4 space-y-3">
            {benchmarks.map((b) => {
              const baselinePct = (b.industryBaseline / b.topQuartile) * 100
              const fuelPct = (b.fuelClientAvg / b.topQuartile) * 100
              const gap = b.fuelClientAvg - b.industryBaseline
              return (
                <li key={b.industry}>
                  <div className="flex items-baseline justify-between text-[12px]">
                    <span className="font-medium text-ink">{b.industry}</span>
                    <span
                      className={cn(
                        'tabular',
                        gap >= 0 ? 'text-emerald-deep' : 'text-signal-warning',
                      )}
                    >
                      {formatPercent(gap, { signed: true })} pp vs baseline
                    </span>
                  </div>
                  <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                    <div
                      className="absolute inset-y-0 left-0 bg-hairline-strong"
                      style={{ width: `${baselinePct}%` }}
                      aria-hidden
                    />
                    <div
                      className={cn(
                        'absolute inset-y-0 left-0 rounded-full',
                        gap >= 0 ? 'bg-emerald' : 'bg-signal-warning',
                      )}
                      style={{ width: `${fuelPct}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-ink-subtle tabular">
                    <span>Fuel {b.fuelClientAvg.toFixed(1)}%</span>
                    <span>Industry {b.industryBaseline.toFixed(1)}%</span>
                    <span>Top quartile {b.topQuartile.toFixed(1)}%</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}
