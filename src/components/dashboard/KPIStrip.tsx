import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'

import { kpis } from '@/data/dashboard'
import { cn } from '@/utils/cn'

const toneStyles = {
  positive: 'text-emerald-deep bg-signal-positive-soft',
  warning: 'text-signal-warning bg-signal-warning-soft',
  risk: 'text-signal-risk bg-signal-risk-soft',
  neutral: 'text-ink-muted bg-canvas-subtle',
} as const

const toneIcon = {
  positive: ArrowUpRight,
  warning: ArrowDownRight,
  risk: ArrowDownRight,
  neutral: Minus,
} as const

export function KPIStrip() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = toneIcon[kpi.deltaTone]
        return (
          <div
            key={kpi.id}
            className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm"
          >
            <p className="eyebrow">{kpi.label}</p>
            <p className="mt-3 text-[32px] font-semibold leading-none tracking-tight-bank text-ink tabular">
              {kpi.value}
            </p>
            <div
              className={cn(
                'mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium',
                toneStyles[kpi.deltaTone],
              )}
            >
              <Icon className="h-3 w-3" />
              {kpi.delta}
            </div>
            <p className="mt-2 text-xs text-ink-subtle">{kpi.context}</p>
          </div>
        )
      })}
    </section>
  )
}
