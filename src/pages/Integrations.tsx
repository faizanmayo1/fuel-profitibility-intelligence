import {
  Activity,
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronDown,
  Database,
  Filter,
  Plug,
  Receipt,
  ShieldCheck,
  Sparkles,
  Users2,
  Wand2,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  auditLog,
  platforms,
  streamEvents,
  syncMetrics,
  tenantInfo,
  throughput,
  type AuditEntry,
  type Platform,
  type PlatformCategory,
  type StreamEvent,
} from '@/data/integrations'
import { cn } from '@/utils/cn'

const statusTone: Record<Platform['status'], { dot: string; pill: 'positive' | 'warning' | 'risk' }> = {
  Healthy: { dot: 'bg-emerald', pill: 'positive' },
  Degraded: { dot: 'bg-signal-warning', pill: 'warning' },
  Down: { dot: 'bg-signal-risk', pill: 'risk' },
}

const categoryMeta: Record<
  PlatformCategory,
  { Icon: typeof Database; tone: string; label: string }
> = {
  Accounting: { Icon: Database, tone: 'text-sovereign bg-sovereign/8', label: 'Accounting' },
  'Bank feed': { Icon: Banknote, tone: 'text-emerald-deep bg-signal-positive-soft', label: 'Bank feed' },
  Payroll: { Icon: Users2, tone: 'text-signal-info bg-signal-info-soft', label: 'Payroll' },
  'Tax & compliance': { Icon: Receipt, tone: 'text-signal-warning bg-signal-warning-soft', label: 'Tax' },
  Expense: { Icon: Wand2, tone: 'text-ink-muted bg-canvas-subtle', label: 'Expense' },
}

const sourceTone: Record<
  StreamEvent['source'],
  { tone: string; label: string }
> = {
  Xero: { tone: 'bg-[#13B5EA]/12 text-[#0894C8]', label: 'Xero' },
  Bank: { tone: 'bg-sovereign/10 text-sovereign', label: 'Bank' },
  NetPayroll: { tone: 'bg-signal-warning-soft text-signal-warning', label: 'NetPayroll' },
  KeyPay: { tone: 'bg-[#FF6900]/12 text-[#C5500A]', label: 'KeyPay' },
  ATO: { tone: 'bg-emerald/12 text-emerald-deep', label: 'ATO' },
  Dext: { tone: 'bg-[#00B6BD]/12 text-[#007F84]', label: 'Dext' },
  MYOB: { tone: 'bg-[#6610F2]/12 text-[#4F0DBF]', label: 'MYOB' },
}

const auditTone: Record<AuditEntry['tone'], string> = {
  info: 'text-signal-info',
  warning: 'text-signal-warning',
  neutral: 'text-ink-muted',
}

function ago(sec: number) {
  if (sec < 60) return `${sec}s ago`
  const m = Math.floor(sec / 60)
  if (m < 60) return `${m}m ago`
  return `${Math.floor(m / 60)}h ago`
}

