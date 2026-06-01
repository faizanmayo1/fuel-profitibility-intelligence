import { ArrowRight, CheckCircle2, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { advisors } from '@/data/firm'
import { cn } from '@/utils/cn'

type Suggestion = {
  id: string
  client: string
  industry: string
  signal: 'Cash stress' | 'Margin' | 'Payroll' | 'Tax'
  exposure: string
  advisorId: string
  reason: string
}

const initialSuggestions: Suggestion[] = [
  {
    id: 'redhill',
    client: 'Redhill Constructions',
    industry: 'Construction',
    signal: 'Cash stress',
    exposure: '$84k · 21d',
    advisorId: 'john',
    reason: 'Existing client owner · construction expertise · 18d since last touch',
  },
  {
    id: 'mintwell',
    client: 'Mintwell Retail Co.',
    industry: 'Retail',
    signal: 'Cash stress',
    exposure: '$92k · 19d',
    advisorId: 'leila',
    reason: 'Lowest current load · retail + AR experience · capacity 78%',
  },
  {
    id: 'lumenpath',
    client: 'LumenPath Studios',
    industry: 'Prof. Services',
    signal: 'Margin',
    exposure: '−12 pp · $68k qtr',
    advisorId: 'priya',
    reason: 'Existing client owner · margin specialist · 32d since last touch',
  },
  {
    id: 'arcfield',
    client: 'Arcfield Engineering',
    industry: 'Prof. Services',
    signal: 'Payroll',
    exposure: '+22% YoY · $132k',
    advisorId: 'adam',
    reason: '95% SLA · payroll restructure experience · 14 open actions',
  },
  {
    id: 'northbay',
    client: 'Northbay Café Group',
    industry: 'Hospitality',
    signal: 'Tax',
    exposure: '$27k · 57d to BAS',
    advisorId: 'priya',
    reason: 'Existing client owner · BAS specialist · matched prior turnaround',
  },
]

const signalTone = {
  'Cash stress': 'risk',
  Margin: 'warning',
  Payroll: 'warning',
  Tax: 'info',
} as const

interface Props {
  open: boolean
  onClose: () => void
}

export function AutoAssignModal({ open, onClose }: Props) {
  const [stage, setStage] = useState<'review' | 'done'>('review')
  const [picks, setPicks] = useState<Suggestion[]>(initialSuggestions)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Reset when re-opened
  useEffect(() => {
    if (open) {
      setStage('review')
      setPicks(initialSuggestions)
      setOpenDropdown(null)
    }
  }, [open])

  // Esc to close
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const newLoadByAdvisor = useMemo(() => {
    const counts: Record<string, number> = {}
    picks.forEach((p) => {
      counts[p.advisorId] = (counts[p.advisorId] ?? 0) + 1
    })
    return counts
  }, [picks])

  if (!open) return null

  const advisorById = (id: string) => advisors.find((a) => a.id === id)!

  const reassign = (clientId: string, advisorId: string) => {
    setPicks((curr) =>
      curr.map((p) => (p.id === clientId ? { ...p, advisorId } : p)),
    )
    setOpenDropdown(null)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
      role="dialog"
      aria-modal
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" aria-hidden />

      <div
        className="relative w-full max-w-[680px] overflow-hidden rounded-lg border border-hairline bg-card shadow-card-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-3 border-b border-hairline px-5 py-4">
          <div className="flex items-start gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign text-canvas">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                {stage === 'review' ? 'Auto-assign client actions' : 'Actions assigned'}
              </h3>
              <p className="text-xs text-ink-muted">
                {stage === 'review'
                  ? '5 high-risk clients · matched by expertise, workload, and SLA risk'
                  : '5 advisory actions queued in the team workspace'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-ink-subtle hover:bg-canvas-subtle hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {stage === 'review' ? (
          <>
            <ul className="max-h-[44vh] divide-y divide-hairline overflow-y-auto">
              {picks.map((p) => {
                const advisor = advisorById(p.advisorId)
                const dropdownId = `dd-${p.id}`
                return (
                  <li key={p.id} className="px-5 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[13.5px] font-medium text-ink">{p.client}</p>
                          <Badge variant={signalTone[p.signal]} className="px-1.5">
                            {p.signal}
                          </Badge>
                          <span className="text-[11px] text-ink-subtle tabular">{p.exposure}</span>
                        </div>
                        <p className="mt-1 text-[11.5px] text-ink-muted">{p.industry}</p>
                      </div>

                      {/* Advisor picker */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdown((curr) => (curr === dropdownId ? null : dropdownId))
                          }
                          className="flex items-center gap-2 rounded-md border border-sovereign/30 bg-sovereign/8 px-2.5 py-1.5 text-[12px] font-medium text-sovereign hover:bg-sovereign/12"
                        >
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-sovereign text-[9px] font-semibold text-canvas tabular">
                            {advisor.initials}
                          </span>
                          {advisor.name.split(' ')[0]} {advisor.initials[1]}.
                          <ArrowRight
                            className={cn(
                              'h-3 w-3 transition-transform',
                              openDropdown === dropdownId ? 'rotate-90' : '',
                            )}
                          />
                        </button>

                        {openDropdown === dropdownId && (
                          <div className="absolute right-0 top-full z-10 mt-1 w-56 overflow-hidden rounded-md border border-hairline bg-card shadow-card-lg">
                            <ul className="py-1">
                              {advisors.map((a) => (
                                <li key={a.id}>
                                  <button
                                    type="button"
                                    onClick={() => reassign(p.id, a.id)}
                                    className={cn(
                                      'flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12.5px] transition-colors hover:bg-canvas-subtle',
                                      a.id === p.advisorId ? 'font-medium text-sovereign' : 'text-ink',
                                    )}
                                  >
                                    <span className="grid h-5 w-5 place-items-center rounded-full bg-sovereign text-[9px] font-semibold text-canvas">
                                      {a.initials}
                                    </span>
                                    <span className="flex-1">{a.name}</span>
                                    <span className="text-[10px] text-ink-subtle">
                                      {a.openActions} open
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="mt-2 inline-flex items-start gap-1.5 rounded-md bg-canvas-subtle/70 px-2 py-1 text-[11.5px] text-ink-muted">
                      <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-emerald-deep" />
                      <span>{p.reason}</span>
                    </p>
                  </li>
                )
              })}
            </ul>

            {/* Workload preview */}
            <div className="border-t border-hairline bg-canvas-subtle/40 px-5 py-4">
              <p className="eyebrow">Workload after assignment</p>
              <ul className="mt-2 space-y-2">
                {advisors.map((a) => {
                  const added = newLoadByAdvisor[a.id] ?? 0
                  const total = a.openActions + added
                  const pct = Math.min((total / 30) * 100, 100)
                  return (
                    <li key={a.id} className="grid grid-cols-12 items-center gap-3 text-[11.5px]">
                      <div className="col-span-3 flex items-center gap-1.5">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-sovereign text-[9px] font-semibold text-canvas tabular">
                          {a.initials}
                        </span>
                        <span className="text-ink">{a.name.split(' ')[0]}</span>
                      </div>
                      <div className="col-span-7">
                        <div className="h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              total >= 24 ? 'bg-signal-warning' : 'bg-sovereign',
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <div className="col-span-2 text-right tabular">
                        <span className="font-semibold text-ink">{total}</span>
                        {added > 0 && (
                          <span className="ml-1 text-emerald-deep">+{added}</span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <footer className="flex items-center justify-end gap-2 border-t border-hairline px-5 py-3">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button size="sm" className="gap-1.5" onClick={() => setStage('done')}>
                <Sparkles className="h-3.5 w-3.5" />
                Assign {picks.length} actions
              </Button>
            </footer>
          </>
        ) : (
          <div className="px-5 py-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald/12 text-emerald-deep">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="mt-4 text-[15px] font-semibold text-ink">
              5 actions assigned across 4 advisors
            </p>
            <p className="mx-auto mt-1 max-w-sm text-[13px] text-ink-muted">
              Notifications sent to each advisor with the client context, suggested next step, and
              SLA window. Advisors can accept or reassign from their inbox.
            </p>
            <ul className="mx-auto mt-4 max-w-xs space-y-1.5 text-left text-[12.5px]">
              {Object.entries(newLoadByAdvisor).map(([id, n]) => {
                const a = advisorById(id)
                return (
                  <li key={id} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-sovereign text-[9px] font-semibold text-canvas tabular">
                        {a.initials}
                      </span>
                      <span className="text-ink">{a.name}</span>
                    </span>
                    <span className="tabular text-emerald-deep">+{n} action{n > 1 ? 's' : ''}</span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-5 flex justify-center gap-2">
              <Button size="sm" onClick={onClose}>
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
