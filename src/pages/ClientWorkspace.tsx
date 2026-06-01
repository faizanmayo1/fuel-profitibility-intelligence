import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Banknote,
  Building2,
  ChevronRight,
  Landmark,
  Mail,
  Phone,
  Plug,
  Receipt,
  Sparkles,
  TrendingDown,
  Users2,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  arAging,
  cashProjection,
  healthDrivers,
  ledger,
  recommendedActions,
  redhill,
  rootCauses,
  scoreTrend,
  syncFeed,
  topDebtors,
  type ARBucket,
  type RootCause,
  type SyncEvent,
} from '@/data/clientDetail'
import { ROUTES } from '@/routes/paths'
import { formatAUD } from '@/utils/format'
import { cn } from '@/utils/cn'

const ledgerTone = {
  positive: 'text-emerald-deep bg-signal-positive-soft',
  warning: 'text-signal-warning bg-signal-warning-soft',
  risk: 'text-signal-risk bg-signal-risk-soft',
  neutral: 'text-ink-muted bg-canvas-subtle',
} as const

const sourceMeta: Record<
  SyncEvent['source'],
  { tone: string; label: string }
> = {
  Xero: { tone: 'bg-[#13B5EA]/12 text-[#0894C8]', label: 'Xero' },
  Bank: { tone: 'bg-sovereign/10 text-sovereign', label: 'Bank feed' },
  Payroll: { tone: 'bg-signal-info-soft text-signal-info', label: 'Payroll' },
  ATO: { tone: 'bg-emerald/12 text-emerald-deep', label: 'ATO' },
}

const arTone: Record<ARBucket['tone'], string> = {
  positive: 'bg-emerald',
  neutral: 'bg-signal-info',
  warning: 'bg-signal-warning',
  risk: 'bg-signal-risk',
}

const causeTone: Record<RootCause['tone'], { Icon: typeof TrendingDown; tone: string }> = {
  risk: { Icon: TrendingDown, tone: 'text-signal-risk bg-signal-risk-soft' },
  warning: { Icon: Banknote, tone: 'text-signal-warning bg-signal-warning-soft' },
  info: { Icon: Receipt, tone: 'text-signal-info bg-signal-info-soft' },
}

