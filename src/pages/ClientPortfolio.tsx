import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Filter,
  Plug,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { clients, portfolioFilters, portfolioStats } from '@/data/clients'
import type { HealthBand } from '@/data/dashboard'
import { formatAUD, formatPercent } from '@/utils/format'
import { cn } from '@/utils/cn'

const bandStyles: Record<HealthBand, string> = {
  Strong: 'bg-signal-positive-soft text-emerald-deep',
  Stable: 'bg-signal-info-soft text-signal-info',
  'At Risk': 'bg-signal-warning-soft text-signal-warning',
  Critical: 'bg-signal-risk-soft text-signal-risk',
}

const integrationBadge: Record<string, string> = {
  Xero: 'bg-[#13B5EA]/12 text-[#0894C8]',
  QuickBooks: 'bg-[#2CA01C]/12 text-[#1C7A14]',
  MYOB: 'bg-[#6610F2]/12 text-[#4F0DBF]',
}

type FilterKey = 'segment' | 'industry' | 'health' | 'advisor'

export function ClientPortfolio() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    segment: 'All',
    industry: 'All',
    health: 'All',
    advisor: 'All',
  })
  const [openMenu, setOpenMenu] = useState<FilterKey | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return clients.filter((c) => {
      if (q) {
        const hay = `${c.name} ${c.industry} ${c.advisor} ${c.topAlert ?? ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (filters.segment !== 'All' && c.segment !== filters.segment) return false
      if (filters.industry !== 'All' && c.industry !== filters.industry) return false
      if (filters.health !== 'All' && c.health !== filters.health) return false
      if (filters.advisor !== 'All' && c.advisor !== filters.advisor) return false
      return true
    })
  }, [query, filters])

  const advisorOptions = useMemo(
    () => ['All', ...Array.from(new Set(clients.map((c) => c.advisor)))],
    [],
  )

  const activeFilterCount =
    Object.values(filters).filter((v) => v !== 'All').length + (query ? 1 : 0)

  const reset = () => {
    setFilters({ segment: 'All', industry: 'All', health: 'All', advisor: 'All' })
    setQuery('')
  }

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Workspace · Portfolio</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Client Portfolio
          </h2>
          <p className="text-sm text-ink-muted">
            All {portfolioStats.total} clients · {portfolioStats.totalARR} ARR · avg health{' '}
            <span className="font-medium text-ink">{portfolioStats.avgHealth}</span> · {portfolioStats.liveSyncs} live data feeds
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Columns
          </Button>
          <Button size="sm" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            AI summary
          </Button>
        </div>
      </header>

      {/* Stat strip */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total ARR" value={portfolioStats.totalARR} tone="ink" />
        <StatTile label="Avg health" value={String(portfolioStats.avgHealth)} delta="−1 wk" tone="warn" />
        <StatTile label="Live feeds" value={String(portfolioStats.liveSyncs)} sub="6 sources" tone="ink" />
        <StatTile label="At risk + critical" value="33" sub="23% of book" tone="risk" />
      </section>

      {/* Filter row */}
      <section className="flex flex-wrap items-center gap-2 rounded-lg border border-hairline bg-card p-3 shadow-card-sm">
        <div className="flex flex-1 min-w-[220px] items-center gap-2 rounded-md border border-hairline bg-canvas px-3 py-1.5 text-sm focus-within:border-sovereign focus-within:ring-2 focus-within:ring-sovereign/15">
          <Search className="h-4 w-4 text-ink-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clients, alerts, advisors…"
            className="w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery('')}
              className="grid h-5 w-5 place-items-center rounded text-ink-subtle hover:bg-canvas-subtle hover:text-ink"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <FilterDropdown
          label="Segment"
          options={[...portfolioFilters.segments]}
          value={filters.segment}
          onChange={(v) => setFilters((f) => ({ ...f, segment: v }))}
          open={openMenu === 'segment'}
          onOpenChange={(o) => setOpenMenu(o ? 'segment' : null)}
        />
        <FilterDropdown
          label="Industry"
          options={[...portfolioFilters.industries]}
          value={filters.industry}
          onChange={(v) => setFilters((f) => ({ ...f, industry: v }))}
          open={openMenu === 'industry'}
          onOpenChange={(o) => setOpenMenu(o ? 'industry' : null)}
        />
        <FilterDropdown
          label="Health"
          options={[...portfolioFilters.health]}
          value={filters.health}
          onChange={(v) => setFilters((f) => ({ ...f, health: v }))}
          open={openMenu === 'health'}
          onOpenChange={(o) => setOpenMenu(o ? 'health' : null)}
        />
        <FilterDropdown
          label="Advisor"
          options={advisorOptions}
          value={filters.advisor}
          onChange={(v) => setFilters((f) => ({ ...f, advisor: v }))}
          open={openMenu === 'advisor'}
          onOpenChange={(o) => setOpenMenu(o ? 'advisor' : null)}
        />

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" className="gap-1.5 text-ink-muted" onClick={reset}>
            <X className="h-3.5 w-3.5" />
            Clear {activeFilterCount}
          </Button>
        )}
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-lg border border-hairline bg-card shadow-card-sm">
        <div className="grid grid-cols-12 gap-3 border-b border-hairline bg-canvas-subtle/60 px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide-eyebrow text-ink-subtle">
          <div className="col-span-3">Client</div>
          <div className="col-span-1 text-right">Health</div>
          <div className="col-span-2">Segment / Industry</div>
          <div className="col-span-1 text-right">ARR</div>
          <div className="col-span-1 text-right">Margin</div>
          <div className="col-span-1 text-right">Growth</div>
          <div className="col-span-2">Top alert</div>
          <div className="col-span-1">Sync</div>
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-ink">No clients match these filters</p>
            <p className="mt-1 text-xs text-ink-muted">
              Try clearing one to widen the result set.
            </p>
            <button
              onClick={reset}
              className="mt-3 text-[12px] font-medium text-sovereign hover:text-sovereign-600"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-hairline">
            {filtered.map((c) => {
              const positive = c.scoreDelta > 0
              return (
                <li key={c.id}>
                  <Link
                    to={`/client/${c.id}`}
                    className="group grid grid-cols-12 items-center gap-3 px-5 py-3 transition-colors hover:bg-canvas-subtle/60"
                  >
                    <div className="col-span-3 flex items-center gap-2.5">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-sovereign/8 text-[11px] font-semibold text-sovereign transition-colors group-hover:bg-sovereign group-hover:text-canvas">
                        {c.name
                          .split(' ')
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-medium text-ink">{c.name}</p>
                        <p className="truncate text-[11px] text-ink-subtle">{c.advisor}</p>
                      </div>
                    </div>

                    <div className="col-span-1 flex items-center justify-end gap-1">
                      <span
                        className={cn(
                          'rounded px-1.5 py-0.5 text-[11px] font-medium',
                          bandStyles[c.health],
                        )}
                      >
                        {c.healthScore}
                      </span>
                      <span
                        className={cn(
                          'flex items-center text-[11px] tabular',
                          positive ? 'text-emerald-deep' : 'text-signal-warning',
                        )}
                      >
                        {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(c.scoreDelta)}
                      </span>
                    </div>

                    <div className="col-span-2 min-w-0">
                      <p className="truncate text-[12.5px] text-ink">{c.segment}</p>
                      <p className="truncate text-[11px] text-ink-subtle">{c.industry}</p>
                    </div>

                    <div className="col-span-1 text-right text-[13px] font-medium text-ink tabular">
                      {formatAUD(c.arr, { compact: true })}
                    </div>

                    <div className="col-span-1 text-right text-[13px] text-ink tabular">
                      {formatPercent(c.marginPct)}
                    </div>

                    <div
                      className={cn(
                        'col-span-1 text-right text-[13px] tabular',
                        c.recRevenueGrowth >= 0 ? 'text-emerald-deep' : 'text-signal-risk',
                      )}
                    >
                      {formatPercent(c.recRevenueGrowth, { signed: true })}
                    </div>

                    <div className="col-span-2 min-w-0">
                      {c.topAlert ? (
                        <p className="truncate text-[12.5px] text-ink-muted">{c.topAlert}</p>
                      ) : (
                        <span className="text-[11px] text-ink-faint">—</span>
                      )}
                    </div>

                    <div className="col-span-1 flex items-center gap-1.5">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium',
                          integrationBadge[c.integration],
                        )}
                      >
                        <Plug className="h-2.5 w-2.5" />
                        {c.integration}
                      </span>
                      <span className="text-[10px] text-ink-subtle tabular">{c.lastSyncMin}m</span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}

        <div className="flex items-center justify-between border-t border-hairline px-5 py-3 text-xs text-ink-muted">
          <span>
            Showing {filtered.length} of {portfolioStats.total} clients
            {activeFilterCount > 0 && ' (filtered)'}
          </span>
          <button className="font-medium text-sovereign hover:text-sovereign-600">
            Load more →
          </button>
        </div>
      </section>
    </div>
  )
}

function StatTile({
  label,
  value,
  sub,
  delta,
  tone = 'ink',
}: {
  label: string
  value: string
  sub?: string
  delta?: string
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
      <p className={cn('mt-2 text-[22px] font-semibold tracking-tight-bank tabular', toneText)}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px] text-ink-subtle">{sub ?? delta ?? ' '}</p>
    </div>
  )
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
  open,
  onOpenChange,
}: {
  label: string
  options: readonly string[]
  value: string
  onChange: (v: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const active = value !== 'All'
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[12px] transition-colors',
          active
            ? 'border-sovereign/40 bg-sovereign/8 text-sovereign'
            : 'border-hairline bg-canvas text-ink-muted hover:bg-canvas-subtle',
        )}
      >
        <span className="text-[10px] uppercase tracking-wide-eyebrow text-ink-subtle">{label}</span>
        <span className={cn('font-medium', active ? 'text-sovereign' : 'text-ink')}>{value}</span>
        <ChevronDown className={cn('h-3 w-3 text-ink-subtle transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => onOpenChange(false)} aria-hidden />
          <div className="absolute left-0 top-full z-40 mt-1 w-44 overflow-hidden rounded-md border border-hairline bg-card shadow-card-lg">
            <ul className="max-h-64 overflow-y-auto py-1">
              {options.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt)
                      onOpenChange(false)
                    }}
                    className={cn(
                      'block w-full px-3 py-1.5 text-left text-[12.5px] transition-colors hover:bg-canvas-subtle',
                      opt === value ? 'font-medium text-sovereign' : 'text-ink',
                    )}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
