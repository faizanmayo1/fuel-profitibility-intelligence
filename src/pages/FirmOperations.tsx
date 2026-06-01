import { ArrowRight, ChevronDown, Filter, Gauge, Sparkles, Users } from 'lucide-react'
import { useState } from 'react'

import { AutoAssignModal } from '@/components/firm/AutoAssignModal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { advisors, firmSummary, segments, slas, type Segment } from '@/data/firm'
import { formatAUD } from '@/utils/format'
import { cn } from '@/utils/cn'

const segTone: Record<Segment['tone'], { bar: string; chip: string }> = {
  sovereign: { bar: 'bg-sovereign', chip: 'text-sovereign' },
  risk: { bar: 'bg-signal-risk', chip: 'text-signal-risk' },
  positive: { bar: 'bg-emerald', chip: 'text-emerald-deep' },
  info: { bar: 'bg-signal-info', chip: 'text-signal-info' },
  neutral: { bar: 'bg-ink-faint', chip: 'text-ink-muted' },
}

export function FirmOperations() {
  const totalSegmentArr = segments.reduce((acc, s) => acc + s.arr, 0)
  const [autoAssignOpen, setAutoAssignOpen] = useState(false)

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Firm · Operations</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Firm operations
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            How the firm is scaling advisory across {firmSummary.clients} clients and{' '}
            {firmSummary.advisors} advisors. SLA tracking, workload balance, and performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            This week
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => setAutoAssignOpen(true)}>
            <Sparkles className="h-3.5 w-3.5" />
            Auto-assign actions
          </Button>
        </div>
      </header>

      {/* Stat strip */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Clients managed" value={String(firmSummary.clients)} sub={firmSummary.totalARR + ' ARR'} tone="ink" />
        <Stat label="Open advisory actions" value={String(firmSummary.openActions)} sub="across team" tone="warn" />
        <Stat label="MTD uplift" value={formatAUD(firmSummary.totalUpliftMTD, { compact: true })} sub="realised for clients" tone="positive" />
        <Stat label="SLA within target" value={`${firmSummary.slaWithin}%`} sub="firm-wide" tone="positive" />
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Advisor workload */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-8">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign/8 text-sovereign">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Advisor workload &amp; performance
                </h3>
                <p className="text-xs text-ink-muted">Live — synced from Fuel workspace</p>
              </div>
            </div>
            <Badge variant="info">4 active</Badge>
          </header>

          <div className="grid grid-cols-12 gap-3 border-b border-hairline bg-canvas-subtle/60 px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide-eyebrow text-ink-subtle">
            <div className="col-span-3">Advisor</div>
            <div className="col-span-2 text-right">Clients</div>
            <div className="col-span-2 text-right">ARR</div>
            <div className="col-span-2 text-right">Open actions</div>
            <div className="col-span-2 text-right">SLA</div>
            <div className="col-span-1 text-right">MTD</div>
          </div>

          <ul className="divide-y divide-hairline">
            {advisors.map((a) => (
              <li
                key={a.id}
                className="grid grid-cols-12 items-center gap-3 px-5 py-3 transition-colors hover:bg-canvas-subtle/60"
              >
                <div className="col-span-3 flex items-center gap-2.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sovereign text-canvas text-xs font-semibold tabular">
                    {a.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-medium text-ink">{a.name}</p>
                    <p className="truncate text-[11px] text-ink-subtle">{a.role}</p>
                  </div>
                </div>
                <div className="col-span-2 text-right text-[13px] text-ink tabular">{a.clients}</div>
                <div className="col-span-2 text-right text-[13px] text-ink tabular">
                  {formatAUD(a.arrManaged, { compact: true })}
                </div>
                <div className="col-span-2 text-right">
                  <p className="text-[13px] font-medium text-ink tabular">{a.openActions}</p>
                  <p className="text-[10px] text-ink-subtle">{a.acceptanceRate}% accept</p>
                </div>
                <div className="col-span-2 text-right">
                  <span
                    className={cn(
                      'inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium tabular',
                      a.slaWithin >= 90
                        ? 'bg-signal-positive-soft text-emerald-deep'
                        : a.slaWithin >= 85
                        ? 'bg-signal-info-soft text-signal-info'
                        : 'bg-signal-warning-soft text-signal-warning',
                    )}
                  >
                    {a.slaWithin}%
                  </span>
                </div>
                <div className="col-span-1 text-right text-[13px] font-semibold text-emerald-deep tabular">
                  {formatAUD(a.upliftMTD, { compact: true })}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* SLA panel */}
        <section className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm xl:col-span-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald/12 text-emerald-deep">
              <Gauge className="h-4 w-4" />
            </div>
            <div>
              <p className="eyebrow">SLA tracking</p>
              <h3 className="mt-0.5 text-[15px] font-semibold tracking-tight-bank text-ink">
                Response &amp; turnaround
              </h3>
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            {slas.map((s) => {
              const pct = s.unit === '%' ? s.actual : Math.min((s.target / s.actual) * 100, 100)
              return (
                <li key={s.metric}>
                  <div className="flex items-baseline justify-between text-[12px]">
                    <span className="text-ink-muted">{s.metric}</span>
                    <span className={cn('tabular', s.ahead ? 'text-emerald-deep' : 'text-signal-warning')}>
                      {s.actual}{s.unit} <span className="text-ink-subtle">/ {s.target}{s.unit}</span>
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                    <div
                      className={cn('h-full rounded-full', s.ahead ? 'bg-emerald' : 'bg-signal-warning')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      {/* Segmentation */}
      <section className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Client segmentation</p>
            <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">
              Where the book sits
            </h3>
          </div>
          <button className="inline-flex items-center gap-1 text-[12.5px] font-medium text-sovereign hover:text-sovereign-600">
            View detail
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-canvas-subtle">
          {segments.map((s) => (
            <div
              key={s.name}
              className={cn('h-full', segTone[s.tone].bar)}
              style={{ width: `${(s.arr / totalSegmentArr) * 100}%` }}
              aria-label={s.name}
            />
          ))}
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {segments.map((s) => (
            <li key={s.name}>
              <div className="flex items-center gap-2">
                <span className={cn('h-2 w-2 rounded-full', segTone[s.tone].bar)} />
                <span className="text-[12.5px] font-medium text-ink">{s.name}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1.5 tabular">
                <span className="text-[18px] font-semibold text-ink">{s.count}</span>
                <span className="text-[11px] text-ink-subtle">clients</span>
              </div>
              <p className={cn('text-[11px] tabular', segTone[s.tone].chip)}>
                {formatAUD(s.arr, { compact: true })} ARR
              </p>
            </li>
          ))}
        </ul>
      </section>

      <AutoAssignModal open={autoAssignOpen} onClose={() => setAutoAssignOpen(false)} />
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
