/** Advisor Intelligence Dashboard — mock data for Fuel Accountants demo. */

export const dashboardMeta = {
  tenant: 'Fuel Accountants · Sydney',
  asOf: '1 Jun 2026',
  syncedMinutesAgo: 3,
  advisorName: 'Fazal',
  totalClients: 142,
}

export type HealthBand = 'Strong' | 'Stable' | 'At Risk' | 'Critical'

export type KPI = {
  id: string
  label: string
  value: string
  delta: string
  deltaTone: 'positive' | 'warning' | 'risk' | 'neutral'
  context: string
}

export const kpis: KPI[] = [
  {
    id: 'attention',
    label: 'Clients needing attention',
    value: '11',
    delta: '+4 since Friday',
    deltaTone: 'warning',
    context: 'Cash, margin, or tax flag in last 7 days',
  },
  {
    id: 'cash-risk',
    label: 'Cash-flow risk (30-day)',
    value: '3',
    delta: 'Critical',
    deltaTone: 'risk',
    context: 'Predicted shortfall within 30 days',
  },
  {
    id: 'margin-drop',
    label: 'Margin compression alerts',
    value: '8',
    delta: 'Avg −5.4 pp',
    deltaTone: 'warning',
    context: 'Gross margin down >3 pp MoM',
  },
  {
    id: 'portfolio-health',
    label: 'Portfolio health index',
    value: '74',
    delta: '−2 vs last week',
    deltaTone: 'warning',
    context: '0–100 composite · weighted by ARR',
  },
]

export type UrgentClient = {
  id: string
  name: string
  industry: 'Construction' | 'Retail' | 'Prof. Services' | 'SaaS' | 'Hospitality'
  health: HealthBand
  healthScore: number
  scoreDelta: number
  reason: string
  signal: 'cash' | 'margin' | 'tax' | 'payroll'
  amount: string
  windowDays: number
  lastTouchDays: number
  arr: string
}

export const urgentClients: UrgentClient[] = [
  {
    id: 'redhill',
    name: 'Redhill Constructions',
    industry: 'Construction',
    health: 'Critical',
    healthScore: 38,
    scoreDelta: -14,
    reason: 'Predicted cash shortfall of $84k in 21 days — payroll run $61k due 22 Jun, AR $112k overdue >45d',
    signal: 'cash',
    amount: '−$84k',
    windowDays: 21,
    lastTouchDays: 18,
    arr: '$2.4M',
  },
  {
    id: 'lumenpath',
    name: 'LumenPath Studios',
    industry: 'Prof. Services',
    health: 'At Risk',
    healthScore: 54,
    scoreDelta: -9,
    reason: 'Gross margin compressed 12 pp on retainer book — subcontractor rates up 18%, retail tier underpriced',
    signal: 'margin',
    amount: '−12 pp',
    windowDays: 0,
    lastTouchDays: 32,
    arr: '$890k',
  },
  {
    id: 'northbay',
    name: 'Northbay Café Group',
    industry: 'Hospitality',
    health: 'At Risk',
    healthScore: 58,
    scoreDelta: -6,
    reason: 'Q4 GST estimate $46k — current cash reserve $19k. Underpayment risk before 28 Jul BAS.',
    signal: 'tax',
    amount: '$46k',
    windowDays: 57,
    lastTouchDays: 24,
    arr: '$1.6M',
  },
  {
    id: 'arcfield',
    name: 'Arcfield Engineering',
    industry: 'Prof. Services',
    health: 'At Risk',
    healthScore: 61,
    scoreDelta: -5,
    reason: 'Payroll growth 22% YoY vs revenue 9% — labour ratio crossed 48% threshold',
    signal: 'payroll',
    amount: '+22%',
    windowDays: 0,
    lastTouchDays: 41,
    arr: '$3.1M',
  },
  {
    id: 'mintwell',
    name: 'Mintwell Retail Co.',
    industry: 'Retail',
    health: 'Critical',
    healthScore: 41,
    scoreDelta: -11,
    reason: 'Receivables aged >60d at $187k — 3 anchor customers delayed; runway compressed to 19 days',
    signal: 'cash',
    amount: '−$92k',
    windowDays: 19,
    lastTouchDays: 12,
    arr: '$4.8M',
  },
]

export type AIAlert = {
  id: string
  title: string
  body: string
  client: string
  category: 'Margin leak' | 'Cash stress' | 'Tax exposure' | 'Payroll drift' | 'Anomaly'
  impact: 'High' | 'Medium' | 'Low'
  detectedAt: string
}

