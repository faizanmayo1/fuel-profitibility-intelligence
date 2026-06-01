export const ROUTES = {
  root: '/',
  clients: '/clients',
  client: '/client/:slug',
  profitability: '/profitability',
  cashflow: '/cashflow',
  advisory: '/advisory',
  reports: '/reports',
  payroll: '/payroll',
  tax: '/tax',
  comms: '/comms',
  firm: '/firm',
  integrations: '/integrations',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
