/** Full client workspace mock — Redhill Constructions (Critical health) */

export type LedgerCard = {
  id: string
  label: string
  value: string
  delta: string
  deltaTone: 'positive' | 'warning' | 'risk' | 'neutral'
  context: string
}

export const redhill = {
  id: 'redhill',
  name: 'Redhill Constructions',
  abn: '42 184 920 731',
  industry: 'Commercial Construction',
  region: 'Sydney · NSW',
  fyEnd: '30 June',
  ownerContact: 'Marcus Lloyd · CFO',
  fuelAdvisor: 'Fazal Mumtaz',
  arr: 2_400_000,
  health: 'Critical' as const,
  healthScore: 38,
  scoreDelta: -14,
  integrations: ['Xero', 'NetPayroll', 'Westpac Business', 'ATO BAS'],
  lastSyncMin: 4,
}

export const healthDrivers = [
  { driver: 'Cash flow stability', score: 22, deltaPp: -18, weight: 0.30 },
  { driver: 'Profitability', score: 51, deltaPp: -9, weight: 0.25 },
  { driver: 'Revenue consistency', score: 58, deltaPp: -6, weight: 0.15 },
  { driver: 'Expense efficiency', score: 44, deltaPp: -11, weight: 0.15 },
  { driver: 'Tax exposure', score: 68, deltaPp: +2, weight: 0.15 },
] as const

export const ledger: LedgerCard[] = [
  {
    id: 'revenue',
    label: 'Revenue · trailing 30d',
    value: '$208k',
    delta: '−4.1%',
    deltaTone: 'warning',
    context: 'vs 30d prior',
  },
  {
    id: 'gross-margin',
    label: 'Gross margin',
    value: '18.4%',
    delta: '−6.0 pp',
    deltaTone: 'risk',
    context: 'Subcontractor cost +18%',
  },
  {
    id: 'net-margin',
    label: 'Net margin',
    value: '4.2%',
    delta: '−4.9 pp',
    deltaTone: 'risk',
    context: 'Trailing 90d',
  },
  {
    id: 'cash',
    label: 'Cash on hand',
    value: '$42k',
    delta: '−$28k',
    deltaTone: 'risk',
    context: 'Across 3 operating accounts',
  },
  {
    id: 'ar',
    label: 'AR outstanding',
    value: '$187k',
    delta: '+$24k',
    deltaTone: 'warning',
    context: '60% aged >45d',
  },
  {
    id: 'ap',
    label: 'AP due 14 days',
    value: '$94k',
    delta: '$61k payroll',
    deltaTone: 'warning',
    context: 'Includes 22 Jun payroll batch',
  },
]

export type CashProjectionPoint = { day: number; projected: number; lower: number; upper: number }

export const cashProjection: CashProjectionPoint[] = [
  { day: 0, projected: 42, lower: 38, upper: 46 },
  { day: 3, projected: 38, lower: 32, upper: 44 },
  { day: 7, projected: 31, lower: 22, upper: 39 },
  { day: 10, projected: 22, lower: 10, upper: 32 },
  { day: 14, projected: 8, lower: -6, upper: 22 },
  { day: 18, projected: -12, lower: -28, upper: 4 },
  { day: 21, projected: -42, lower: -58, upper: -22 },
  { day: 25, projected: -28, lower: -48, upper: -4 },
  { day: 30, projected: -8, lower: -28, upper: 18 },
  { day: 35, projected: 14, lower: -8, upper: 42 },
  { day: 42, projected: 48, lower: 18, upper: 78 },
]

export type ARBucket = { range: string; amount: number; tone: 'positive' | 'neutral' | 'warning' | 'risk' }

export const arAging: ARBucket[] = [
  { range: '0–30 days', amount: 48_000, tone: 'positive' },
  { range: '31–60 days', amount: 27_000, tone: 'neutral' },
  { range: '61–90 days', amount: 66_000, tone: 'warning' },
  { range: '90+ days', amount: 46_000, tone: 'risk' },
]

export type TopDebtor = { id: string; name: string; amount: number; daysAged: number; lastContact: string }

