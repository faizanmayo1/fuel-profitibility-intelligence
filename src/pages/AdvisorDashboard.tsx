import { CalendarRange, ChevronDown, Download, Filter, RadioTower } from 'lucide-react'

import { AIAlertsFeed } from '@/components/dashboard/AIAlertsFeed'
import { AdvisorySummaryCard } from '@/components/dashboard/AdvisorySummaryCard'
import { HealthDistribution } from '@/components/dashboard/HealthDistribution'
import { KPIStrip } from '@/components/dashboard/KPIStrip'
import { PortfolioTrendCard } from '@/components/dashboard/PortfolioTrendCard'
import { TodayActions } from '@/components/dashboard/TodayActions'
import { UrgentQueue } from '@/components/dashboard/UrgentQueue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { dashboardMeta, urgentClients } from '@/data/dashboard'

export function AdvisorDashboard() {
  const criticalCount = urgentClients.filter((c) => c.health === 'Critical').length
  const atRiskCount = urgentClients.filter((c) => c.health === 'At Risk').length

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-7 animate-fade-in">
      {/* ─── Header ──────────────────────────────────────── */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">Workspace · Advisor view</span>
            <Badge variant="secondary" className="gap-1 px-2 py-0.5">
              <RadioTower className="h-3 w-3 text-emerald" />
              <span className="relative inline-flex">
                <span className="absolute -left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald" />
                <span className="absolute -left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 animate-pulse-soft rounded-full bg-emerald opacity-70" />
                Live · synced {dashboardMeta.syncedMinutesAgo} min ago
              </span>
            </Badge>
          </div>
          <h2 className="text-[28px] font-semibold leading-tight tracking-tight-bank text-ink">
            Good morning, {dashboardMeta.advisorName}
          </h2>
          <p className="text-sm text-ink-muted">
            <span className="font-medium text-ink">{criticalCount + atRiskCount} clients</span> need
            advisory action today across your {dashboardMeta.totalClients}-client book ·{' '}
            {dashboardMeta.tenant} · {dashboardMeta.asOf}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <CalendarRange className="h-3.5 w-3.5" />
            This week
            <ChevronDown className="h-3.5 w-3.5 text-ink-subtle" />
          </Button>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Segment · All
            <ChevronDown className="h-3.5 w-3.5 text-ink-subtle" />
          </Button>
          <Button size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </header>

      {/* ─── KPI strip ───────────────────────────────────── */}
      <KPIStrip />

      {/* ─── Priority queue + side rail ──────────────────── */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <UrgentQueue />
        </div>
        <div className="flex flex-col gap-5 xl:col-span-4">
          <AdvisorySummaryCard />
          <HealthDistribution />
        </div>
      </div>

      {/* ─── AI signals + trend + today actions ──────────── */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <AIAlertsFeed />
        </div>
        <div className="flex flex-col gap-5 xl:col-span-4">
          <PortfolioTrendCard />
          <TodayActions />
        </div>
      </div>
    </div>
  )
}
