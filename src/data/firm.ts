export type Advisor = {
  id: string
  name: string
  initials: string
  role: string
  clients: number
  arrManaged: number
  openActions: number
  slaWithin: number
  acceptanceRate: number
  upliftMTD: number
}

export const advisors: Advisor[] = [
  { id: 'fazal', name: 'Fazal Mumtaz', initials: 'FM', role: 'Senior Advisor', clients: 42, arrManaged: 38_400_000, openActions: 18, slaWithin: 92, acceptanceRate: 74, upliftMTD: 184_000 },
  { id: 'priya', name: 'Priya Khatri', initials: 'PK', role: 'Advisor', clients: 38, arrManaged: 22_700_000, openActions: 22, slaWithin: 88, acceptanceRate: 71, upliftMTD: 142_000 },
  { id: 'adam', name: 'Adam Trent', initials: 'AT', role: 'Advisor', clients: 34, arrManaged: 26_100_000, openActions: 14, slaWithin: 95, acceptanceRate: 68, upliftMTD: 168_000 },
  { id: 'leila', name: 'Leila Okonkwo', initials: 'LO', role: 'Associate', clients: 28, arrManaged: 31_200_000, openActions: 20, slaWithin: 84, acceptanceRate: 64, upliftMTD: 118_000 },
]

export type Segment = {
  name: 'High value' | 'High risk' | 'Growth' | 'Stable' | 'New'
  count: number
  arr: number
  tone: 'sovereign' | 'risk' | 'positive' | 'info' | 'neutral'
}

export const segments: Segment[] = [
  { name: 'High value', count: 24, arr: 48_400_000, tone: 'sovereign' },
  { name: 'High risk', count: 14, arr: 9_100_000, tone: 'risk' },
  { name: 'Growth', count: 26, arr: 17_200_000, tone: 'positive' },
  { name: 'Stable', count: 58, arr: 38_900_000, tone: 'info' },
  { name: 'New', count: 20, arr: 4_800_000, tone: 'neutral' },
]

export type SLA = {
  metric: string
  target: number
  actual: number
  unit: '%' | 'h'
  ahead?: boolean
}

export const slas: SLA[] = [
  { metric: 'Cash-risk alerts → call', target: 24, actual: 18, unit: 'h', ahead: true },
  { metric: 'BAS review turnaround', target: 72, actual: 64, unit: 'h', ahead: true },
  { metric: 'Margin-leak advisory', target: 48, actual: 52, unit: 'h', ahead: false },
  { metric: 'Monthly P&L delivery', target: 95, actual: 92, unit: '%', ahead: false },
  { metric: 'Email response within 4h', target: 90, actual: 94, unit: '%', ahead: true },
]

export const firmSummary = {
  advisors: 4,
  clients: 142,
  totalARR: '$118.4M',
  totalUpliftMTD: 612_000,
  openActions: 74,
  slaWithin: 90,
}
