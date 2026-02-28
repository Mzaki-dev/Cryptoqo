import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'
import { Coin } from '../../types'

interface DataChartProps {
  coins: Coin[]
}

export default function DataChart({ coins }: DataChartProps) {
  // Prepare data for chart - take top 10 coins by market cap
  const topCoins = coins.slice(0, 10)

  const priceData = topCoins.map((coin) => ({
    name: coin.symbol,
    price: coin.currentPrice,
    fullName: coin.name,
  }))

  const marketCapData = topCoins.map((coin) => ({
    name: coin.symbol,
    marketCap: coin.marketCap ? coin.marketCap / 1e9 : 0, // Convert to billions
    fullName: coin.name,
  }))

  const percentageData = topCoins.map((coin) => ({
    name: coin.symbol,
    change: coin.priceChangePercentage24h || 0,
    fullName: coin.name,
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="font-medium">{payload[0].payload.fullName}</p>
          <p className="text-sm text-primary">
            {payload[0].name}: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Price Chart */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Top 10 Cryptocurrencies by Price</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="price" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Market Cap Chart */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Market Cap (Billions USD)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={marketCapData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="marketCap"
              stroke="var(--color-primary)"
              dot={{ fill: 'var(--color-primary)', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* 24h Change Chart */}
      <Card className="p-6 lg:col-span-2">
        <h3 className="font-semibold mb-4">24h Price Change Percentage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={percentageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="change"
              fill="var(--color-primary)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
