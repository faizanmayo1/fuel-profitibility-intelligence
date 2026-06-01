export type LeakRootCause = 'Pricing' | 'Cost inflation' | 'Labor inefficiency' | 'Cash timing'

export type LeakAlert = {
  id: string
  client: string
  industry: string
  rootCause: LeakRootCause
  serviceLine: string
  marginDeltaPp: number
  estQuarterlyImpact: number
  recommendation: string
  detectedAt: string
  confidence: number
}

export const leaks: LeakAlert[] = [
  {
    id: 'l1',
    client: 'LumenPath Studios',
    industry: 'Prof. Services',
    rootCause: 'Cost inflation',
    serviceLine: 'Retainer tier B',
    marginDeltaPp: -12.0,
    estQuarterlyImpact: 68_400,
    recommendation: 'Reprice retainer tier B (+9%) to recover 6.4 pp EBITDA — 12 clients affected.',
    detectedAt: '14 min ago',
    confidence: 0.92,
  },
  {
    id: 'l2',
    client: 'Mintwell Retail Co.',
    industry: 'Retail',
    rootCause: 'Pricing',
    serviceLine: 'Online Fulfilment',
    marginDeltaPp: -4.2,
    estQuarterlyImpact: 31_200,
    recommendation: 'Reprice +11% or wind down — line at −4.2% net margin trailing 90d.',
    detectedAt: '2 hr ago',
    confidence: 0.88,
  },
  {
    id: 'l3',
    client: 'Arcfield Engineering',
    industry: 'Prof. Services',
    rootCause: 'Labor inefficiency',
    serviceLine: 'Project delivery',
    marginDeltaPp: -3.1,
    estQuarterlyImpact: 42_800,
    recommendation: 'Shift 2 PT roles to contractor retainer — labour ratio crossed 48% threshold.',
    detectedAt: '5 hr ago',
    confidence: 0.81,
  },
  {
    id: 'l4',
    client: 'Ironbark Build Co.',
    industry: 'Construction',
    rootCause: 'Cost inflation',
    serviceLine: 'Civil works',
    marginDeltaPp: -2.4,
    estQuarterlyImpact: 56_900,
    recommendation: 'Subcontractor rates up 9% across 4 vendors — renegotiate or rebid.',
    detectedAt: '1 d ago',
    confidence: 0.84,
  },
  {
    id: 'l5',
    client: 'Northbay Café Group',
    industry: 'Hospitality',
    rootCause: 'Cost inflation',
    serviceLine: 'Café · CBD branch',
    marginDeltaPp: -5.6,
    estQuarterlyImpact: 18_300,
    recommendation: 'Coffee bean COGS +14% YoY; review supplier contract before 1 Jul.',
    detectedAt: '1 d ago',
    confidence: 0.79,
  },
  {
    id: 'l6',
    client: 'Silvercrest Trades',
    industry: 'Trades',
    rootCause: 'Labor inefficiency',
    serviceLine: 'After-hours callouts',
    marginDeltaPp: -2.8,
    estQuarterlyImpact: 14_600,
    recommendation: 'Overtime up 22% on after-hours line — restructure call-out scheduling.',
    detectedAt: '2 d ago',
    confidence: 0.74,
  },
  {
    id: 'l7',
    client: 'Redhill Constructions',
    industry: 'Construction',
    rootCause: 'Cash timing',
    serviceLine: 'Commercial fit-out',
    marginDeltaPp: -1.9,
    estQuarterlyImpact: 22_500,
    recommendation: 'Receivables aging mismatch with subcontractor payables — restructure milestones.',
    detectedAt: '2 d ago',
    confidence: 0.69,
  },
  {
    id: 'l8',
    client: 'Kerridge Manufacturing',
    industry: 'Manufacturing',
    rootCause: 'Pricing',
    serviceLine: 'Custom fabrication',
    marginDeltaPp: -1.4,
    estQuarterlyImpact: 38_200,
    recommendation: 'Custom-fab tier underpriced vs benchmark — apply +6% on next quote cycle.',
    detectedAt: '3 d ago',
    confidence: 0.71,
  },
]

export type CauseBreakdown = {
  cause: LeakRootCause
  count: number
  impact: number
  tone: 'risk' | 'warning' | 'info' | 'neutral'
}

export const causeBreakdown: CauseBreakdown[] = [
  { cause: 'Cost inflation', count: 23, impact: 312_400, tone: 'warning' },
  { cause: 'Pricing', count: 14, impact: 218_900, tone: 'risk' },
  { cause: 'Labor inefficiency', count: 9, impact: 124_700, tone: 'info' },
  { cause: 'Cash timing', count: 6, impact: 64_300, tone: 'neutral' },
]

export type IndustryBenchmark = {
  industry: string
  fuelClientAvg: number
  industryBaseline: number
  topQuartile: number
}

export const benchmarks: IndustryBenchmark[] = [
  { industry: 'Construction', fuelClientAvg: 14.8, industryBaseline: 17.2, topQuartile: 22.5 },
  { industry: 'Retail', fuelClientAvg: 12.1, industryBaseline: 13.4, topQuartile: 19.8 },
  { industry: 'Prof. Services', fuelClientAvg: 22.6, industryBaseline: 24.1, topQuartile: 31.6 },
  { industry: 'SaaS', fuelClientAvg: 64.1, industryBaseline: 58.2, topQuartile: 71.4 },
  { industry: 'Hospitality', fuelClientAvg: 16.3, industryBaseline: 14.8, topQuartile: 21.2 },
  { industry: 'Manufacturing', fuelClientAvg: 28.4, industryBaseline: 21.7, topQuartile: 30.8 },
]

export const leakSummary = {
  activeLeaks: 52,
  trailingImpact: 720_300,
  trailingRecovered: 187_400,
  avgMarginDeltaPp: -3.7,
}