export function Integrations() {
  const totalConnections = platforms.reduce((acc, p) => acc + p.clientsConnected, 0)

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="eyebrow">Platform · Integrations</span>
          <h2 className="text-[26px] font-semibold leading-tight tracking-tight-bank text-ink">
            Connected platforms &amp; data architecture
          </h2>
          <p className="max-w-2xl text-sm text-ink-muted">
            {platforms.length} platforms · {totalConnections.toLocaleString('en-AU')} active connections ·{' '}
            <span className="font-medium text-ink">{syncMetrics.eventsToday.toLocaleString('en-AU')}</span> events today ·{' '}
            <span className="font-medium text-emerald-deep">{syncMetrics.uptime30d}%</span> uptime (30d)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Category
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plug className="h-3.5 w-3.5" />
            Connect new
          </Button>
        </div>
      </header>

      {/* Sync engine metric strip */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Events today" value={syncMetrics.eventsToday.toLocaleString('en-AU')} sub="across all sources" tone="ink" />
        <Stat label="30-day uptime" value={`${syncMetrics.uptime30d}%`} sub="vs 99.5% SLA" tone="positive" />
        <Stat label="p95 latency" value={`${(syncMetrics.p95LatencyMs / 1000).toFixed(2)}s`} sub="event → recalc" tone="ink" />
        <Stat label="Error rate" value={`${syncMetrics.errorRate}%`} sub="last 24h" tone="positive" />
      </section>

      {/* Connected platforms */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="eyebrow">Connected sources</p>
            <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">
              {platforms.length} platforms · synced continuously
            </h3>
          </div>
          <span className="text-xs text-ink-subtle">No manual import cycles</span>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {platforms.map((p) => {
            const meta = categoryMeta[p.category]
            const stat = statusTone[p.status]
            return (
              <li
                key={p.id}
                className="flex flex-col gap-2 rounded-lg border border-hairline bg-card p-4 shadow-card-sm transition-colors hover:border-sovereign/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-canvas text-[11px] font-semibold"
                      style={{ backgroundColor: p.brandColor }}
                    >
                      {p.initial}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-ink">{p.name}</p>
                      <p className="truncate text-[10.5px] text-ink-subtle">{meta.label}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                      stat.pill === 'positive'
                        ? 'bg-signal-positive-soft text-emerald-deep'
                        : stat.pill === 'warning'
                        ? 'bg-signal-warning-soft text-signal-warning'
                        : 'bg-signal-risk-soft text-signal-risk',
                    )}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full', stat.dot)} />
                    {p.status}
                  </span>
                </div>

                <div className="mt-1 grid grid-cols-3 gap-2 border-t border-hairline pt-3 text-[10.5px]">
                  <div>
                    <p className="text-ink-subtle uppercase tracking-wide-eyebrow">Clients</p>
                    <p className="mt-0.5 text-[13px] font-semibold text-ink tabular">{p.clientsConnected}</p>
                  </div>
                  <div>
                    <p className="text-ink-subtle uppercase tracking-wide-eyebrow">Events</p>
                    <p className="mt-0.5 text-[13px] font-semibold text-ink tabular">
                      {p.eventsToday.toLocaleString('en-AU')}
                    </p>
                  </div>
                  <div>
                    <p className="text-ink-subtle uppercase tracking-wide-eyebrow">Sync</p>
                    <p className="mt-0.5 text-[13px] font-semibold text-ink tabular">{p.lastSyncMin}m</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Stream + throughput */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Live event stream with cause-effect */}
        <section className="rounded-lg border border-hairline bg-card shadow-card-sm xl:col-span-7">
          <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign text-canvas">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                  Live event stream · cause &amp; effect
                </h3>
                <p className="text-xs text-ink-muted">
                  Every inbound event triggers a downstream recalculation
                </p>
              </div>
            </div>
            <Badge variant="positive" className="gap-1">
              <span className="relative inline-flex">
                <span className="absolute -left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald" />
                <span className="absolute -left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 animate-pulse-soft rounded-full bg-emerald opacity-70" />
                <span className="pl-1">Streaming</span>
              </span>
            </Badge>
          </header>

          <ul className="divide-y divide-hairline">
            {streamEvents.map((e) => {
              const tone = sourceTone[e.source]
              return (
                <li key={e.id} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-medium',
                        tone.tone,
                      )}
                    >
                      {tone.label}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] text-ink">{e.message}</p>
                      <div className="mt-1.5 flex items-start gap-1.5 text-[12px] text-emerald-deep">
                        <ArrowRight className="mt-0.5 h-3 w-3 shrink-0" />
                        <span className="flex-1">{e.effect}</span>
                      </div>
                      <p className="mt-1 text-[10.5px] text-ink-subtle">
                        {e.client} · {ago(e.agoSec)}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Throughput chart + tenant info */}
        <section className="flex flex-col gap-4 xl:col-span-5">
          <div className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="eyebrow">Last 24h throughput</p>
                <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">
                  Event volume
                </h3>
              </div>
              <p className="text-[22px] font-semibold tabular text-ink leading-none">
                {syncMetrics.eventsToday.toLocaleString('en-AU')}
              </p>
            </div>

            <div className="mt-3 h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={throughput} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="throughputFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0E2C4A" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="#0E2C4A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#E4E9EF" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fill: '#8A93A2', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8A93A2', fontSize: 10 }} axisLine={false} tickLine={false} width={32} />
                  <Tooltip
                    contentStyle={{
                      fontSize: 11,
                      borderRadius: 8,
                      border: '1px solid #E4E9EF',
                      boxShadow: '0 4px 12px rgba(11,18,32,0.06)',
                    }}
                  />
                  <Area type="monotone" dataKey="events" stroke="#0E2C4A" strokeWidth={2} fill="url(#throughputFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 border-t border-hairline pt-3 text-[11px]">
              <div>
                <p className="text-ink-subtle uppercase tracking-wide-eyebrow">Webhooks</p>
                <p className="mt-0.5 text-[13px] font-semibold text-ink tabular">
                  {syncMetrics.activeWebhooks.toLocaleString('en-AU')}
                </p>
              </div>
              <div>
                <p className="text-ink-subtle uppercase tracking-wide-eyebrow">Schema maps</p>
                <p className="mt-0.5 text-[13px] font-semibold text-ink tabular">
                  {syncMetrics.schemaMappings.toLocaleString('en-AU')}
                </p>
              </div>
              <div>
                <p className="text-ink-subtle uppercase tracking-wide-eyebrow">p95</p>
                <p className="mt-0.5 text-[13px] font-semibold text-ink tabular">
                  {syncMetrics.p95LatencyMs}ms
                </p>
              </div>
            </div>
          </div>

          {/* Tenant + compliance */}
          <div className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald/12 text-emerald-deep">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="eyebrow">Tenant · {tenantInfo.region}</p>
                <h3 className="mt-0.5 text-[14px] font-semibold tracking-tight-bank text-ink">
                  {tenantInfo.tenant}
                </h3>
              </div>
            </div>
            <ul className="mt-3 space-y-2 text-[12px]">
              <li className="flex items-start gap-2">
                <Zap className="mt-0.5 h-3 w-3 shrink-0 text-ink-subtle" />
                <span className="text-ink-muted">
                  <span className="font-medium text-ink">Data residency · </span>
                  {tenantInfo.residency}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="mt-0.5 h-3 w-3 shrink-0 text-ink-subtle" />
                <span className="text-ink-muted">
                  <span className="font-medium text-ink">Encryption · </span>
                  {tenantInfo.encryption}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="mt-0.5 h-3 w-3 shrink-0 text-ink-subtle" />
                <span className="text-ink-muted">
                  <span className="font-medium text-ink">Tenant isolation · </span>
                  {tenantInfo.isolation}
                </span>
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tenantInfo.certifications.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 rounded border border-emerald/30 bg-emerald/8 px-1.5 py-0.5 text-[10.5px] font-medium text-emerald-deep"
                >
                  <CheckCircle2 className="h-2.5 w-2.5" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Audit log */}
      <section className="rounded-lg border border-hairline bg-card shadow-card-sm">
        <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-sovereign/8 text-sovereign">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight-bank text-ink">
                Audit log
              </h3>
              <p className="text-xs text-ink-muted">
                Every config, key rotation, and system action — immutable
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="gap-1.5">
            Export CSV
          </Button>
        </header>
        <ul className="divide-y divide-hairline">
          {auditLog.map((entry) => (
            <li key={entry.id} className="grid grid-cols-12 gap-3 px-5 py-3 transition-colors hover:bg-canvas-subtle/60">
              <div className="col-span-3 text-[12.5px] text-ink-muted">{entry.actor}</div>
              <div className="col-span-3">
                <p className={cn('text-[13px] font-medium', auditTone[entry.tone])}>{entry.action}</p>
              </div>
              <div className="col-span-4 text-[12.5px] text-ink-muted">{entry.detail}</div>
              <div className="col-span-2 text-right text-[11px] text-ink-subtle tabular">{entry.agoLabel}</div>
            </li>
          ))}
        </ul>
      </section>
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
