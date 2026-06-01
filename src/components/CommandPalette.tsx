import { ArrowRight, Building2, Command, Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { clients } from '@/data/clients'
import { routeRegistry } from '@/routes/registry'
import { cn } from '@/utils/cn'

type PaletteItem =
  | { kind: 'route'; key: string; label: string; sub: string; path: string; Icon: typeof Building2 }
  | { kind: 'client'; key: string; label: string; sub: string; path: string }

interface Props {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const items = useMemo<PaletteItem[]>(() => {
    const routeItems: PaletteItem[] = routeRegistry.map((r) => ({
      kind: 'route',
      key: `r-${r.path}`,
      label: r.label,
      sub: `${r.eyebrow} · ${r.description}`,
      path: r.path,
      Icon: r.icon,
    }))
    const clientItems: PaletteItem[] = clients.map((c) => ({
      kind: 'client',
      key: `c-${c.id}`,
      label: c.name,
      sub: `${c.industry} · ${c.health}`,
      path: `/client/${c.id}`,
    }))
    return [...routeItems, ...clientItems]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items.slice(0, 10)
    return items
      .filter((i) => `${i.label} ${i.sub}`.toLowerCase().includes(q))
      .slice(0, 12)
  }, [items, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIdx(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const close = useCallback(() => {
    onClose()
  }, [onClose])

  const select = useCallback(
    (item: PaletteItem) => {
      navigate(item.path)
      close()
    },
    [navigate, close],
  )

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const it = filtered[activeIdx]
        if (it) select(it)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, activeIdx, close, select])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      onClick={close}
      role="dialog"
      aria-modal
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" aria-hidden />

      <div
        className="relative w-full max-w-[560px] overflow-hidden rounded-lg border border-hairline bg-card shadow-card-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
          <Search className="h-4 w-4 text-ink-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIdx(0)
            }}
            placeholder="Jump to a screen or client…"
            className="w-full border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd className="inline-flex items-center gap-0.5 rounded border border-hairline bg-canvas-subtle px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle">
            ESC
          </kbd>
        </div>

        {/* Items */}
        {filtered.length === 0 ? (
          <div className="px-4 py-6 text-center text-[13px] text-ink-muted">
            No matches for &ldquo;{query}&rdquo;
          </div>
        ) : (
          <ul className="max-h-[60vh] overflow-y-auto py-2">
            {filtered.map((item, idx) => {
              const active = idx === activeIdx
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => select(item)}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors',
                      active ? 'bg-sovereign/8' : 'hover:bg-canvas-subtle/60',
                    )}
                  >
                    <div
                      className={cn(
                        'grid h-8 w-8 shrink-0 place-items-center rounded-md',
                        item.kind === 'route'
                          ? active
                            ? 'bg-sovereign text-canvas'
                            : 'bg-canvas-subtle text-ink-muted'
                          : 'bg-emerald/10 text-emerald-deep',
                      )}
                    >
                      {item.kind === 'route' ? <item.Icon className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-medium text-ink">{item.label}</p>
                      <p className="truncate text-[11px] text-ink-subtle">{item.sub}</p>
                    </div>
                    <ArrowRight className={cn('h-3.5 w-3.5 transition', active ? 'text-sovereign' : 'text-ink-faint')} />
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-hairline bg-canvas-subtle/60 px-4 py-2 text-[10.5px] text-ink-subtle">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-hairline bg-card px-1 font-mono">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-hairline bg-card px-1 font-mono">↵</kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-hairline bg-card px-1 font-mono">ESC</kbd>
              Close
            </span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Command className="h-3 w-3" />
            <span>Fuel command bar</span>
          </span>
        </div>
      </div>
    </div>
  )
}
