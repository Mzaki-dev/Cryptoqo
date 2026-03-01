import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Coin, SortConfig } from '../../types'
import { formatPrice, formatMarketCap, formatPercentage, getChangeColor } from '../../utils/helpers'

interface DataTableProps {
  coins: Coin[]
}

export default function DataTable({ coins }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  })

  // only allow sorting on certain keys
  const handleSort = (key: keyof Coin) => {
    if (key !== 'name' && key !== 'currentPrice') return
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedCoins = [...coins].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1

    if (typeof aValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue)
    }

    return sortConfig.direction === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
  })

  const SortIcon = ({ columnKey }: { columnKey: keyof Coin }) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4 opacity-50" />
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    )
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="w-12 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                #
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Name <SortIcon columnKey="name" />
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
                onClick={() => handleSort('currentPrice')}
              >
                <div className="flex items-center justify-end gap-2">
                  Price <SortIcon columnKey="currentPrice" />
                </div>
              </TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                24h Change
              </TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Market Cap
              </TableHead>
              <TableHead className="text-right text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Volume 24h
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCoins.map((coin, index) => (
              <TableRow key={coin.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full" />
                    <div>
                      <p className="font-medium">{coin.name}</p>
                      <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{formatPrice(coin.currentPrice)}</TableCell>
                <TableCell className={`text-right font-medium ${getChangeColor(coin.priceChangePercentage24h)}`}>
                  {formatPercentage(coin.priceChangePercentage24h)}
                </TableCell>
                <TableCell className="text-right">{formatMarketCap(coin.marketCap)}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatMarketCap(coin.totalVolume)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
