import { ArrowUpRight, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import type { RouteEntry } from '@/routes/registry'

interface PagePlaceholderProps {
  entry: RouteEntry
}

export function PagePlaceholder({ entry }: PagePlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-[1080px] animate-fade-in">
      <div className="space-y-2 pb-6">
        <span className="eyebrow">{entry.eyebrow}</span>
        <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
          {entry.label}
        </h2>
        <p className="max-w-2xl text-sm text-ink-muted">{entry.description}</p>
      </div>

      <div className="rounded-lg border border-dashed border-hairline-strong bg-card p-10 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-sovereign/8 text-sovereign">
          <Sparkles className="h-5 w-5" />
        </div>
        <p className="mt-4 text-base font-medium text-ink">Coming up next in this demo</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink-muted">
          This screen is wired into the navigation. We&apos;ll layer in the live workspace, AI
          signals, and drill-downs in the next pass.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Badge variant="info">
            <ArrowUpRight className="h-3 w-3" />
            Planned
          </Badge>
          <Badge variant="secondary">{entry.eyebrow} module</Badge>
        </div>
      </div>
    </div>
  )
}
