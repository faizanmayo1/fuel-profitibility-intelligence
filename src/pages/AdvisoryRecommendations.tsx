import { Banknote, CheckCheck, ChevronDown, Filter, Receipt, Sparkles, TrendingDown, Users2, Wallet } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  advisorySummary,
  impactBreakdown,
  profitFirstBands,
  recommendations,
  type Impact,
  type NBARecType,
} from '@/data/advisory'
import { formatAUD, formatPercent } from '@/utils/format'
import { cn } from '@/utils/cn'

const typeMeta: Record<
  NBARecType,
  { Icon: typeof Banknote; tone: string }
> = {
  Pricing: { Icon: TrendingDown, tone: 'text-signal-risk bg-signal-risk-soft' },
  'Cost reduction': { Icon: Banknote, tone: 'text-signal-warning bg-signal-warning-soft' },
  Payroll: { Icon: Users2, tone: 'text-signal-info bg-signal-info-soft' },
  'Tax efficiency': { Icon: Receipt, tone: 'text-sovereign bg-sovereign/8' },
  'Cash management': { Icon: Wallet, tone: 'text-emerald-deep bg-signal-positive-soft' },
}

const impactPill: Record<Impact, 'risk' | 'warning' | 'neutral'> = {
  High: 'risk',
  Medium: 'warning',
  Low: 'neutral',
}

const bandTone = {
  positive: { bar: 'bg-emerald', target: 'border-emerald', text: 'text-emerald-deep' },
  warning: { bar: 'bg-signal-warning', target: 'border-signal-warning', text: 'text-signal-warning' },
  risk: { bar: 'bg-signal-risk', target: 'border-signal-risk', text: 'text-signal-risk' },
  info: { bar: 'bg-signal-info', target: 'border-signal-info', text: 'text-signal-info' },
} as const

export function AdvisoryRecommendations() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Advisory Engine · Next Best Action</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Advisory recommendations
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            AI-generated recommendations ranked by impact · {advisorySummary.openRecs} open,{' '}
            {advisorySummary.acceptedRate}% acceptance rate ·{' '}
            <span className="font-medium text-emerald-deep">{formatAUD(advisorySummary.realisedUplift, { compact: true })}</span> realised uplift this month.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Impact
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Generate new
          </Button>
        </div>
      </header>

      {/* Impact strip */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {impactBreakdown.map((b) => (
          <div
            key={b.impact}
            className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm"
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow">{b.impact} impact</p>
              <Badge variant={impactPill[b.impact]} className="px-1.5">{b.impact}</Badge>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[26px] font-semibold text-ink tabular">{b.count}</span>
              <span className="text-xs text-ink-subtle">open recs</span>
            </div>
            <p className="mt-1 text-[12px] text-ink-muted tabular">
              Potential <span className="font-medium text-emerald-deep">{formatAUD(b.potentialUplift, { compact: true })}</span>
            </p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* NBA queue */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-8">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign text-canvas">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Next Best Actions
                </h3>
                <p className="text-xs text-ink-muted">Ranked by impact × confidence × recency</p>
              </div>
            </div>
            <Badge variant="info">AI ranked</Badge>
          </header>

          <ul className="divide-y divide-hairline">
            {recommendations.map((rec) => {
              const meta = typeMeta[rec.type]
              return (
                <li key={rec.id} className="flex items-start gap-3 px-5 py-4 hover:bg-canvas-subtle/60">
                  <div className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-md', meta.tone)}>
                    <meta.Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[14px] font-medium text-ink">{rec.title}</p>
                      <Badge variant={impactPill[rec.impact]} className="px-1.5">
                        {rec.impact}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[13px] text-ink-muted">{rec.summary}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-ink-subtle">
                      <span className="font-medium text-ink-muted">{rec.client}</span>
                      <span>·</span>
                      <span>{rec.industry}</span>
                      <span>·</span>
                      <span>{rec.type}</span>
                      <span>·</span>
                      <span className="tabular">Confidence {(rec.confidence * 100).toFixed(0)}%</span>
                      <span>·</span>
                      <span>{rec.ageHrs}h ago</span>
                    </div>
                  </div>
                  <div className="hidden text-right md:block">
                    <p className="text-[11px] uppercase tracking-wide-eyebrow text-ink-subtle">
                      Est. uplift
                    </p>
                    <p className="text-[15px] font-semibold text-emerald-deep tabular">
                      {formatAUD(rec.estUplift, { compact: true })}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-1">
                    <Button size="sm" className="gap-1.5">
                      <CheckCheck className="h-3.5 w-3.5" />
                      Accept
                    </Button>
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Profit First simulator */}
        <section className="flex flex-col gap-4 xl:col-span-4">
          <div className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
            <p className="eyebrow">Allocation model</p>
            <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">
              Profit First · LumenPath Studios
            </h3>
            <p className="mt-1 text-xs text-ink-muted">
              Current vs target on $2.4M annualised revenue.
            </p>

            <ul className="mt-4 space-y-3">
              {profitFirstBands.map((b) => {
                const tone = bandTone[b.tone]
                return (
                  <li key={b.bucket}>
                    <div className="flex items-baseline justify-between text-[12px]">
                      <span className="font-medium text-ink">{b.bucket}</span>
                      <span className={cn('tabular', tone.text)}>
                        {formatPercent(b.current)} → {formatPercent(b.target)}
                      </span>
                    </div>
                    <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                      <div
                        className={cn('absolute inset-y-0 left-0 rounded-full', tone.bar)}
                        style={{ width: `${b.current}%` }}
                      />
                      <div
                        className={cn(
                          'absolute inset-y-0 w-0.5 border-l-2 border-dashed',
                          tone.target,
                        )}
                        style={{ left: `${b.target}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-ink-subtle tabular">
                      {formatAUD(b.amount, { compact: true })} / yr
                    </p>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 rounded-md border border-dashed border-hairline-strong bg-canvas-subtle/50 p-3 text-[12px] text-ink-muted">
              <span className="font-medium text-ink">Recommended shift ·</span> reallocate{' '}
              <span className="text-signal-warning">3% owner pay</span> and{' '}
              <span className="text-signal-warning">7% operating</span> toward profit + tax buckets.
              Realised uplift ~$144k/yr.
            </div>
          </div>

          {/* Performance card */}
          <div className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
            <p className="eyebrow">Acceptance funnel · MTD</p>
            <ul className="mt-3 space-y-3">
              <FunnelRow label="Generated" value={advisorySummary.openRecs + advisorySummary.acceptedThisMonth} />
              <FunnelRow label="Accepted" value={advisorySummary.acceptedThisMonth} pct={advisorySummary.acceptedRate} />
              <FunnelRow label="Realised uplift" value={advisorySummary.realisedUplift} currency />
              <FunnelRow label="In discussion" value={advisorySummary.inDiscussionUplift} currency muted />
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

function FunnelRow({
  label,
  value,
  pct,
  currency,
  muted,
}: {
  label: string
  value: number
  pct?: number
  currency?: boolean
  muted?: boolean
}) {
  return (
    <li className="flex items-baseline justify-between">
      <span className={cn('text-[12.5px]', muted ? 'text-ink-subtle' : 'text-ink-muted')}>
        {label}
      </span>
      <span className="flex items-baseline gap-2">
        <span className={cn('text-[15px] font-semibold tabular', muted ? 'text-ink-muted' : 'text-ink')}>
          {currency ? formatAUD(value, { compact: true }) : value}
        </span>
        {pct !== undefined && (
          <span className="text-[11px] text-emerald-deep tabular">{pct}%</span>
        )}
      </span>
    </li>
  )
}
