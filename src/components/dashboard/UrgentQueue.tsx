import { AlertTriangle, ArrowRight, Banknote, Receipt, TrendingDown, Users2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { urgentClients, type HealthBand, type UrgentClient } from '@/data/dashboard'
import { cn } from '@/utils/cn'

const bandStyles: Record<HealthBand, string> = {
  Strong: 'bg-signal-positive-soft text-emerald-deep',
  Stable: 'bg-signal-info-soft text-signal-info',
  'At Risk': 'bg-signal-warning-soft text-signal-warning',
  Critical: 'bg-signal-risk-soft text-signal-risk',
}

const signalMeta: Record<
  UrgentClient['signal'],
  { label: string; Icon: typeof TrendingDown; tone: string }
> = {
  cash: { label: 'Cash stress', Icon: Banknote, tone: 'text-signal-risk' },
  margin: { label: 'Margin leak', Icon: TrendingDown, tone: 'text-signal-warning' },
  tax: { label: 'Tax exposure', Icon: Receipt, tone: 'text-signal-info' },
  payroll: { label: 'Payroll drift', Icon: Users2, tone: 'text-signal-warning' },
}

export function UrgentQueue() {
  return (
    <section className="rounded-lg border border-hairline bg-card shadow-card-sm">
      <header className="flex items-start justify-between gap-3 border-b border-hairline px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-signal-risk-soft text-signal-risk">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
              Today&apos;s priority queue
            </h3>
            <p className="text-xs text-ink-muted">
              5 clients ranked by urgency · who to call first
            </p>
          </div>
        </div>
        <Badge variant="risk" className="self-center">
          {urgentClients.filter((c) => c.health === 'Critical').length} Critical
        </Badge>
      </header>

      <ul className="divide-y divide-hairline">
        {urgentClients.map((c, idx) => {
          const sig = signalMeta[c.signal]
          return (
            <li key={c.id}>
              <Link
                to={`/client/${c.id}`}
                className="group grid grid-cols-12 items-start gap-4 px-5 py-4 transition-colors hover:bg-canvas-subtle/60"
                aria-label={`Open ${c.name}`}
              >
              {/* Rank + identity */}
              <div className="col-span-12 flex items-start gap-3 md:col-span-4">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-hairline bg-canvas-subtle text-xs font-semibold text-ink-muted tabular">
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-ink">{c.name}</p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-ink-subtle">{c.industry}</span>
                    <span className="text-xs text-ink-faint">·</span>
                    <span className="text-xs text-ink-subtle">ARR {c.arr}</span>
                  </div>
                </div>
              </div>

              {/* Health score */}
              <div className="col-span-6 md:col-span-2">
                <p className="eyebrow">Health</p>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-[11px] font-medium',
                      bandStyles[c.health],
                    )}
                  >
                    {c.health}
                  </span>
                  <span className="text-[13px] font-semibold text-ink tabular">
                    {c.healthScore}
                  </span>
                  <span className="text-[11px] font-medium text-signal-risk tabular">
                    {c.scoreDelta}
                  </span>
                </div>
              </div>

              {/* Signal */}
              <div className="col-span-6 md:col-span-2">
                <p className="eyebrow">Signal</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <sig.Icon className={cn('h-3.5 w-3.5', sig.tone)} />
                  <span className="text-[13px] font-medium text-ink">{sig.label}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-ink-subtle tabular">
                  {c.amount}
                  {c.windowDays > 0 && ` · ${c.windowDays}d window`}
                </p>
              </div>

              {/* Reason */}
              <div className="col-span-12 md:col-span-4">
                <p className="text-[13px] leading-snug text-ink-muted">{c.reason}</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-ink-subtle">
                    Last touch · {c.lastTouchDays}d ago
                  </span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-medium text-sovereign">
                    Open client
                    <ArrowRight className="h-3 w-3 opacity-70 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
