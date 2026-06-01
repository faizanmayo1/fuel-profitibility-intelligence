export type BASStatus = 'On track' | 'Watch' | 'Underpayment risk' | 'At risk'

export type TaxRow = {
  id: string
  client: string
  industry: string
  basPeriod: string
  basDueDate: string
  estimatedLiability: number
  reserveCurrent: number
  shortfall: number
  status: BASStatus
  missedDeductions: number
}

export const taxRows: TaxRow[] = [
  { id: 'northbay', client: 'Northbay Café Group', industry: 'Hospitality', basPeriod: 'Q4 FY26', basDueDate: '28 Jul', estimatedLiability: 46_000, reserveCurrent: 19_000, shortfall: 27_000, status: 'Underpayment risk', missedDeductions: 4_200 },
  { id: 'redhill', client: 'Redhill Constructions', industry: 'Construction', basPeriod: 'Q4 FY26', basDueDate: '28 Jul', estimatedLiability: 84_000, reserveCurrent: 38_000, shortfall: 46_000, status: 'Underpayment risk', missedDeductions: 7_800 },
  { id: 'mintwell', client: 'Mintwell Retail Co.', industry: 'Retail', basPeriod: 'Q4 FY26', basDueDate: '28 Jul', estimatedLiability: 124_000, reserveCurrent: 88_000, shortfall: 36_000, status: 'Watch', missedDeductions: 11_200 },
  { id: 'arcfield', client: 'Arcfield Engineering', industry: 'Prof. Services', basPeriod: 'Q4 FY26', basDueDate: '28 Jul', estimatedLiability: 138_000, reserveCurrent: 142_000, shortfall: 0, status: 'On track', missedDeductions: 3_400 },
  { id: 'kerridge', client: 'Kerridge Manufacturing', industry: 'Manufacturing', basPeriod: 'Q4 FY26', basDueDate: '28 Jul', estimatedLiability: 218_000, reserveCurrent: 196_000, shortfall: 22_000, status: 'Watch', missedDeductions: 14_800 },
  { id: 'silvercrest', client: 'Silvercrest Trades', industry: 'Trades', basPeriod: 'Q4 FY26', basDueDate: '28 Jul', estimatedLiability: 28_000, reserveCurrent: 31_000, shortfall: 0, status: 'On track', missedDeductions: 2_100 },
  { id: 'lumenpath', client: 'LumenPath Studios', industry: 'Prof. Services', basPeriod: 'Q4 FY26', basDueDate: '28 Jul', estimatedLiability: 42_000, reserveCurrent: 27_000, shortfall: 15_000, status: 'At risk', missedDeductions: 3_600 },
  { id: 'pinegate', client: 'Pinegate Property', industry: 'Prof. Services', basPeriod: 'Q4 FY26', basDueDate: '28 Jul', estimatedLiability: 86_000, reserveCurrent: 92_000, shortfall: 0, status: 'On track', missedDeductions: 5_400 },
]

export const taxSummary = {
  totalLiability: 766_000,
  aggregateShortfall: 146_000,
  clientsOnTrack: 91,
  clientsAtRisk: 14,
  missedDeductionsTotal: 52_500,
  basDueDays: 57,
}

export type MissedDeduction = {
  id: string
  client: string
  category: string
  amount: number
  evidence: string
}

export const missedDeductions: MissedDeduction[] = [
  { id: 'd1', client: 'Kerridge Manufacturing', category: 'Capital allowances · plant', amount: 8_400, evidence: '3 unclaimed depreciation items on heavy plant register' },
  { id: 'd2', client: 'Mintwell Retail Co.', category: 'Home-office portion · owner-director', amount: 4_600, evidence: 'Owner usage 28% of floor area · not currently apportioned' },
  { id: 'd3', client: 'Redhill Constructions', category: 'Vehicle usage log', amount: 3_800, evidence: 'Logbook supports 78% business use; only 60% claimed' },
  { id: 'd4', client: 'Northbay Café Group', category: 'Energy-efficiency rebate', amount: 2_200, evidence: 'New refrigeration units eligible for NSW SEE rebate' },
  { id: 'd5', client: 'Arcfield Engineering', category: 'R&amp;D claim · proto tooling', amount: 11_400, evidence: 'Time-tracked prototyping qualifies for R&amp;D tax incentive' },
]
