import { Inbox, MailPlus, Send, Sparkles, Wand2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { commsSummary, drafts, sampleEmail, type CommStatus, type Tone } from '@/data/comms'
import { cn } from '@/utils/cn'

const statusTone: Record<CommStatus, 'info' | 'warning' | 'positive'> = {
  Drafted: 'info',
  'Pending review': 'warning',
  Sent: 'positive',
}

const tones: Tone[] = ['Plain', 'Warm', 'Direct', 'Formal']
const activeTone: Tone = 'Warm'

export function ClientComms() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Advisory Engine · Comms</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Client communication assistant
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            AI-drafted advisory emails, alerts, and monthly summaries — tone-tuned per client, reviewed by you before sending.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Inbox className="h-3.5 w-3.5" />
            View queue
          </Button>
          <Button size="sm" className="gap-1.5">
            <MailPlus className="h-3.5 w-3.5" />
            New advisory message
          </Button>
        </div>
      </header>

      {/* Summary strip */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Drafts pending" value={String(commsSummary.draftsPending)} sub="review queue" tone="warn" />
        <Stat label="Sent · 7 days" value={String(commsSummary.sentThisWeek)} sub="advisory messages" tone="ink" />
        <Stat label="Response rate" value={`${commsSummary.responseRate}%`} sub="clients reply <48h" tone="positive" />
        <Stat label="Avg turnaround" value={commsSummary.avgTurnaround} sub="draft → send" tone="ink" />
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Draft queue */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-5">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign/8 text-sovereign">
                <Inbox className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Draft queue
                </h3>
                <p className="text-xs text-ink-muted">Triggered by alerts &amp; recommendations</p>
              </div>
            </div>
          </header>
          <ul className="divide-y divide-hairline">
            {drafts.map((d) => (
              <li
                key={d.id}
                className={cn(
                  'cursor-pointer px-5 py-3 transition-colors hover:bg-canvas-subtle/60',
                  d.id === 'c1' ? 'bg-sovereign/4 border-l-2 border-sovereign' : '',
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate text-[13.5px] font-medium text-ink">{d.client}</p>
                  <Badge variant={statusTone[d.status]} className="shrink-0 px-1.5">
                    {d.status}
                  </Badge>
                </div>
                <p className="mt-0.5 truncate text-[12.5px] text-ink-muted">{d.subject}</p>
                <p className="mt-1 truncate text-[11px] text-ink-subtle">
                  {d.recipient} · {d.tone} tone
                </p>
                <p className="mt-1 truncate text-[11px] text-ink-subtle">
                  <span className="text-ink-muted">Trigger ·</span> {d.trigger}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Email preview */}
        <section className="flex flex-col gap-4 xl:col-span-7">
          <div className="rounded-lg border border-hairline bg-card shadow-card-sm">
            <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald/12 text-emerald-deep">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                    Mintwell — May advisory message
                  </h3>
                  <p className="text-xs text-ink-muted">Drafted 8 minutes ago · pending review</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="gap-1.5">
                  <Wand2 className="h-3.5 w-3.5" />
                  Regenerate
                </Button>
                <Button size="sm" className="gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  Send
                </Button>
              </div>
            </header>

            {/* Email shell */}
            <div className="grid grid-cols-12 border-b border-hairline px-5 py-3 text-[12px]">
              <div className="col-span-2 text-ink-subtle">To</div>
              <div className="col-span-10 text-ink-muted">{sampleEmail.to}</div>
              <div className="col-span-2 mt-1 text-ink-subtle">Subject</div>
              <div className="col-span-10 mt-1 font-medium text-ink">{sampleEmail.subject}</div>
            </div>

            <pre className="whitespace-pre-wrap px-5 py-4 font-sans text-[14px] leading-relaxed text-ink">
              {sampleEmail.body}
            </pre>
          </div>

          {/* Tone selector */}
          <div className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
            <p className="eyebrow">Tone customisation</p>
            <p className="mt-1 text-[12.5px] text-ink-muted">
              Sarah prefers a warm, conversational tone — applied automatically based on past replies.
            </p>
            <div className="mt-3 inline-flex rounded-md border border-hairline bg-canvas p-0.5">
              {tones.map((t) => (
                <button
                  key={t}
                  className={cn(
                    'rounded-sm px-3 py-1.5 text-[12.5px] font-medium transition-colors',
                    t === activeTone
                      ? 'bg-card text-ink shadow-card-sm'
                      : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  sub,
  tone = 'ink',
}: {
  label: string
  value: string
  sub: string
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
      <p className={cn('mt-2 text-[22px] font-semibold tabular tracking-tight-bank', toneText)}>{value}</p>
      <p className="mt-0.5 text-[11px] text-ink-subtle">{sub}</p>
    </div>
  )
}
