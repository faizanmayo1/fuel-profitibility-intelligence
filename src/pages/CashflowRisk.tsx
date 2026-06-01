import { AlertOctagon, ArrowRight, CalendarClock, Play, Sparkles, TrendingDown } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cashRows, cashSummary, riskCounts, scenarioSeries, type RiskWindow } from '@/data/cashflow'
import { formatAUD } from '@/utils/format'
import { cn } from '@/utils/cn'

const riskTone: Record<
  RiskWindow,
  { ring: string; pill: string; label: string }
> = {
  '30d': { ring: 'text-signal-risk', pill: 'bg-signal-risk-soft text-signal-risk', label: 'Within 30 days' },
  '60d': { ring: 'text-signal-warning', pill: 'bg-signal-warning-soft text-signal-warning', label: 'Within 60 days' },
  '90d': { ring: 'text-signal-info', pill: 'bg-signal-info-soft text-signal-info', label: 'Within 90 days' },
  Safe: { ring: 'text-emerald', pill: 'bg-signal-positive-soft text-emerald-deep', label: 'Healthy runway' },
}

export function CashflowRisk() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Client Intelligence · Cash-flow</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Cash-flow risk board
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            Predictive runway, AR aging, and payroll stress across the portfolio · 30/60/90-day windows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <CalendarClock className="h-3.5 w-3.5" />
            Window · 90 days
          </Button>
          <Button size="sm" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Run forecast refresh
          </Button>
        </div>
      </header>

      {/* Risk window strip */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <RiskWindowCard
          window="30d"
          count={riskCounts['30d']}
          gap={cashSummary.predicted30dGap}
          critical
        />
        <RiskWindowCard window="60d" count={riskCounts['60d']} gap={cashSummary.predicted60dGap} />
        <RiskWindowCard window="90d" count={riskCounts['90d']} gap={cashSummary.predicted90dGap} />
        <div className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
          <p className="eyebrow">Recovered this quarter</p>
          <p className="mt-3 text-[22px] font-semibold text-emerald-deep tabular">
            {formatAUD(cashSummary.recoveredCash, { compact: true })}
          </p>
          <p className="mt-1 text-[11px] text-ink-subtle">
            Through Fuel-recommended AR + payment plan actions
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Runway leaderboard */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-7">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-signal-risk-soft text-signal-risk">
                <AlertOctagon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Runway leaderboard
                </h3>
                <p className="text-xs text-ink-muted">Shortest first · 30/60/90-day window</p>
              </div>
            </div>
            <Badge variant="risk">3 Critical</Badge>
          </header>

          <ul className="divide-y divide-hairline">
            {cashRows.map((row) => {
              const tone = riskTone[row.riskWindow]
              return (
                <li
                  key={row.id}
                  className="group grid grid-cols-12 items-start gap-4 px-5 py-4 transition-colors hover:bg-canvas-subtle/60"
                >
                  <div className="col-span-12 md:col-span-4">
                    <p className="text-[14px] font-medium text-ink">{row.client}</p>
                    <p className="mt-0.5 text-[11px] text-ink-subtle">{row.industry}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-medium', tone.pill)}>
                        {tone.label}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2">
                    <p className="eyebrow">Runway</p>
                    <p className={cn('mt-1 text-[15px] font-semibold tabular', tone.ring)}>
                      {row.runwayDays}d
                    </p>
                  </div>

                  <div className="col-span-4 md:col-span-2">
                    <p className="eyebrow">Shortfall</p>
                    <p className="mt-1 text-[13px] font-medium text-signal-risk tabular">
                      −{formatAUD(row.predictedShortfall, { compact: true })}
                    </p>
                  </div>

                  <div className="col-span-4 md:col-span-2">
                    <p className="eyebrow">AR overdue</p>
                    <p className="mt-1 text-[13px] text-ink tabular">
                      {formatAUD(row.arOverdue, { compact: true })}
                    </p>
                  </div>

                  <div className="col-span-4 md:col-span-2">
                    <p className="eyebrow">Next payroll</p>
                    <p className="mt-1 text-[13px] text-ink tabular">
                      {formatAUD(row.payrollDue, { compact: true })}
                    </p>
                    <p className="text-[11px] text-ink-subtle">{row.payrollDate}</p>
                  </div>

                  <div className="col-span-12">
                    <p className="text-[12px] text-ink-muted">
                      <span className="font-medium text-ink">Trigger ·</span> {row.trigger}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Scenario simulator */}
        <section className="flex flex-col gap-4 xl:col-span-5">
          <div className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Redhill · scenario</p>
                <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">
                  Cash trajectory · next 56 days
                </h3>
              </div>
              <Badge variant="secondary" className="gap-1.5">
                <Play className="h-2.5 w-2.5" />
                Live model
              </Badge>
            </div>

            <div className="mt-4 h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scenarioSeries} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#E4E9EF" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#8A93A2', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `D${v}`}
                  />
                  <YAxis
                    tick={{ fill: '#8A93A2', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={42}
                    tickFormatter={(v) => `$${v}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: 8,
                      border: '1px solid #E4E9EF',
                      boxShadow: '0 4px 12px rgba(11,18,32,0.06)',
                    }}
                  />
                  <ReferenceLine y={0} stroke="#DC2626" strokeDasharray="3 3" label={{ value: 'Zero', fill: '#DC2626', fontSize: 10, position: 'right' }} />
                  <Line type="monotone" dataKey="baseline" stroke="#0E2C4A" strokeWidth={2} dot={false} name="Baseline" />
                  <Line type="monotone" dataKey="delayed" stroke="#DC2626" strokeWidth={2} dot={false} name="Invoices delayed 10d" />
                  <Line type="monotone" dataKey="payrollHike" stroke="#D97706" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Payroll +15%" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-ink-muted">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-3 rounded bg-sovereign" />Baseline</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-3 rounded bg-signal-risk" />Invoices delayed 10d</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-3 rounded bg-signal-warning" />Payroll +15%</span>
            </div>
          </div>

          {/* Scenario controls */}
          <div className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
            <p className="eyebrow">Scenario simulator</p>
            <h4 className="mt-1 text-[14px] font-semibold text-ink">
              What if…
            </h4>
            <ul className="mt-3 space-y-2">
              {[
                'Invoices delayed by 10 days',
                'Payroll increases by 15%',
                'GST liability deferred 30 days',
                'Top debtor pays in full this week',
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-center justify-between rounded-md border border-hairline px-3 py-2 text-[12.5px] text-ink-muted"
                >
                  <span>{s}</span>
                  <button className="inline-flex items-center gap-1 text-[12px] font-medium text-sovereign hover:text-sovereign-600">
                    Simulate
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

function RiskWindowCard({
  window,
  count,
  gap,
  critical,
}: {
  window: RiskWindow
  count: number
  gap: number
  critical?: boolean
}) {
  const tone = riskTone[window]
  return (
    <div className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{tone.label}</p>
        {critical && (
          <span className="inline-flex items-center gap-1 rounded-full bg-signal-risk-soft px-1.5 py-0.5 text-[10px] font-medium text-signal-risk">
            <TrendingDown className="h-2.5 w-2.5" />
            Urgent
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className={cn('text-[28px] font-semibold tabular', tone.ring)}>{count}</span>
        <span className="text-xs text-ink-subtle">clients</span>
      </div>
      <p className="mt-1 text-[11px] text-ink-subtle tabular">
        Aggregate shortfall <span className="font-medium text-ink-muted">−{formatAUD(gap, { compact: true })}</span>
      </p>
    </div>
  )
}
