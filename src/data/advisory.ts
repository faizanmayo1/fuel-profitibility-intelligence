export type Impact = 'High' | 'Medium' | 'Low'
export type NBARecType = 'Pricing' | 'Cost reduction' | 'Payroll' | 'Tax efficiency' | 'Cash management'

export type NBARec = {
  id: string
  client: string
  industry: string
  type: NBARecType
  title: string
  summary: string
  estUplift: number
  impact: Impact
  confidence: number
  ageHrs: number
}

export const recommendations: NBARec[] = [
  {
    id: 'r1',
    client: 'LumenPath Studios',
    industry: 'Prof. Services',
    type: 'Pricing',
    title: 'Reprice retainer tier B by +9%',
    summary: 'Recovers 6.4 pp EBITDA over the next quarter — 12 clients affected, churn risk low given 18% rate-card gap vs market.',
    estUplift: 68_400,
    impact: 'High',
    confidence: 0.92,
    ageHrs: 2,
  },
  {
    id: 'r2',
    client: 'Arcfield Engineering',
    industry: 'Prof. Services',
    type: 'Payroll',
    title: 'Shift 2 PT roles to contractor retainer',
    summary: 'Reduces fixed labor cost ~$11k/mo while preserving delivery capacity. Net margin uplift 3.1 pp by FY27 Q1.',
    estUplift: 132_000,
    impact: 'High',
    confidence: 0.81,
    ageHrs: 6,
  },
  {
    id: 'r3',
    client: 'Mintwell Retail Co.',
    industry: 'Retail',
    type: 'Cost reduction',
    title: 'Wind down Online Fulfilment line',
    summary: 'Line returned −4.2% net margin trailing 90d. Redirecting marketing spend to in-store cross-sell projected to recover ~$31k/qtr.',
    estUplift: 124_000,
    impact: 'High',
    confidence: 0.88,
    ageHrs: 12,
  },
  {
    id: 'r4',
    client: 'Redhill Constructions',
    industry: 'Construction',
    type: 'Cash management',
    title: 'AR factoring on top 3 debtors',
    summary: 'Unlocks $94k against $112k aged AR; clears predicted 21-day shortfall. Cost of capital 1.4% net of recovery.',
    estUplift: 94_000,
    impact: 'High',
    confidence: 0.86,
    ageHrs: 1,
  },
  {
    id: 'r5',
    client: 'Northbay Café Group',
    industry: 'Hospitality',
    type: 'Tax efficiency',
    title: 'Allocate 9% weekly takings to BAS reserve',
    summary: 'Closes $27k Q4 BAS shortfall before 28 Jul filing window. Auto-rule in Xero recommended.',
    estUplift: 27_000,
    impact: 'Medium',
    confidence: 0.78,
    ageHrs: 24,
  },
  {
    id: 'r6',
    client: 'Kerridge Manufacturing',
    industry: 'Manufacturing',
    type: 'Tax efficiency',
    title: 'Claim unrecognised capital allowances',
    summary: '3 heavy-plant items on the depreciation register missing accelerated allowance. Backdate against current FY filing.',
    estUplift: 8_400,
    impact: 'Medium',
    confidence: 0.94,
    ageHrs: 48,
  },
  {
    id: 'r7',
    client: 'Silvercrest Trades',
    industry: 'Trades',
    type: 'Payroll',
    title: 'Restructure after-hours call-out scheduling',
    summary: 'After-hours overtime up 22% YoY. Move to retainer roster pattern; saves ~$14.6k/qtr without reducing service window.',
    estUplift: 14_600,
    impact: 'Medium',
    confidence: 0.74,
    ageHrs: 72,
  },
]

export type ProfitFirstBand = {
  bucket: string
  current: number
  target: number
  amount: number
  tone: 'positive' | 'warning' | 'risk' | 'info'
}

export const profitFirstBands: ProfitFirstBand[] = [
  { bucket: 'Profit', current: 4.0, target: 10.0, amount: 96_000, tone: 'risk' },
  { bucket: 'Owner pay', current: 18.0, target: 15.0, amount: 432_000, tone: 'warning' },
  { bucket: 'Taxes', current: 8.0, target: 12.0, amount: 192_000, tone: 'warning' },
  { bucket: 'Operating expenses', current: 70.0, target: 63.0, amount: 1_680_000, tone: 'info' },
]

export const advisorySummary = {
  openRecs: 84,
  acceptedThisMonth: 60,
  acceptedRate: 71,
  realisedUplift: 612_000,
  inDiscussionUplift: 384_000,
}

export type ImpactBreakdown = {
  impact: Impact
  count: number
  potentialUplift: number
}

export const impactBreakdown: ImpactBreakdown[] = [
  { impact: 'High', count: 31, potentialUplift: 1_240_000 },
  { impact: 'Medium', count: 38, potentialUplift: 484_000 },
  { impact: 'Low', count: 15, potentialUplift: 92_000 },
]
