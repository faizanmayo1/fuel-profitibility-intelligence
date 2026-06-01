import {
  Activity,
  Banknote,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  MailPlus,
  Plug,
  Receipt,
  Sparkles,
  TrendingDown,
  Users,
} from 'lucide-react'

import { ROUTES, type RoutePath } from './paths'

export type RouteSection =
  | 'Workspace'
  | 'Client Intelligence'
  | 'Advisory Engine'
  | 'Firm'

export interface RouteEntry {
  path: RoutePath
  label: string
  eyebrow: string
  description: string
  icon: LucideIcon
  section: RouteSection
  badge?: { text: string; variant?: 'info' | 'positive' | 'warning' | 'risk' | 'secondary' | 'sovereign' }
  end?: boolean
}

export const routeRegistry: RouteEntry[] = [
  // ── Workspace ────────────────────────────────────────────
  {
    path: ROUTES.root,
    label: 'Advisor Dashboard',
    eyebrow: 'Workspace',
    description: 'Cross-portfolio command center — alerts, priority queue, today\'s actions.',
    icon: LayoutDashboard,
    section: 'Workspace',
    end: true,
  },
  {
    path: ROUTES.clients,
    label: 'Client Portfolio',
    eyebrow: 'Workspace',
    description: 'All clients with live health scores, segments, and last-touch tracking.',
    icon: Users,
    section: 'Workspace',
    badge: { text: '142', variant: 'secondary' },
  },

  // ── Client Intelligence ──────────────────────────────────
  {
    path: ROUTES.profitability,
    label: 'Profitability Leaks',
    eyebrow: 'Intelligence',
    description: 'AI-detected margin compression, unprofitable service lines, and cost inflation.',
    icon: TrendingDown,
    section: 'Client Intelligence',
    badge: { text: '8', variant: 'warning' },
  },
  {
    path: ROUTES.cashflow,
    label: 'Cash-flow Risk',
    eyebrow: 'Intelligence',
    description: 'Predictive runway, AR aging, payroll vs cash stress windows (30/60/90).',
    icon: Activity,
    section: 'Client Intelligence',
    badge: { text: '3', variant: 'risk' },
  },
  {
    path: ROUTES.payroll,
    label: 'Payroll & Expense',
    eyebrow: 'Intelligence',
    description: 'Labor cost vs revenue, overtime drift, vendor and subscription leakage.',
    icon: Banknote,
    section: 'Client Intelligence',
  },
  {
    path: ROUTES.tax,
    label: 'Tax & GST Risk',
    eyebrow: 'Intelligence',
    description: 'GST liability forecast, exposure estimation, missed deductions, BAS readiness.',
    icon: Receipt,
    section: 'Client Intelligence',
  },

  // ── Advisory Engine ──────────────────────────────────────
  {
    path: ROUTES.advisory,
    label: 'Advisory Recommendations',
    eyebrow: 'Advisory',
    description: 'Profit First allocation, Next Best Action queue, opportunity scoring.',
    icon: Sparkles,
    section: 'Advisory Engine',
    badge: { text: 'AI', variant: 'info' },
  },
  {
    path: ROUTES.reports,
    label: 'Auto Reporting',
    eyebrow: 'Advisory',
    description: 'Continuous P&L narratives, GST/BAS reports, board packs in plain English.',
    icon: FileText,
    section: 'Advisory Engine',
  },
  {
    path: ROUTES.comms,
    label: 'Client Comms',
    eyebrow: 'Advisory',
    description: 'AI-drafted client emails, monthly advisory summaries, alert notifications.',
    icon: MailPlus,
    section: 'Advisory Engine',
  },

  // ── Firm ─────────────────────────────────────────────────
  {
    path: ROUTES.firm,
    label: 'Firm Operations',
    eyebrow: 'Firm',
    description: 'Workload across advisors, SLA tracking, segmentation, performance.',
    icon: Building2,
    section: 'Firm',
  },
  {
    path: ROUTES.integrations,
    label: 'Integrations',
    eyebrow: 'Platform',
    description: 'Connected data sources, sync engine health, event stream, audit log.',
    icon: Plug,
    section: 'Firm',
    badge: { text: 'Live', variant: 'positive' },
  },
]

export const sectionOrder: RouteSection[] = [
  'Workspace',
  'Client Intelligence',
  'Advisory Engine',
  'Firm',
]

export function findRouteByPath(pathname: string): RouteEntry | undefined {
  return routeRegistry.find((entry) => entry.path === pathname)
}

export function groupRoutesBySection(): Array<{ section: RouteSection; entries: RouteEntry[] }> {
  return sectionOrder.map((section) => ({
    section,
    entries: routeRegistry.filter((entry) => entry.section === section),
  }))
}
