export type RiskWindow = '30d' | '60d' | '90d' | 'Safe'

export type CashRow = {
  id: string
  client: string
  industry: string
  runwayDays: number
  predictedShortfall: number
  arOverdue: number
  payrollDue: number
  payrollDate: string
  riskWindow: RiskWindow
  cashOnHand: number
  trigger: string
}

export const cashRows: CashRow[] = [
  {
    id: 'redhill',
    client: 'Redhill Constructions',
    industry: 'Construction',
    runwayDays: 21,
    predictedShortfall: 84_000,
    arOverdue: 112_000,
    payrollDue: 61_000,
    payrollDate: '22 Jun',
    riskWindow: '30d',
    cashOnHand: 42_000,
    trigger: 'AR aged >45d + payroll batch 22 Jun',
  },
  {
    id: 'mintwell',
    client: 'Mintwell Retail Co.',
    industry: 'Retail',
    runwayDays: 19,
    predictedShortfall: 92_000,
    arOverdue: 187_000,
    payrollDue: 84_000,
    payrollDate: '15 Jun',
    riskWindow: '30d',
    cashOnHand: 38_000,
    trigger: '3 anchor customers delayed; runway 19d',
  },
  {
    id: 'northbay',
    client: 'Northbay Café Group',
    industry: 'Hospitality',
    runwayDays: 47,
    predictedShortfall: 27_000,
    arOverdue: 14_000,
    payrollDue: 42_000,
    payrollDate: '12 Jun',
    riskWindow: '60d',
    cashOnHand: 96_000,
    trigger: 'GST $46k due 28 Jul vs reserve $19k',
  },
  {
    id: 'silvercrest',
    client: 'Silvercrest Trades',
    industry: 'Trades',
    runwayDays: 58,
    predictedShortfall: 18_000,
    arOverdue: 41_000,
    payrollDue: 33_000,
    payrollDate: '18 Jun',
    riskWindow: '60d',
    cashOnHand: 71_000,
    trigger: 'Overtime spike on after-hours line',
  },
  {
    id: 'arcfield',
    client: 'Arcfield Engineering',
    industry: 'Prof. Services',
    runwayDays: 73,
    predictedShortfall: 11_000,
    arOverdue: 38_000,
    payrollDue: 144_000,
    payrollDate: '24 Jun',
    riskWindow: '90d',
    cashOnHand: 188_000,
    trigger: 'Payroll grew 22% vs revenue 9%',
  },
  {
    id: 'lumenpath',
    client: 'LumenPath Studios',
    industry: 'Prof. Services',
    runwayDays: 84,
    predictedShortfall: 4_000,
    arOverdue: 22_000,
    payrollDue: 38_000,
    payrollDate: '14 Jun',
    riskWindow: '90d',
    cashOnHand: 142_000,
    trigger: 'Margin compression starting to hit cash',
  },
]

export const riskCounts = {
  '30d': 3,
  '60d': 5,
  '90d': 6,
  Safe: 128,
}

export const cashSummary = {
  predicted30dGap: 268_000,
  predicted60dGap: 412_000,
  predicted90dGap: 568_000,
  recoveredCash: 1_840_000,
}

export type ScenarioPoint = { day: number; baseline: number; delayed: number; payrollHike: number }

export const scenarioSeries: ScenarioPoint[] = [
  { day: 0, baseline: 240, delayed: 240, payrollHike: 240 },
  { day: 7, baseline: 224, delayed: 198, payrollHike: 210 },
  { day: 14, baseline: 198, delayed: 152, payrollHike: 172 },
  { day: 21, baseline: 184, delayed: 96, payrollHike: 138 },
  { day: 28, baseline: 162, delayed: 48, payrollHike: 96 },
  { day: 35, baseline: 158, delayed: 12, payrollHike: 64 },
  { day: 42, baseline: 174, delayed: -28, payrollHike: 32 },
  { day: 49, baseline: 188, delayed: -52, payrollHike: 14 },
  { day: 56, baseline: 196, delayed: -78, payrollHike: -18 },
]