export function ClientWorkspace() {
  const totalAR = arAging.reduce((acc, b) => acc + b.amount, 0)

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12px] text-ink-subtle">
        <Link
          to={ROUTES.root}
          className="inline-flex items-center gap-1 hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" />
          Advisor dashboard
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={ROUTES.clients} className="hover:text-ink">
          Portfolio
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink">{redhill.name}</span>
      </div>

      {/* Header card */}
      <header className="rounded-lg border border-signal-risk/30 bg-card shadow-card-sm">
        <div className="flex flex-wrap items-start justify-between gap-5 p-5">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-sovereign text-canvas text-base font-semibold">
              RC
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[24px] font-semibold leading-tight tracking-tight-bank text-ink">
                  {redhill.name}
                </h2>
                <Badge variant="risk">Critical · {redhill.healthScore}</Badge>
                <Badge variant="secondary" className="gap-1">
                  <span className="relative inline-flex">
                    <span className="absolute -left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald" />
                    <span className="absolute -left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 animate-pulse-soft rounded-full bg-emerald opacity-70" />
                    <span className="pl-1">Synced {redhill.lastSyncMin} min ago</span>
                  </span>
                </Badge>
              </div>
              <p className="text-[13px] text-ink-muted">
                {redhill.industry} · {redhill.region} · ABN {redhill.abn} · FY ends {redhill.fyEnd}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[12px] text-ink-subtle">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  {redhill.ownerContact}
                </span>
                <span>·</span>
                <span>Fuel advisor · {redhill.fuelAdvisor}</span>
                <span>·</span>
                <span className="tabular">{formatAUD(redhill.arr, { compact: true })} ARR</span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                {redhill.integrations.map((i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded border border-hairline bg-canvas-subtle/70 px-1.5 py-0.5 text-[10.5px] font-medium text-ink-muted"
                  >
                    <Plug className="h-2.5 w-2.5" />
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              Email Marcus
            </Button>
            <Button variant="secondary" size="sm" className="gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              Log call
            </Button>
            <Button size="sm" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              AI summary
            </Button>
          </div>
        </div>
      </header>

      {/* Live ledger strip */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {ledger.map((card) => (
          <div
            key={card.id}
            className="rounded-lg border border-hairline bg-card p-4 shadow-card-sm"
          >
            <p className="eyebrow truncate">{card.label}</p>
            <p className="mt-2 text-[20px] font-semibold leading-none tracking-tight-bank text-ink tabular">
              {card.value}
            </p>
            <span
              className={cn(
                'mt-2 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10.5px] font-medium tabular',
                ledgerTone[card.deltaTone],
              )}
            >
              {card.delta}
            </span>
            <p className="mt-1.5 text-[10.5px] text-ink-subtle truncate">{card.context}</p>
          </div>
        ))}
      </section>

      {/* Cash projection + health */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Cash projection chart */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-8">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-signal-risk-soft text-signal-risk">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Cash position · projected 42 days
                </h3>
                <p className="text-xs text-ink-muted">
                  Predicted to cross zero around day 14 · trough −$42k on day 21
                </p>
              </div>
            </div>
            <Badge variant="risk">Critical window: 14–28 Jun</Badge>
          </header>

          <div className="p-5">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashProjection} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bandFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#DC2626" stopOpacity={0.14} />
                      <stop offset="100%" stopColor="#DC2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <ReferenceArea x1={14} x2={28} fill="#DC2626" fillOpacity={0.06} />
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stroke="transparent"
                    fill="url(#bandFill)"
                    name="Upper bound"
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stroke="transparent"
                    fill="#ffffff"
                    name="Lower bound"
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="#0E2C4A"
                    strokeWidth={2.2}
                    dot={{ r: 2.5 }}
                    name="Projected"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-ink-subtle">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded bg-sovereign" />
                Projected cash
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded bg-signal-risk-soft" />
                Confidence band (P25–P75)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded bg-signal-risk/30" />
                Predicted shortfall window
              </span>
            </div>
          </div>
        </section>

        {/* Health score panel */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-4">
          <header className="border-b border-hairline px-5 py-4">
            <p className="eyebrow">Financial health</p>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-[36px] font-semibold leading-none text-signal-risk tabular">
                {redhill.healthScore}
              </span>
              <span className="text-[12px] font-medium text-signal-risk tabular">
                {redhill.scoreDelta} · 6 weeks
              </span>
            </div>
            <p className="mt-1.5 text-[12px] text-ink-muted">
              Dropped from <span className="font-medium text-ink">Stable (58)</span> to{' '}
              <span className="font-medium text-signal-risk">Critical</span>
            </p>

            <div className="mt-3 h-[44px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreTrend} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#DC2626"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </header>

          <ul className="divide-y divide-hairline">
            {healthDrivers.map((d) => (
              <li key={d.driver} className="grid grid-cols-12 gap-3 px-5 py-3">
                <div className="col-span-7">
                  <p className="text-[12.5px] text-ink-muted">{d.driver}</p>
                  <p className="text-[10px] text-ink-subtle">Weight {(d.weight * 100).toFixed(0)}%</p>
                </div>
                <div className="col-span-3 self-center">
                  <div className="h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        d.score >= 70
                          ? 'bg-emerald'
                          : d.score >= 50
                          ? 'bg-signal-info'
                          : d.score >= 35
                          ? 'bg-signal-warning'
                          : 'bg-signal-risk',
                      )}
                      style={{ width: `${d.score}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-2 text-right text-[12px] tabular">
                  <span className="font-semibold text-ink">{d.score}</span>
                  <span
                    className={cn(
                      'ml-1 text-[10.5px]',
                      d.deltaPp >= 0 ? 'text-emerald-deep' : 'text-signal-risk',
                    )}
                  >
                    {d.deltaPp >= 0 ? '+' : ''}
                    {d.deltaPp}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* AR aging + root causes + live feed */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* AR aging */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-5">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-signal-warning-soft text-signal-warning">
                <Landmark className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Receivables aging
                </h3>
                <p className="text-xs text-ink-muted">
                  {formatAUD(totalAR, { compact: true })} outstanding ·{' '}
                  {Math.round(((arAging[2].amount + arAging[3].amount) / totalAR) * 100)}% aged &gt; 60 days
                </p>
              </div>
            </div>
          </header>

          <div className="p-5">
            <div className="flex h-2.5 overflow-hidden rounded-full bg-canvas-subtle">
              {arAging.map((b) => (
                <div
                  key={b.range}
                  className={cn('h-full', arTone[b.tone])}
                  style={{ width: `${(b.amount / totalAR) * 100}%` }}
                  aria-label={`${b.range}: ${b.amount}`}
                />
              ))}
            </div>

            <ul className="mt-4 space-y-3">
              {arAging.map((b) => (
                <li key={b.range} className="flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', arTone[b.tone])} />
                    <span className="text-ink-muted">{b.range}</span>
                  </span>
                  <span className="tabular text-ink">{formatAUD(b.amount, { compact: true })}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-md border border-hairline bg-canvas-subtle/50 p-3">
              <p className="text-[11px] uppercase tracking-wide-eyebrow text-ink-subtle">
                Top debtors
              </p>
              <ul className="mt-2 space-y-1.5">
                {topDebtors.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3 text-[12.5px]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-ink">{d.name}</p>
                      <p className="text-[10.5px] text-ink-subtle">
                        {d.daysAged}d aged · last contact {d.lastContact}
                      </p>
                    </div>
                    <span className="font-medium text-ink tabular">
                      {formatAUD(d.amount, { compact: true })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Root cause + actions */}
        <section className="flex flex-col gap-5 xl:col-span-4">
          <div className="rounded-lg border border-hairline bg-card shadow-card-sm">
            <header className="flex items-center gap-2.5 border-b border-hairline px-5 py-4">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign text-canvas">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Why this client is Critical
                </h3>
                <p className="text-xs text-ink-muted">Root causes detected by Fuel</p>
              </div>
            </header>
            <ul className="divide-y divide-hairline">
              {rootCauses.map((rc) => {
                const tone = causeTone[rc.tone]
                return (
                  <li key={rc.id} className="flex items-start gap-3 px-5 py-3">
                    <div className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-md', tone.tone)}>
                      <tone.Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-ink">{rc.title}</p>
                      <p className="mt-0.5 text-[12px] text-ink-muted">{rc.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* Live sync feed */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-3">
          <header className="flex items-center gap-2.5 border-b border-hairline px-5 py-4">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald/12 text-emerald-deep">
              <Plug className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold tracking-tight-bank text-ink">
                Live data sync
              </h3>
              <p className="text-[11px] text-ink-muted">No manual reconciliation</p>
            </div>
          </header>
          <ul className="divide-y divide-hairline">
            {syncFeed.map((e) => {
              const meta = sourceMeta[e.source]
              const ago = e.agoMin >= 60
                ? `${Math.round(e.agoMin / 60)}h ago`
                : `${e.agoMin}m ago`
              return (
                <li key={e.id} className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <span
                      className={cn(
                        'inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-medium',
                        meta.tone,
                      )}
                    >
                      {meta.label}
                    </span>
                    <span className="text-[10px] text-ink-subtle tabular">{ago}</span>
                  </div>
                  <p className="mt-1.5 text-[12px] text-ink">{e.message}</p>
                  <p className="text-[10.5px] text-ink-subtle">{e.detail}</p>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      {/* Recommended actions */}
      <section className="rounded-lg border border-hairline bg-card shadow-card-sm">
        <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald text-canvas">
              <Wallet className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                Recommended next actions
              </h3>
              <p className="text-xs text-ink-muted">Ordered by cash impact in the critical window</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="gap-1.5" asChild>
            <Link to={ROUTES.advisory}>
              View all advisory
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </header>
        <ul className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2 lg:grid-cols-4">
          {recommendedActions.map((a) => (
            <li key={a.id} className="flex flex-col gap-2 bg-card p-5">
              <div className="flex items-start justify-between">
                <Badge
                  variant={
                    a.impact === 'High' ? 'risk' : a.impact === 'Medium' ? 'warning' : 'neutral'
                  }
                  className="px-1.5"
                >
                  {a.impact}
                </Badge>
                {(a.estCash || a.estMargin) && (
                  <span className="text-[13px] font-semibold text-emerald-deep tabular">
                    {a.estCash ?? a.estMargin}
                  </span>
                )}
              </div>
              <p className="text-[13.5px] font-medium text-ink">{a.title}</p>
              <p className="text-[12px] text-ink-muted">{a.detail}</p>
              <div className="mt-auto flex items-center gap-2 pt-2">
                <Button size="sm" className="gap-1.5">
                  <Users2 className="h-3.5 w-3.5" />
                  Assign
                </Button>
                <Button variant="ghost" size="sm">
                  Dismiss
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
