import { Download, FileText, Plus, Sparkles, Wand2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { reports, sampleNarrative, sampleVariance, type ReportEntry, type VarianceItem } from '@/data/reports'
import { formatPercent } from '@/utils/format'
import { cn } from '@/utils/cn'

const statusTone: Record<ReportEntry['status'], 'info' | 'warning' | 'positive'> = {
  'Auto-generated': 'info',
  'In review': 'warning',
  Delivered: 'positive',
}

const varianceTone: Record<VarianceItem['tone'], string> = {
  positive: 'text-emerald-deep',
  warning: 'text-signal-warning',
  risk: 'text-signal-risk',
  neutral: 'text-ink-muted',
}

export function AutoReporting() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Advisory Engine · Reporting</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Auto reporting
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            Continuous P&amp;L narratives, BAS packs, and board reports — written in plain English by Fuel and reviewed by advisors before delivery.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            New template
          </Button>
          <Button size="sm" className="gap-1.5">
            <Wand2 className="h-3.5 w-3.5" />
            Regenerate batch
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Report library */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-5">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign/8 text-sovereign">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Report library
                </h3>
                <p className="text-xs text-ink-muted">Last refreshed continuously</p>
              </div>
            </div>
            <Badge variant="info">Live</Badge>
          </header>
          <ul className="divide-y divide-hairline">
            {reports.map((r) => (
              <li
                key={r.id}
                className="flex items-start gap-3 px-5 py-3 transition-colors hover:bg-canvas-subtle/60"
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-hairline bg-canvas text-ink-subtle">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-ink">{r.client}</p>
                  <p className="truncate text-[11px] text-ink-subtle">
                    {r.type} · {r.period} · {r.pages} pages
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant={statusTone[r.status]} className="px-1.5">
                    {r.status}
                  </Badge>
                  <p className="mt-1 text-[10px] text-ink-subtle">{r.updatedHrs}h ago</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Sample narrative + variance */}
        <section className="flex flex-col gap-4 xl:col-span-7">
          {/* Narrative */}
          <div className="rounded-lg border border-hairline bg-card shadow-card-sm">
            <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald/12 text-emerald-deep">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                    {sampleNarrative.client} — Monthly P&amp;L
                  </h3>
                  <p className="text-xs text-ink-muted">{sampleNarrative.period}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="gap-1.5">
                <Download className="h-3.5 w-3.5" />
                PDF
              </Button>
            </header>

            <div className="space-y-4 px-5 py-4">
              <div className="rounded-md border border-emerald/20 bg-emerald/8 p-3 text-[12px] text-emerald-deep">
                <span className="font-medium">AI-written commentary ·</span> reviewed and approved by Fazal Mumtaz · 2 hours ago.
              </div>

              {sampleNarrative.paragraphs.map((p, i) => (
                <p key={i} className="text-[14px] leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Variance explanation */}
          <div className="rounded-lg border border-hairline bg-card shadow-card-sm">
            <header className="border-b border-hairline px-5 py-4">
              <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                Variance explanation
              </h3>
              <p className="text-xs text-ink-muted">Why each line moved versus prior month</p>
            </header>
            <ul className="divide-y divide-hairline">
              {sampleVariance.map((v) => (
                <li
                  key={v.metric}
                  className="grid grid-cols-12 gap-3 px-5 py-3 transition-colors hover:bg-canvas-subtle/60"
                >
                  <div className="col-span-3">
                    <p className="text-[13px] font-medium text-ink">{v.metric}</p>
                    <p className="text-[11px] text-ink-subtle tabular">
                      {v.prior} → {v.current}
                    </p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className={cn('text-[14px] font-semibold tabular', varianceTone[v.tone])}>
                      {formatPercent(v.deltaPct, { signed: true })}
                    </p>
                  </div>
                  <div className="col-span-7 self-center">
                    <p className="text-[12.5px] text-ink-muted">
                      <span className="font-medium text-ink">Driver ·</span> {v.driver}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
