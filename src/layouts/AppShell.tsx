import { useCallback, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  Command,
  HelpCircle,
  Menu,
  Search,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'

import { Wordmark } from '@/components/Brand/Wordmark'
import { CommandPalette } from '@/components/CommandPalette'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { findRouteByPath, groupRoutesBySection } from '@/routes/registry'
import { cn } from '@/utils/cn'

export function AppShell() {
  const sections = groupRoutesBySection()
  const { pathname } = useLocation()
  const current = findRouteByPath(pathname)
  const clientView = pathname.startsWith('/client/')
  const topEyebrow = clientView ? 'Workspace · Client' : current?.eyebrow ?? 'Fuel'
  const topTitle = clientView
    ? 'Client workspace'
    : current?.label ?? 'Profitability Intelligence'
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  // Cmd/Ctrl + K opens palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const openPalette = useCallback(() => setPaletteOpen(true), [])

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      {/* === Sidebar (desktop) ==================================== */}
      <Sidebar sections={sections} className="hidden lg:flex" />

      {/* === Drawer (mobile/tablet) =============================== */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <Sidebar
            sections={sections}
            className="relative z-10 flex animate-fade-in"
            onClose={() => setDrawerOpen(false)}
          />
        </div>
      )}

      {/* === Main column ==========================================*/}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-hairline bg-card/85 px-4 backdrop-blur-md sm:px-6">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Mobile brand */}
          <div className="lg:hidden">
            <Wordmark size="sm" variant="mark" />
          </div>

          {/* Page title (desktop) */}
          <div className="hidden min-w-0 flex-col lg:flex">
            <p className="eyebrow truncate">{topEyebrow}</p>
            <h1 className="truncate text-[15px] font-semibold leading-tight text-ink">
              {topTitle}
            </h1>
          </div>

          {/* Search-as-palette trigger */}
          <button
            type="button"
            onClick={openPalette}
            className="ml-auto flex w-full max-w-[420px] items-center gap-2 rounded-md border border-hairline bg-canvas px-3 py-1.5 text-sm text-ink-subtle hover:border-sovereign/30 hover:bg-card"
          >
            <Search className="h-4 w-4" aria-hidden />
            <span className="flex-1 text-left truncate">Search clients, alerts, recommendations…</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-hairline bg-card px-1.5 py-0.5 font-mono text-[10px] sm:inline-flex">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>

          <Badge variant="info" className="hidden xl:inline-flex">
            <Sparkles className="mr-1 h-3 w-3" aria-hidden />
            Demo tenant · Sandbox
          </Badge>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="hidden h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink sm:grid"
              aria-label="Help"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="relative grid h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-signal-warning ring-2 ring-card" />
            </button>
            <button
              type="button"
              className="hidden h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink sm:grid"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main key={pathname} className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
          <Outlet />
        </main>
      </div>

      {/* Command palette */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}

function Sidebar({
  sections,
  className,
  onClose,
}: {
  sections: ReturnType<typeof groupRoutesBySection>
  className?: string
  onClose?: () => void
}) {
  return (
    <aside
      className={cn(
        'sticky top-0 h-screen w-[260px] shrink-0 flex-col border-r border-hairline bg-card',
        className,
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center justify-between px-5">
        <Wordmark size="md" />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-ink-subtle hover:bg-canvas-subtle hover:text-ink"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <Separator />

      {/* Workspace block */}
      <div className="px-5 pb-3 pt-4">
        <p className="eyebrow">Firm</p>
        <p className="mt-1 text-sm font-medium text-ink">Fuel Accountants</p>
        <p className="text-xs text-ink-subtle">142 clients · Sydney · Demo tenant</p>
      </div>

      {/* Sectioned nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-2">
        {sections.map(({ section, entries }) => {
          if (entries.length === 0) return null
          return (
            <div key={section} className="mt-3 first:mt-1">
              <p className="px-2 pb-1.5 pt-1 eyebrow">{section}</p>
              <ul className="space-y-0.5">
                {entries.map((entry) => (
                  <li key={entry.path}>
                    <NavLink
                      to={entry.path}
                      end={entry.end}
                      className={({ isActive }) =>
                        cn(
                          'group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors',
                          isActive
                            ? 'bg-sovereign/8 text-sovereign font-medium'
                            : 'text-ink-muted hover:bg-canvas-subtle hover:text-ink',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={cn(
                              'absolute -left-3 top-1.5 bottom-1.5 w-0.5 rounded-r-full transition-colors',
                              isActive ? 'bg-sovereign' : 'bg-transparent',
                            )}
                            aria-hidden
                          />
                          <entry.icon
                            className={cn(
                              'h-4 w-4 shrink-0',
                              isActive ? 'text-sovereign' : 'text-ink-subtle group-hover:text-ink-muted',
                            )}
                          />
                          <span className="flex-1 truncate">{entry.label}</span>
                          {entry.badge && (
                            <Badge variant={entry.badge.variant ?? 'secondary'} className="ml-1 px-1.5">
                              {entry.badge.text}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </nav>

      {/* Footer — user */}
      <div className="border-t border-hairline px-3 py-3">
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left hover:bg-canvas-subtle"
        >
          <div className="grid h-8 w-8 place-items-center rounded-full bg-sovereign text-canvas text-xs font-semibold tabular">
            JD
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">John Doe</p>
            <p className="truncate text-xs text-ink-subtle">Senior Advisor · NSW</p>
          </div>
          <ChevronDown className="h-4 w-4 text-ink-subtle" />
        </button>
      </div>
    </aside>
  )
}