export const aiAlerts: AIAlert[] = [
  {
    id: 'a1',
    title: 'Subcontractor cost inflation eroding gross margin',
    body: 'LumenPath\'s retainer book shows 18% subcontractor rate creep across 3 vendors. Reprice retainer tier B (12 clients) by +9% to recover 6.4 pp EBITDA.',
    client: 'LumenPath Studios',
    category: 'Margin leak',
    impact: 'High',
    detectedAt: '14 min ago',
  },
  {
    id: 'a2',
    title: 'Cash shortfall predicted within 21 days',
    body: 'Redhill: payroll $61k due 22 Jun, AR $112k aged >45d. Recommend invoice follow-up sequence on top 3 debtors + delay capex of $34k.',
    client: 'Redhill Constructions',
    category: 'Cash stress',
    impact: 'High',
    detectedAt: '38 min ago',
  },
  {
    id: 'a3',
    title: 'BAS underpayment risk · Q4 FY26',
    body: 'Northbay GST estimate $46k vs reserve $19k. Auto-allocate 9% of weekly takings to tax bucket from 8 Jun to close gap pre-BAS.',
    client: 'Northbay Café Group',
    category: 'Tax exposure',
    impact: 'Medium',
    detectedAt: '1 hr ago',
  },
  {
    id: 'a4',
    title: 'Unprofitable service line detected',
    body: 'Mintwell\'s "Online Fulfilment" line: −4.2% net margin trailing 90d. Either reprice +11% or wind down — recovers ~$31k/qtr.',
    client: 'Mintwell Retail Co.',
    category: 'Margin leak',
    impact: 'High',
    detectedAt: '2 hr ago',
  },
  {
    id: 'a5',
    title: 'Anomalous expense spike · vendor concentration',
    body: 'Arcfield: $14.2k single-vendor charge on 29 May — 6.4× the trailing-6m average. Worth confirming before reconciliation.',
    client: 'Arcfield Engineering',
    category: 'Anomaly',
    impact: 'Medium',
    detectedAt: '3 hr ago',
  },
  {
    id: 'a6',
    title: 'Payroll outpacing revenue growth',
    body: 'Arcfield: payroll +22% YoY vs revenue +9%. Suggest contractor mix shift — reduce 2 PT roles, retain on retainer basis. Margin uplift ~3.1 pp.',
    client: 'Arcfield Engineering',
    category: 'Payroll drift',
    impact: 'Medium',
    detectedAt: '5 hr ago',
  },
]

export type TodayAction = {
  id: string
  title: string
  client: string
  channel: 'Call' | 'Email' | 'Meeting' | 'Send pack'
  due: string
  impact: 'High' | 'Medium' | 'Low'
}

export const todayActions: TodayAction[] = [
  {
    id: 't1',
    title: 'Call Redhill CFO re: cash plan + AR escalation',
    client: 'Redhill Constructions',
    channel: 'Call',
    due: 'Before 11:00',
    impact: 'High',
  },
  {
    id: 't2',
    title: 'Send Mintwell margin leak pack (auto-drafted)',
    client: 'Mintwell Retail Co.',
    channel: 'Send pack',
    due: 'Today',
    impact: 'High',
  },
  {
    id: 't3',
    title: 'Email Northbay re: GST reserve allocation',
    client: 'Northbay Café Group',
    channel: 'Email',
    due: 'Today',
    impact: 'Medium',
  },
  {
    id: 't4',
    title: 'Quarterly advisory call · LumenPath repricing',
    client: 'LumenPath Studios',
    channel: 'Meeting',
    due: '3 Jun · 14:00',
    impact: 'High',
  },
  {
    id: 't5',
    title: 'Review payroll restructuring scenario with Arcfield',
    client: 'Arcfield Engineering',
    channel: 'Meeting',
    due: '4 Jun · 10:30',
    impact: 'Medium',
  },
]

export type HealthBucket = { band: HealthBand; count: number; arr: string }

export const healthDistribution: HealthBucket[] = [
  { band: 'Strong', count: 58, arr: '$48.2M' },
  { band: 'Stable', count: 51, arr: '$39.7M' },
  { band: 'At Risk', count: 22, arr: '$18.4M' },
  { band: 'Critical', count: 11, arr: '$9.1M' },
]

export type PortfolioTrendPoint = { month: string; health: number; alerts: number }

export const portfolioTrend: PortfolioTrendPoint[] = [
  { month: 'Dec', health: 79, alerts: 6 },
  { month: 'Jan', health: 78, alerts: 7 },
  { month: 'Feb', health: 77, alerts: 9 },
  { month: 'Mar', health: 76, alerts: 8 },
  { month: 'Apr', health: 75, alerts: 10 },
  { month: 'May', health: 74, alerts: 12 },
  { month: 'Jun', health: 74, alerts: 11 },
]

export type AdvisorySummary = {
  monthlyRecommendations: number
  acceptedRate: number
  realisedUplift: string
  hoursSaved: number
}

export const advisorySummary: AdvisorySummary = {
  monthlyRecommendations: 84,
  acceptedRate: 71,
  realisedUplift: '$612k',
  hoursSaved: 38,
}
