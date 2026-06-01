export type ReportType = 'Monthly P&L' | 'BAS pack' | 'Board pack' | 'Cash narrative' | 'Annual summary'

export type ReportEntry = {
  id: string
  client: string
  type: ReportType
  period: string
  status: 'Auto-generated' | 'In review' | 'Delivered'
  updatedHrs: number
  pages: number
}

export const reports: ReportEntry[] = [
  { id: 'rp1', client: 'Mintwell Retail Co.', type: 'Monthly P&L', period: 'May 2026', status: 'In review', updatedHrs: 1, pages: 6 },
  { id: 'rp2', client: 'Redhill Constructions', type: 'Cash narrative', period: 'Week 22', status: 'Auto-generated', updatedHrs: 3, pages: 3 },
  { id: 'rp3', client: 'LumenPath Studios', type: 'Monthly P&L', period: 'May 2026', status: 'Delivered', updatedHrs: 18, pages: 7 },
  { id: 'rp4', client: 'Northbay Café Group', type: 'BAS pack', period: 'Q4 FY26', status: 'In review', updatedHrs: 4, pages: 4 },
  { id: 'rp5', client: 'Kerridge Manufacturing', type: 'Board pack', period: 'Q4 FY26', status: 'Auto-generated', updatedHrs: 6, pages: 14 },
  { id: 'rp6', client: 'Meridien SaaS Labs', type: 'Monthly P&L', period: 'May 2026', status: 'Delivered', updatedHrs: 24, pages: 5 },
  { id: 'rp7', client: 'Arcfield Engineering', type: 'Annual summary', period: 'FY26', status: 'Auto-generated', updatedHrs: 12, pages: 22 },
]

export type VarianceItem = {
  metric: string
  prior: string
  current: string
  deltaPct: number
  driver: string
  tone: 'positive' | 'warning' | 'risk' | 'neutral'
}

export const sampleNarrative = {
  client: 'Mintwell Retail Co.',
  period: 'Month ending 31 May 2026',
  paragraphs: [
    'Mintwell ended May with revenue of $432k, up 4.1% month-over-month, however gross margin compressed by 3.6 pp to 12.1% — the second consecutive month of margin contraction. The primary driver was the Online Fulfilment line, where logistics costs rose 18% while pricing held flat.',
    'Operating cash deteriorated from $84k to $38k over the month, principally due to three anchor customers extending payment by 14–21 days versus 30-day terms. Receivables aged beyond 60 days now stand at $187k, with the runway at 19 days under the current trajectory.',
    'Recommended action: reprice or wind down the Online Fulfilment line (modelled $31k/qtr recovery) and run an AR-factoring scenario against the top three debtors. We have drafted the customer outreach sequence in the client comms queue, pending advisor review.',
  ],
}

export const sampleVariance: VarianceItem[] = [
  { metric: 'Revenue', prior: '$415k', current: '$432k', deltaPct: 4.1, driver: 'Strong May trading week', tone: 'positive' },
  { metric: 'Gross margin', prior: '15.7%', current: '12.1%', deltaPct: -3.6, driver: 'Online Fulfilment costs +18%', tone: 'warning' },
  { metric: 'Operating cash', prior: '$84k', current: '$38k', deltaPct: -54.8, driver: '3 anchor customers delayed', tone: 'risk' },
  { metric: 'Payroll', prior: '$94k', current: '$98k', deltaPct: 4.3, driver: 'Casual hours up for Mother\'s Day', tone: 'neutral' },
  { metric: 'EBITDA', prior: '$48k', current: '$32k', deltaPct: -33.3, driver: 'Margin compression flowing through', tone: 'risk' },
]
