import { Activity, Banknote, Eye, Receipt, Sparkles, TrendingDown, Users2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { aiAlerts, type AIAlert } from '@/data/dashboard'
import { ROUTES } from '@/routes/paths'
import { cn } from '@/utils/cn'

const categoryRoute: Record<AIAlert['category'], string> = {
  'Margin leak': ROUTES.profitability,
  'Cash stress': ROUTES.cashflow,
  'Tax exposure': ROUTES.tax,
  'Payroll drift': ROUTES.payroll,
  Anomaly: ROUTES.payroll,
}

const categoryMeta: Record<
  AIAlert['category'],
  { Icon: typeof TrendingDown; tone: string; pill: 'warning' | 'risk' | 'info' | 'neutral' }
> = {
  'Margin leak': { Icon: TrendingDown, tone: 'text-signal-warning bg-signal-warning-soft', pill: 'warning' },
  'Cash stress': { Icon: Banknote, tone: 'text-signal-risk bg-signal-risk-soft', pill: 'risk' },
  'Tax exposure': { Icon: Receipt, tone: 'text-signal-info bg-signal-info-soft', pill: 'info' },
  'Payroll drift': { Icon: Users2, tone: 'text-signal-warning bg-signal-warning-soft', pill: 'warning' },
  Anomaly: { Icon: Activity, tone: 'text-ink-muted bg-canvas-subtle', pill: 'neutral' },
}

const impactPill = {
  High: 'risk',
  Medium: 'warning',
  Low: 'neutral',
} as const

export function AIAlertsFeed() {
  return (
    <section className="rounded-lg border border-hairline bg-card shadow-card-sm">
      <header className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign text-canvas">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
              AI signals across the portfolio
            </h3>
            <p className="text-xs text-ink-muted">
              Continuously detected · ranked by client materiality
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-1 text-[11px] text-ink-subtle sm:flex">
          <span className="relative inline-flex">
            <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald" />
            <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 animate-pulse-soft rounded-full bg-emerald opacity-70" />
            <span className="pl-1">Live</span>
          </span>
        </div>
      </header>

      <ul className="divide-y divide-hairline">
        {aiAlerts.map((alert) => {
          const meta = categoryMeta[alert.category]
          return (
            <li key={alert.id}>
              <Link
                to={categoryRoute[alert.category]}
                className="group flex items-start gap-3 px-5 py-4 transition-colors hover:bg-canvas-subtle/60"
              >
              <div className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-md', meta.tone)}>
                <meta.Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-medium text-ink">{alert.title}</p>
                  <Badge variant={impactPill[alert.impact]} className="px-1.5">
                    {alert.impact} impact
                  </Badge>
                </div>
                <p className="mt-1 text-[13px] leading-snug text-ink-muted">{alert.body}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-ink-subtle">
                  <span className="font-medium text-ink-muted">{alert.client}</span>
                  <span>·</span>
                  <span>{alert.category}</span>
                  <span>·</span>
                  <span>{alert.detectedAt}</span>
                </div>
              </div>

              <span
                aria-hidden
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-ink-subtle opacity-0 transition group-hover:opacity-100"
              >
                <Eye className="h-4 w-4" />
              </span>
              </Link>
            </li>
          )
        })}
      </ul>

      <footer className="flex items-center justify-between border-t border-hairline px-5 py-3 text-xs text-ink-muted">
        <span>Showing 6 of 47 active signals</span>
        <Link to={ROUTES.profitability} className="font-medium text-sovereign hover:text-sovereign-600">
          View all signals →
        </Link>
      </footer>
    </section>
  )
}
