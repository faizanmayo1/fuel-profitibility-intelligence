import { Sparkles, TrendingUp } from 'lucide-react'

import { advisorySummary } from '@/data/dashboard'

export function AdvisorySummaryCard() {
  return (
    <section className="overflow-hidden rounded-lg border border-sovereign/15 bg-gradient-to-br from-sovereign to-sovereign-700 text-canvas shadow-card-sm">
      <div className="flex items-start justify-between gap-3 p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-soft" />
          <p className="text-[11px] font-medium uppercase tracking-wide-eyebrow text-canvas/70">
            Advisory uplift · this month
          </p>
        </div>
        <span className="rounded-full bg-emerald/20 px-2 py-0.5 text-[10px] font-medium text-emerald-soft">
          Live
        </span>
      </div>

      <div className="px-5 pb-2">
        <p className="text-[36px] font-semibold leading-none tracking-tight-bank text-canvas tabular">
          {advisorySummary.realisedUplift}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[12px] text-emerald-soft">
          <TrendingUp className="h-3 w-3" />
          Realised client uplift attributed to Fuel recommendations
        </p>
      </div>

      <div className="grid grid-cols-3 border-t border-canvas/10 text-center">
        <div className="px-2 py-3">
          <p className="text-[11px] uppercase tracking-wide-eyebrow text-canvas/60">Recs</p>
          <p className="mt-1 text-base font-semibold tabular">
            {advisorySummary.monthlyRecommendations}
          </p>
        </div>
        <div className="border-x border-canvas/10 px-2 py-3">
          <p className="text-[11px] uppercase tracking-wide-eyebrow text-canvas/60">Accepted</p>
          <p className="mt-1 text-base font-semibold tabular">
            {advisorySummary.acceptedRate}%
          </p>
        </div>
        <div className="px-2 py-3">
          <p className="text-[11px] uppercase tracking-wide-eyebrow text-canvas/60">Hours saved</p>
          <p className="mt-1 text-base font-semibold tabular">{advisorySummary.hoursSaved}</p>
        </div>
      </div>
    </section>
  )
}
