export type PlatformCategory = 'Accounting' | 'Bank feed' | 'Payroll' | 'Tax & compliance' | 'Expense'
export type PlatformStatus = 'Healthy' | 'Degraded' | 'Down'

export type Platform = {
  id: string
  name: string
  category: PlatformCategory
  clientsConnected: number
  lastSyncMin: number
  eventsToday: number
  status: PlatformStatus
  brandColor: string
  initial: string
}

export const platforms: Platform[] = [
  { id: 'xero', name: 'Xero', category: 'Accounting', clientsConnected: 88, lastSyncMin: 2, eventsToday: 6_420, status: 'Healthy', brandColor: '#13B5EA', initial: 'X' },
  { id: 'quickbooks', name: 'QuickBooks Online', category: 'Accounting', clientsConnected: 24, lastSyncMin: 5, eventsToday: 1_840, status: 'Healthy', brandColor: '#2CA01C', initial: 'Q' },
  { id: 'myob', name: 'MYOB AccountRight', category: 'Accounting', clientsConnected: 30, lastSyncMin: 7, eventsToday: 2_180, status: 'Healthy', brandColor: '#6610F2', initial: 'M' },
  { id: 'banks', name: 'Bank feeds · Big 4', category: 'Bank feed', clientsConnected: 142, lastSyncMin: 1, eventsToday: 2_840, status: 'Healthy', brandColor: '#0E2C4A', initial: 'B' },
  { id: 'netpayroll', name: 'NetPayroll', category: 'Payroll', clientsConnected: 38, lastSyncMin: 3, eventsToday: 412, status: 'Degraded', brandColor: '#D97706', initial: 'N' },
  { id: 'keypay', name: 'KeyPay (Employment Hero Payroll)', category: 'Payroll', clientsConnected: 62, lastSyncMin: 4, eventsToday: 738, status: 'Healthy', brandColor: '#FF6900', initial: 'K' },
  { id: 'employmenthero', name: 'Employment Hero · HR', category: 'Payroll', clientsConnected: 42, lastSyncMin: 6, eventsToday: 524, status: 'Healthy', brandColor: '#E5286F', initial: 'EH' },
  { id: 'ato', name: 'ATO BAS Gateway', category: 'Tax & compliance', clientsConnected: 142, lastSyncMin: 14, eventsToday: 18, status: 'Healthy', brandColor: '#003366', initial: 'A' },
  { id: 'dext', name: 'Dext · Receipts', category: 'Expense', clientsConnected: 84, lastSyncMin: 9, eventsToday: 1_240, status: 'Healthy', brandColor: '#00B6BD', initial: 'D' },
  { id: 'hubdoc', name: 'Hubdoc · Documents', category: 'Expense', clientsConnected: 47, lastSyncMin: 11, eventsToday: 612, status: 'Healthy', brandColor: '#00A1DF', initial: 'H' },
]

export type StreamEvent = {
  id: string
  source: 'Xero' | 'Bank' | 'NetPayroll' | 'KeyPay' | 'ATO' | 'Dext' | 'MYOB'
  message: string
  effect: string
  client: string
  agoSec: number
}

