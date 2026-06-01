import type { RouteObject } from 'react-router-dom'

import { AppShell } from '@/layouts/AppShell'
import { AdvisorDashboard } from '@/pages/AdvisorDashboard'
import { AdvisoryRecommendations } from '@/pages/AdvisoryRecommendations'
import { ClientWorkspace } from '@/pages/ClientWorkspace'
import { AutoReporting } from '@/pages/AutoReporting'
import { CashflowRisk } from '@/pages/CashflowRisk'
import { ClientComms } from '@/pages/ClientComms'
import { ClientPortfolio } from '@/pages/ClientPortfolio'
import { FirmOperations } from '@/pages/FirmOperations'
import { Integrations } from '@/pages/Integrations'
import { PayrollExpense } from '@/pages/PayrollExpense'
import { ProfitabilityLeaks } from '@/pages/ProfitabilityLeaks'
import { TaxRisk } from '@/pages/TaxRisk'
import { ROUTES } from './paths'

export const routes: RouteObject[] = [
  {
    path: ROUTES.root,
    element: <AppShell />,
    children: [
      { index: true, element: <AdvisorDashboard /> },
      { path: ROUTES.clients.slice(1), element: <ClientPortfolio /> },
      { path: 'client/:slug', element: <ClientWorkspace /> },
      { path: ROUTES.profitability.slice(1), element: <ProfitabilityLeaks /> },
      { path: ROUTES.cashflow.slice(1), element: <CashflowRisk /> },
      { path: ROUTES.advisory.slice(1), element: <AdvisoryRecommendations /> },
      { path: ROUTES.reports.slice(1), element: <AutoReporting /> },
      { path: ROUTES.payroll.slice(1), element: <PayrollExpense /> },
      { path: ROUTES.tax.slice(1), element: <TaxRisk /> },
      { path: ROUTES.comms.slice(1), element: <ClientComms /> },
      { path: ROUTES.firm.slice(1), element: <FirmOperations /> },
      { path: ROUTES.integrations.slice(1), element: <Integrations /> },
    ],
  },
]
