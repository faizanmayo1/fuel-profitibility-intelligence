import type { HealthBand } from './dashboard'

export type Industry =
  | 'Construction'
  | 'Retail'
  | 'Prof. Services'
  | 'SaaS'
  | 'Hospitality'
  | 'Manufacturing'
  | 'Health'
  | 'Trades'

export type Integration = 'Xero' | 'QuickBooks' | 'MYOB'

export type Client = {
  id: string
  name: string
  industry: Industry
  segment: 'Growth' | 'Stable' | 'At risk' | 'High value' | 'New'
  arr: number
  health: HealthBand
  healthScore: number
  scoreDelta: number
  topAlert: string | null
  integration: Integration
  lastSyncMin: number
  advisor: string
  recRevenueGrowth: number
  marginPct: number
}

export const clients: Client[] = [
  { id: 'redhill', name: 'Redhill Constructions', industry: 'Construction', segment: 'High value', arr: 2_400_000, health: 'Critical', healthScore: 38, scoreDelta: -14, topAlert: 'Cash shortfall in 21 days', integration: 'Xero', lastSyncMin: 4, advisor: 'John D.', recRevenueGrowth: -3.2, marginPct: 18.4 },
  { id: 'mintwell', name: 'Mintwell Retail Co.', industry: 'Retail', segment: 'High value', arr: 4_800_000, health: 'Critical', healthScore: 41, scoreDelta: -11, topAlert: 'AR >60d aged $187k', integration: 'Xero', lastSyncMin: 2, advisor: 'John D.', recRevenueGrowth: 4.1, marginPct: 12.1 },
  { id: 'lumenpath', name: 'LumenPath Studios', industry: 'Prof. Services', segment: 'Stable', arr: 890_000, health: 'At Risk', healthScore: 54, scoreDelta: -9, topAlert: 'Margin compression −12pp', integration: 'Xero', lastSyncMin: 6, advisor: 'Priya K.', recRevenueGrowth: 8.7, marginPct: 22.6 },
  { id: 'northbay', name: 'Northbay Café Group', industry: 'Hospitality', segment: 'Stable', arr: 1_600_000, health: 'At Risk', healthScore: 58, scoreDelta: -6, topAlert: 'BAS underpayment risk', integration: 'MYOB', lastSyncMin: 12, advisor: 'Priya K.', recRevenueGrowth: 11.4, marginPct: 16.3 },
  { id: 'arcfield', name: 'Arcfield Engineering', industry: 'Prof. Services', segment: 'High value', arr: 3_100_000, health: 'At Risk', healthScore: 61, scoreDelta: -5, topAlert: 'Payroll outpacing revenue', integration: 'Xero', lastSyncMin: 3, advisor: 'John D.', recRevenueGrowth: 9.2, marginPct: 19.8 },
  { id: 'silvercrest', name: 'Silvercrest Trades', industry: 'Trades', segment: 'Stable', arr: 720_000, health: 'Stable', healthScore: 68, scoreDelta: -2, topAlert: 'Overtime drift detected', integration: 'Xero', lastSyncMin: 8, advisor: 'Adam T.', recRevenueGrowth: 6.5, marginPct: 24.1 },
  { id: 'kerridge', name: 'Kerridge Manufacturing', industry: 'Manufacturing', segment: 'High value', arr: 5_400_000, health: 'Stable', healthScore: 71, scoreDelta: +1, topAlert: 'Vendor concentration ↑', integration: 'QuickBooks', lastSyncMin: 5, advisor: 'Adam T.', recRevenueGrowth: 14.0, marginPct: 28.4 },
  { id: 'coastline', name: 'Coastline Hospitality', industry: 'Hospitality', segment: 'Stable', arr: 2_100_000, health: 'Stable', healthScore: 72, scoreDelta: +2, topAlert: null, integration: 'MYOB', lastSyncMin: 11, advisor: 'Priya K.', recRevenueGrowth: 9.8, marginPct: 17.6 },
  { id: 'meridien', name: 'Meridien SaaS Labs', industry: 'SaaS', segment: 'Growth', arr: 6_200_000, health: 'Strong', healthScore: 84, scoreDelta: +4, topAlert: null, integration: 'Xero', lastSyncMin: 1, advisor: 'John D.', recRevenueGrowth: 38.2, marginPct: 64.1 },
  { id: 'havencare', name: 'Havencare Clinics', industry: 'Health', segment: 'Stable', arr: 3_800_000, health: 'Stable', healthScore: 73, scoreDelta: 0, topAlert: null, integration: 'Xero', lastSyncMin: 7, advisor: 'Adam T.', recRevenueGrowth: 7.2, marginPct: 21.4 },
  { id: 'ironbark', name: 'Ironbark Build Co.', industry: 'Construction', segment: 'Stable', arr: 4_100_000, health: 'Stable', healthScore: 69, scoreDelta: -3, topAlert: 'Subcontractor cost ↑ 9%', integration: 'Xero', lastSyncMin: 9, advisor: 'John D.', recRevenueGrowth: 5.1, marginPct: 14.8 },
  { id: 'pinegate', name: 'Pinegate Property Mgmt', industry: 'Prof. Services', segment: 'Growth', arr: 1_950_000, health: 'Strong', healthScore: 81, scoreDelta: +3, topAlert: null, integration: 'Xero', lastSyncMin: 4, advisor: 'Priya K.', recRevenueGrowth: 22.4, marginPct: 31.2 },
  { id: 'oakridge', name: 'Oakridge Logistics', industry: 'Manufacturing', segment: 'Stable', arr: 2_800_000, health: 'Stable', healthScore: 70, scoreDelta: +1, topAlert: null, integration: 'QuickBooks', lastSyncMin: 6, advisor: 'Adam T.', recRevenueGrowth: 8.0, marginPct: 18.9 },
  { id: 'velocityx', name: 'VelocityX Marketing', industry: 'Prof. Services', segment: 'New', arr: 410_000, health: 'Stable', healthScore: 66, scoreDelta: +2, topAlert: null, integration: 'Xero', lastSyncMin: 14, advisor: 'Priya K.', recRevenueGrowth: 19.6, marginPct: 26.4 },
  { id: 'beacon', name: 'Beacon Dental Group', industry: 'Health', segment: 'Stable', arr: 1_440_000, health: 'Strong', healthScore: 79, scoreDelta: +1, topAlert: null, integration: 'Xero', lastSyncMin: 5, advisor: 'Adam T.', recRevenueGrowth: 6.9, marginPct: 33.7 },
]

export const portfolioFilters = {
  segments: ['All', 'Growth', 'Stable', 'At risk', 'High value', 'New'] as const,
  industries: ['All', 'Construction', 'Retail', 'Prof. Services', 'SaaS', 'Hospitality', 'Manufacturing', 'Health', 'Trades'] as const,
  health: ['All', 'Strong', 'Stable', 'At Risk', 'Critical'] as const,
}

export const portfolioStats = {
  total: 142,
  shown: clients.length,
  totalARR: '$118.4M',
  avgHealth: 71,
  syncedSources: 6,
  liveSyncs: 142,
}
