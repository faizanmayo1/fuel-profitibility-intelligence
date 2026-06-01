import { AlertTriangle, Banknote, ChevronDown, Filter, Receipt, Repeat, Users2 } from 'lucide-react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  expenseAnomalies,
  laborTrend,
  payrollRows,
  payrollSummary,
  type ExpenseAnomaly,
  type PayrollRow,
} from '@/data/payroll'
import { formatAUD, formatPercent } from '@/utils/format'
import { cn } from '@/utils/cn'

const statusTone: Record<PayrollRow['status'], string> = {
  Efficient: 'bg-signal-positive-soft text-emerald-deep',
  Watch: 'bg-signal-info-soft text-signal-info',
  Drift: 'bg-signal-warning-soft text-signal-warning',
  Critical: 'bg-signal-risk-soft text-signal-risk',
}

const categoryMeta: Record<
  ExpenseAnomaly['category'],
  { Icon: typeof Banknote; tone: string }
> = {
  Subscription: { Icon: Repeat, tone: 'text-signal-info bg-signal-info-soft' },
  'One-off': { Icon: Banknote, tone: 'text-ink-muted bg-canvas-subtle' },
  'Vendor concentration': { Icon: AlertTriangle, tone: 'text-signal-warning bg-signal-warning-soft' },
  Duplicate: { Icon: Receipt, tone: 'text-signal-risk bg-signal-risk-soft' },
}

