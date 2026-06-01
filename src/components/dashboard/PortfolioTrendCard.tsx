import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { portfolioTrend } from '@/data/dashboard'

export function PortfolioTrendCard() {
  return (
    <section className="rounded-lg border border-hairline bg-card p-5 shadow-card-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="eyebrow">Trailing 7 months</p>
          <h3 className="mt-1 text-[15px] font-semibold tracking-tight-bank text-ink">
            Portfolio health index
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[22px] font-semibold text-ink tabular leading-none">74</p>
          <p className="mt-1 text-[11px] text-signal-warning tabular">−5 since Dec</p>
        </div>
      </div>

      <div className="mt-4 h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={portfolioTrend} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="healthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0E2C4A" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#0E2C4A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E4E9EF" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#8A93A2', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[70, 82]}
              tick={{ fill: '#8A93A2', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip
              cursor={{ stroke: '#D2D9E1', strokeDasharray: '3 3' }}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: '1px solid #E4E9EF',
                boxShadow: '0 4px 12px rgba(11,18,32,0.06)',
              }}
              labelStyle={{ color: '#0B1220', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="health"
              stroke="#0E2C4A"
              strokeWidth={2}
              fill="url(#healthFill)"
              dot={{ fill: '#0E2C4A', r: 2.5, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
              name="Health index"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[11px] text-ink-subtle">
        Composite of profitability, cash-flow stability, expense efficiency, revenue consistency,
        and tax risk · weighted by ARR.
      </p>
    </section>
  )
}