export const topDebtors: TopDebtor[] = [
  { id: 'mb', name: 'Marina Bay Developments', amount: 52_000, daysAged: 78, lastContact: '11 May' },
  { id: 'sq', name: 'Sandstone Quarry Co.', amount: 34_000, daysAged: 62, lastContact: '18 May' },
  { id: 'wr', name: 'Westfield Retail Park', amount: 26_000, daysAged: 91, lastContact: '02 May' },
  { id: 'hc', name: 'Hawkesbury Council', amount: 21_000, daysAged: 47, lastContact: '23 May' },
]

export type RootCause = {
  id: string
  title: string
  body: string
  tone: 'risk' | 'warning' | 'info'
}

export const rootCauses: RootCause[] = [
  {
    id: 'rc1',
    title: 'Receivables aging tail',
    body: '$112k of AR aged beyond 45 days, concentrated in 4 commercial customers. Top debtor (Marina Bay) at 78 days.',
    tone: 'risk',
  },
  {
    id: 'rc2',
    title: 'Subcontractor rate creep',
    body: 'Three civil subcontractors raised rates 8–11% over April–May without corresponding price-through to clients.',
    tone: 'warning',
  },
  {
    id: 'rc3',
    title: 'Payroll batch concentration',
    body: '22 Jun payroll batch of $61k lands inside the predicted cash trough — single largest outflow in window.',
    tone: 'risk',
  },
  {
    id: 'rc4',
    title: 'BAS reserve trailing',
    body: 'Q4 GST estimate $84k, reserve only $38k — additional $46k headwind in 57 days.',
    tone: 'info',
  },
]

export type ClientAction = {
  id: string
  title: string
  detail: string
  impact: 'High' | 'Medium' | 'Low'
  estCash?: string
  estMargin?: string
}

export const recommendedActions: ClientAction[] = [
  {
    id: 'a1',
    title: 'AR factoring on top 3 debtors',
    detail: 'Unlock $94k against $112k aged receivables — clears predicted 21-day shortfall.',
    impact: 'High',
    estCash: '+$94k',
  },
  {
    id: 'a2',
    title: 'Renegotiate 3 subcontractor rates',
    detail: 'Vendor rates +9% YoY across civil works; benchmark suggests 4–6% achievable.',
    impact: 'High',
    estMargin: '+3.1 pp',
  },
  {
    id: 'a3',
    title: 'Defer non-critical capex $34k',
    detail: 'Two equipment purchases scheduled in window — defer to Q1 FY27 once cash position stabilises.',
    impact: 'Medium',
    estCash: '+$34k',
  },
  {
    id: 'a4',
    title: 'Auto-allocate 9% to BAS reserve',
    detail: 'Begin from 8 Jun · closes $46k Q4 BAS gap before filing window.',
    impact: 'Medium',
    estCash: 'BAS-safe',
  },
]

export type SyncEvent = {
  id: string
  source: 'Xero' | 'Bank' | 'Payroll' | 'ATO'
  message: string
  detail: string
  agoMin: number
}

export const syncFeed: SyncEvent[] = [
  { id: 's1', source: 'Bank', message: 'Westpac feed reconciled · 3 transactions', detail: '$12,840 inflow, 2 outflows', agoMin: 4 },
  { id: 's2', source: 'Xero', message: 'Invoice #INV-1184 marked paid', detail: 'Hawkesbury Council · $9,200', agoMin: 12 },
  { id: 's3', source: 'Payroll', message: 'NetPayroll roster locked for 22 Jun', detail: '38 employees · gross $61,200', agoMin: 38 },
  { id: 's4', source: 'Xero', message: '4 supplier bills synced', detail: 'Total $18,400 · payable terms net-30', agoMin: 65 },
  { id: 's5', source: 'ATO', message: 'BAS Q3 lodgement confirmed', detail: 'Paid $58,400 on 12 May', agoMin: 1440 },
]

export type ScoreTrendPoint = { week: string; score: number }

export const scoreTrend: ScoreTrendPoint[] = [
  { week: 'W18', score: 58 },
  { week: 'W19', score: 56 },
  { week: 'W20', score: 52 },
  { week: 'W21', score: 47 },
  { week: 'W22', score: 41 },
  { week: 'W23', score: 38 },
]
