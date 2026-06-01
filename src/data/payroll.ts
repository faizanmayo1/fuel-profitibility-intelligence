export type PayrollRow = {
  id: string
  client: string
  industry: string
  laborRatio: number
  benchmark: number
  payrollGrowth: number
  revenueGrowth: number
  overtimeHrs: number
  overtimeDelta: number
  status: 'Efficient' | 'Watch' | 'Drift' | 'Critical'
}

export const payrollRows: PayrollRow[] = [
  { id: 'arcfield', client: 'Arcfield Engineering', industry: 'Prof. Services', laborRatio: 48.2, benchmark: 42.0, payrollGrowth: 22.4, revenueGrowth: 9.1, overtimeHrs: 412, overtimeDelta: 18.4, status: 'Critical' },
  { id: 'redhill', client: 'Redhill Constructions', industry: 'Construction', laborRatio: 41.8, benchmark: 38.0, payrollGrowth: 14.6, revenueGrowth: 3.2, overtimeHrs: 286, overtimeDelta: 24.1, status: 'Drift' },
  { id: 'silvercrest', client: 'Silvercrest Trades', industry: 'Trades', laborRatio: 39.4, benchmark: 36.0, payrollGrowth: 9.8, revenueGrowth: 6.5, overtimeHrs: 174, overtimeDelta: 22.0, status: 'Drift' },
  { id: 'mintwell', client: 'Mintwell Retail Co.', industry: 'Retail', laborRatio: 21.8, benchmark: 19.0, payrollGrowth: 7.4, revenueGrowth: 4.1, overtimeHrs: 92, overtimeDelta: 11.2, status: 'Watch' },
  { id: 'northbay', client: 'Northbay Café Group', industry: 'Hospitality', laborRatio: 34.6, benchmark: 32.0, payrollGrowth: 12.1, revenueGrowth: 11.4, overtimeHrs: 218, overtimeDelta: 4.2, status: 'Watch' },
  { id: 'meridien', client: 'Meridien SaaS Labs', industry: 'SaaS', laborRatio: 38.4, benchmark: 42.0, payrollGrowth: 26.4, revenueGrowth: 38.2, overtimeHrs: 41, overtimeDelta: -8.2, status: 'Efficient' },
]

export type ExpenseAnomaly = {
  id: string
  client: string
  vendor: string
  category: 'Subscription' | 'One-off' | 'Vendor concentration' | 'Duplicate'
  amount: number
  baselineMultiplier: number
  flaggedAt: string
  action: string
}

export const expenseAnomalies: ExpenseAnomaly[] = [
  {
    id: 'e1',
    client: 'Arcfield Engineering',
    vendor: 'Northshore Materials',
    category: 'Vendor concentration',
    amount: 14_200,
    baselineMultiplier: 6.4,
    flaggedAt: '29 May',
    action: 'Confirm with ops before reconciliation',
  },
  {
    id: 'e2',
    client: 'Mintwell Retail Co.',
    vendor: 'CloudKit Pro',
    category: 'Subscription',
    amount: 1_240,
    baselineMultiplier: 1.0,
    flaggedAt: '24 May',
    action: 'Annual renewal — 3 inactive seats detected ($420/mo)',
  },
  {
    id: 'e3',
    client: 'Northbay Café Group',
    vendor: 'Beanstream Supplies',
    category: 'Vendor concentration',
    amount: 9_800,
    baselineMultiplier: 2.1,
    flaggedAt: '21 May',
    action: 'Coffee bean COGS +14% YoY — review contract',
  },
  {
    id: 'e4',
    client: 'Kerridge Manufacturing',
    vendor: 'IntelliBuild Tools',
    category: 'Duplicate',
    amount: 3_400,
    baselineMultiplier: 1.0,
    flaggedAt: '19 May',
    action: 'Likely duplicate of invoice #884112 (paid 8 May)',
  },
  {
    id: 'e5',
    client: 'Silvercrest Trades',
    vendor: 'Multiple SaaS tools',
    category: 'Subscription',
    amount: 2_180,
    baselineMultiplier: 1.0,
    flaggedAt: '15 May',
    action: '7 SaaS subscriptions overlapping — consolidation saves $830/mo',
  },
]

export const payrollSummary = {
  clientsOverLabor: 14,
  totalOvertimeHrs: 4_280,
  overtimeUpYoY: 12.4,
  recurringSpendDetected: 88_600,
  subscriptionWaste: 14_300,
}

export type LaborTrendPoint = { month: string; payroll: number; revenue: number }

export const laborTrend: LaborTrendPoint[] = [
  { month: 'Dec', payroll: 100, revenue: 100 },
  { month: 'Jan', payroll: 103, revenue: 102 },
  { month: 'Feb', payroll: 107, revenue: 104 },
  { month: 'Mar', payroll: 112, revenue: 105 },
  { month: 'Apr', payroll: 116, revenue: 106 },
  { month: 'May', payroll: 120, revenue: 108 },
  { month: 'Jun', payroll: 122, revenue: 109 },
]
