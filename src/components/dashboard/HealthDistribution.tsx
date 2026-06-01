import { healthDistribution, type HealthBand } from '@/data/dashboard'
import { cn } from '@/utils/cn'

const bandStyles: Record<
  HealthBand,
  { dot: string; bar: string; chip: string }
> = {
  Strong: {
    dot: 'bg-emerald',
    bar: 'bg-emerald',
    chip: 'text-emerald-deep',
  },
  Stable: {
    dot: 'bg-signal-info',
    bar: 'bg-signal-info',
    chip: 'text-signal-info',
  },
  'At Risk': {
    dot: 'bg-signal-warning',
    bar: 'bg-signal-warning',
    chip: 'text-signal-warning',
  },
  Critical: {
    dot: 'bg-signal-risk',
    bar: 'bg-signal-risk',
    chip: 'text-signal-risk',
  },
}

export function HealthDistribution() {
  const total = healthDistribution.reduce((acc, b) => acc + b.count, 0)

  return (
    <section className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="eyebrow">Portfolio health</p>
          <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">
            Client distribution by health band
          </h3>
        </div>
        <p className="text-xs text-ink-subtle">{total} clients</p>
      </div>

      {/* Stacked bar */}
      <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-canvas-subtle">
        {healthDistribution.map((b) => (
          <div
            key={b.band}
            className={cn('h-full', bandStyles[b.band].bar)}
            style={{ width: `${(b.count / total) * 100}%` }}
            aria-label={`${b.band}: ${b.count}`}
          />
        ))}
      </div>

      <ul className="mt-5 space-y-3">
        {healthDistribution.map((b) => (
          <li key={b.band} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className={cn('h-2 w-2 rounded-full', bandStyles[b.band].dot)} />
              <span className="text-sm text-ink">{b.band}</span>
            </div>
            <div className="flex items-baseline gap-2.5 tabular">
              <span className="text-sm font-semibold text-ink">{b.count}</span>
              <span className="text-[11px] text-ink-subtle">{b.arr} ARR</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