export function PayrollExpense() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Client Intelligence · People &amp; spend</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Payroll &amp; expense intelligence
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            Labor cost vs revenue, overtime drift, vendor concentration, and recurring expense leakage across the book.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Industry
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm">View recommendations</Button>
        </div>
      </header>

      {/* Stat strip */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Clients over labor benchmark" value={String(payrollSummary.clientsOverLabor)} sub="of 142" tone="warn" />
        <Stat label="Overtime hours · last month" value={payrollSummary.totalOvertimeHrs.toLocaleString('en-AU')} sub={`${formatPercent(payrollSummary.overtimeUpYoY, { signed: true })} YoY`} tone="warn" />
        <Stat label="Subscription waste detected" value={formatAUD(payrollSummary.subscriptionWaste)} sub="Annualised" tone="ink" />
        <Stat label="Recurring spend surfaced" value={formatAUD(payrollSummary.recurringSpendDetected, { compact: true })} sub="Last 90 days" tone="ink" />
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Payroll efficiency table */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-7">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign/8 text-sovereign">
                <Users2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Payroll efficiency
                </h3>
                <p className="text-xs text-ink-muted">Labor ratio · payroll vs revenue growth · overtime</p>
              </div>
            </div>
            <Badge variant="warning">1 Critical · 3 Drift</Badge>
          </header>
          <div className="grid grid-cols-12 gap-3 border-b border-hairline bg-canvas-subtle/60 px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide-eyebrow text-ink-subtle">
            <div className="col-span-4">Client</div>
            <div className="col-span-2 text-right">Labor ratio</div>
            <div className="col-span-2 text-right">Payroll Δ</div>
            <div className="col-span-2 text-right">Revenue Δ</div>
            <div className="col-span-2 text-right">Overtime</div>
          </div>
          <ul className="divide-y divide-hairline">
            {payrollRows.map((row) => {
              const widthPct = Math.min((row.laborRatio / 60) * 100, 100)
              const benchPct = Math.min((row.benchmark / 60) * 100, 100)
              return (
                <li
                  key={row.id}
                  className="grid grid-cols-12 items-center gap-3 px-5 py-3 transition-colors hover:bg-canvas-subtle/60"
                >
                  <div className="col-span-4 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13.5px] font-medium text-ink">{row.client}</p>
                      <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-medium', statusTone[row.status])}>
                        {row.status}
                      </span>
                    </div>
                    <p className="truncate text-[11px] text-ink-subtle">{row.industry}</p>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-baseline justify-end gap-1.5">
                      <span className="text-[13px] font-medium text-ink tabular">
                        {row.laborRatio.toFixed(1)}%
                      </span>
                      <span className="text-[10px] text-ink-subtle tabular">/ {row.benchmark}%</span>
                    </div>
                    <div className="relative mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                      <div className="absolute inset-y-0 left-0 bg-hairline-strong" style={{ width: `${benchPct}%` }} />
                      <div
                        className={cn(
                          'absolute inset-y-0 left-0 rounded-full',
                          row.laborRatio > row.benchmark ? 'bg-signal-warning' : 'bg-emerald',
                        )}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>

                  <div
                    className={cn(
                      'col-span-2 text-right text-[13px] tabular',
                      row.payrollGrowth > row.revenueGrowth ? 'text-signal-warning' : 'text-emerald-deep',
                    )}
                  >
                    {formatPercent(row.payrollGrowth, { signed: true })}
                  </div>

                  <div className="col-span-2 text-right text-[13px] text-ink tabular">
                    {formatPercent(row.revenueGrowth, { signed: true })}
                  </div>

                  <div className="col-span-2 text-right">
                    <p className="text-[13px] font-medium text-ink tabular">{row.overtimeHrs}h</p>
                    <p
                      className={cn(
                        'text-[10px] tabular',
                        row.overtimeDelta > 0 ? 'text-signal-warning' : 'text-emerald-deep',
                      )}
                    >
                      {formatPercent(row.overtimeDelta, { signed: true })}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Labor vs revenue trend */}
        <section className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm xl:col-span-5">
          <p className="eyebrow">Portfolio aggregate · 7 months</p>
          <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">
            Payroll vs revenue index
          </h3>
          <p className="text-xs text-ink-muted">Indexed to December · payroll outpacing revenue.</p>

          <div className="mt-4 h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={laborTrend} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
                <CartesianGrid stroke="#E4E9EF" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#8A93A2', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: '#8A93A2', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                  domain={[98, 124]}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: '1px solid #E4E9EF',
                    boxShadow: '0 4px 12px rgba(11,18,32,0.06)',
                  }}
                />
                <Legend
                  iconType="square"
                  wrapperStyle={{ fontSize: 11, paddingTop: 6 }}
                />
                <Line type="monotone" dataKey="payroll" stroke="#D97706" strokeWidth={2} name="Payroll index" dot={{ r: 2 }} />
                <Line type="monotone" dataKey="revenue" stroke="#0E2C4A" strokeWidth={2} name="Revenue index" dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-2 text-[12px] text-ink-muted">
            Payroll has grown <span className="font-medium text-signal-warning">+22 pts</span> vs revenue{' '}
            <span className="font-medium text-ink">+9 pts</span> since December · 14 clients above benchmark.
          </p>
        </section>
      </div>

      {/* Expense anomalies */}
      <section className="rounded-lg border border-hairline bg-card shadow-card-sm">
        <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-signal-warning-soft text-signal-warning">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                Expense anomalies &amp; subscription leakage
              </h3>
              <p className="text-xs text-ink-muted">AI-flagged spend that deviates from baseline</p>
            </div>
          </div>
          <Badge variant="warning">5 flagged today</Badge>
        </header>
        <ul className="divide-y divide-hairline">
          {expenseAnomalies.map((a) => {
            const meta = categoryMeta[a.category]
            return (
              <li key={a.id} className="flex items-start gap-3 px-5 py-4 hover:bg-canvas-subtle/60">
                <div className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-md', meta.tone)}>
                  <meta.Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-medium text-ink">{a.client}</p>
                    <span className="text-[11px] text-ink-subtle">· {a.vendor}</span>
                    <Badge variant="secondary" className="px-1.5">
                      {a.category}
                    </Badge>
                  </div>
                  <p className="mt-1 text-[13px] text-ink-muted">{a.action}</p>
                  <p className="mt-1 text-[11px] text-ink-subtle">Flagged {a.flaggedAt}</p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-semibold text-ink tabular">{formatAUD(a.amount)}</p>
                  {a.baselineMultiplier > 1 && (
                    <p className="text-[11px] text-signal-warning tabular">
                      {a.baselineMultiplier.toFixed(1)}× baseline
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </section>
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