export const streamEvents: StreamEvent[] = [
  {
    id: 'e1',
    source: 'Xero',
    message: 'Invoice INV-1184 marked paid · Hawkesbury Council · $9,200',
    effect: 'Redhill cash forecast recalculated · runway +0.6 days',
    client: 'Redhill Constructions',
    agoSec: 24,
  },
  {
    id: 'e2',
    source: 'Bank',
    message: 'Westpac feed reconciled · 3 transactions',
    effect: 'Mintwell gross margin recalculated · −0.4 pp (online fulfilment)',
    client: 'Mintwell Retail Co.',
    agoSec: 58,
  },
  {
    id: 'e3',
    source: 'NetPayroll',
    message: 'Roster locked for 22 Jun · 38 employees · gross $61,200',
    effect: 'Redhill cash projection updated · trough now D21',
    client: 'Redhill Constructions',
    agoSec: 92,
  },
  {
    id: 'e4',
    source: 'ATO',
    message: 'BAS Q3 lodgement confirmed · paid $58,400',
    effect: 'Redhill tax exposure updated · BAS reserve adequate',
    client: 'Redhill Constructions',
    agoSec: 184,
  },
  {
    id: 'e5',
    source: 'Xero',
    message: '4 supplier bills synced · total $18,400 net-30',
    effect: 'Arcfield expense anomaly check triggered · 0 anomalies',
    client: 'Arcfield Engineering',
    agoSec: 240,
  },
  {
    id: 'e6',
    source: 'Dext',
    message: 'Receipt OCR · CloudKit Pro subscription · $1,240',
    effect: 'Mintwell recurring spend list updated · 3 inactive seats flagged',
    client: 'Mintwell Retail Co.',
    agoSec: 318,
  },
  {
    id: 'e7',
    source: 'KeyPay',
    message: 'Overtime threshold breached · after-hours team',
    effect: 'Silvercrest payroll efficiency score −2 · alert raised',
    client: 'Silvercrest Trades',
    agoSec: 420,
  },
  {
    id: 'e8',
    source: 'MYOB',
    message: 'Bill batch synced · 7 supplier invoices · $14,800',
    effect: 'Northbay AP forecast refreshed · BAS gap unchanged at $27k',
    client: 'Northbay Café Group',
    agoSec: 540,
  },
]

export type SyncMetrics = {
  eventsToday: number
  uptime30d: number
  p95LatencyMs: number
  errorRate: number
  activeWebhooks: number
  schemaMappings: number
}

export const syncMetrics: SyncMetrics = {
  eventsToday: 12_847,
  uptime30d: 99.8,
  p95LatencyMs: 1_240,
  errorRate: 0.03,
  activeWebhooks: 1_842,
  schemaMappings: 18_400,
}

export type ThroughputPoint = { hour: string; events: number }

export const throughput: ThroughputPoint[] = [
  { hour: '00', events: 280 },
  { hour: '02', events: 124 },
  { hour: '04', events: 96 },
  { hour: '06', events: 318 },
  { hour: '08', events: 1_240 },
  { hour: '10', events: 1_840 },
  { hour: '12', events: 1_620 },
  { hour: '14', events: 1_780 },
  { hour: '16', events: 1_960 },
  { hour: '18', events: 1_240 },
  { hour: '20', events: 720 },
  { hour: '22', events: 419 },
]

export type AuditEntry = {
  id: string
  actor: string
  action: string
  detail: string
  agoLabel: string
  tone: 'info' | 'warning' | 'neutral'
}

export const auditLog: AuditEntry[] = [
  { id: 'a1', actor: 'John Doe', action: 'Added Xero connector', detail: 'VelocityX Marketing · OAuth scope: read-write', agoLabel: '2 days ago', tone: 'info' },
  { id: 'a2', actor: 'Priya Khatri', action: 'Rotated MYOB API key', detail: 'Northbay Café Group · scheduled rotation', agoLabel: '5 days ago', tone: 'info' },
  { id: 'a3', actor: 'System', action: 'Auto-resolved sync conflict', detail: 'Mintwell Retail · duplicate invoice de-duped', agoLabel: '1 week ago', tone: 'neutral' },
  { id: 'a4', actor: 'Adam Trent', action: 'Approved data retention policy', detail: '7-year retention · AU compliance', agoLabel: '2 weeks ago', tone: 'info' },
  { id: 'a5', actor: 'System', action: 'NetPayroll · degraded', detail: 'Rate-limit upstream · auto-throttled writes', agoLabel: '36 min ago', tone: 'warning' },
]

export const tenantInfo = {
  tenant: 'Fuel Accountants',
  region: 'AU East · Sydney',
  residency: 'Sydney AZ-1 · Sydney AZ-2',
  encryption: 'AES-256-GCM at rest · TLS 1.3 in transit',
  certifications: ['SOC 2 Type II', 'ISO 27001', 'AU CDR ready'],
  isolation: 'Per-client schema · row-level tenant guard',
}
