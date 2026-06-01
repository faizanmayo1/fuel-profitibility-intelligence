import { CalendarClock, Mail, Phone, Send, Users } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { todayActions, type TodayAction } from '@/data/dashboard'
import { cn } from '@/utils/cn'

const channelMeta: Record<
  TodayAction['channel'],
  { Icon: typeof Phone; tone: string }
> = {
  Call: { Icon: Phone, tone: 'text-signal-risk bg-signal-risk-soft' },
  Email: { Icon: Mail, tone: 'text-signal-info bg-signal-info-soft' },
  Meeting: { Icon: Users, tone: 'text-sovereign bg-sovereign/8' },
  'Send pack': { Icon: Send, tone: 'text-emerald-deep bg-signal-positive-soft' },
}

const impactVariant = {
  High: 'risk',
  Medium: 'warning',
  Low: 'neutral',
} as const

export function TodayActions() {
  return (
    <section className="rounded-lg border border-hairline bg-card shadow-card-sm">
      <header className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald/12 text-emerald-deep">
            <CalendarClock className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
              Today&apos;s advisory actions
            </h3>
            <p className="text-xs text-ink-muted">Generated for John · 5 items</p>
          </div>
        </div>
        <Badge variant="positive" className="self-center">
          AI ranked
        </Badge>
      </header>

      <ul className="divide-y divide-hairline">
        {todayActions.map((action) => {
          const meta = channelMeta[action.channel]
          return (
            <li
              key={action.id}
              className="flex items-start gap-3 px-5 py-3 transition-colors hover:bg-canvas-subtle/60"
            >
              <div className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-md', meta.tone)}>
                <meta.Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium text-ink">{action.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-ink-subtle">
                  <span className="font-medium text-ink-muted">{action.client}</span>
                  <span>·</span>
                  <span>{action.due}</span>
                </div>
              </div>
              <Badge variant={impactVariant[action.impact]} className="self-center px-1.5">
                {action.impact}
              </Badge>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
