import { useState } from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Coin } from '../../types'

interface DataChartProps {
  coins: Coin[]
}

export default function DataChart({ coins }: DataChartProps) {
  const topCoins = coins.slice(0, 10)

  const priceData = topCoins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.currentPrice,
    fullName: coin.name,
  }))

  const marketCapData = topCoins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    marketCap: coin.marketCap ? coin.marketCap / 1e9 : 0,
    fullName: coin.name,
  }))

  const donutData = marketCapData.slice(0, 5)

  const percentageData = topCoins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    change: coin.priceChangePercentage24h || 0,
    fullName: coin.name,
  }))

  const COLORS = [
    '#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#0ea5e9', '#f43f5e', '#22c55e', '#6366f1', '#ea580c',
  ]

  const DONUT_COLORS = ['#4f6cf7', '#f5a623', '#30c5d2', '#ef4444', '#8b5cf6', '#0ea5e9', '#f43f5e', '#22c55e', '#6366f1', '#ea580c']

  const totalMarketCap = marketCapData.reduce((sum, d) => sum + d.marketCap, 0)

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
          <div className="relative bg-blue-500 dark:bg-blue-400 text-white px-3 py-2 rounded shadow">
          <p className="font-semibold text-sm">{payload[0].payload.fullName}</p>
          <p className="text-xs">
            {payload[0].name}: {typeof payload[0].value === 'number' ? payload[0].value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : payload[0].value}
          </p>
          <div className="absolute left-1/2 -bottom-1 w-3 h-3 bg-blue-500 transform -translate-x-1/2 rotate-45" />
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-card p-6 shadow-lg border border-border dark:border-border/50">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
            </div>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Top 10</span>
        </div>
        <p className="text-sm text-muted-foreground mb-0.5">Price Overview</p>
        <p className="text-3xl font-bold mb-4 text-foreground">
          ${topCoins[0]?.currentPrice?.toLocaleString() ?? '0'}
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={priceData} barCategoryGap="20%">
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
            <Bar
              dataKey="price"
              radius={[6, 6, 0, 0]}
              onMouseOver={(data, index) => setActiveIndex(index)}
              onMouseOut={() => setActiveIndex(null)}
            >
              {priceData.map((_, idx) => (
                <Cell
                  key={`cell-bar-${idx}`}
                  fill={idx === activeIndex ? '#1e40af' : '#3b82f6'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/30 p-6 shadow-lg shadow-rose-500/10 border border-rose-100 dark:border-rose-900/30">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-500/15 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>
            </div>
          </div>
          <span className="text-xs text-muted-foreground bg-rose-500/10 px-3 py-1 rounded-full">Market Cap</span>
        </div>
        <p className="text-sm text-muted-foreground mb-0.5">Total Market Cap</p>
        <p className="text-3xl font-bold text-foreground mb-4">
          ${totalMarketCap.toFixed(1)}B
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={marketCapData}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="marketCap"
              stroke="#f43f5e"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl overflow-hidden bg-card p-6 shadow-lg border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">24h Price Change</h3>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Percentage</span>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={percentageData}>
            <defs>
              <linearGradient id="colorChange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorChangeNeg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.5} vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="change"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fill="url(#colorChange)"
              activeDot={{ r: 5, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl overflow-hidden bg-card p-6 shadow-lg border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Market Share</h3>
        </div>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={donutData}
                dataKey="marketCap"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={3}
                cornerRadius={4}
                strokeWidth={0}
              >
                {donutData.map((_, idx) => (
                  <Cell key={`cell-pie-${idx}`} fill={DONUT_COLORS[idx % DONUT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
