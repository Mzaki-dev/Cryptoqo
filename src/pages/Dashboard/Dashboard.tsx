import { useState } from 'react'
import { useCoinsData } from '../../hooks/useCoinsData'
import { usePagination } from '../../hooks/usePagination'
import DataTable from './DataTable'
import DataChart from './DataChart'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from '../../components/common/Loader'
import { Coin } from '../../types'

export default function Dashboard() {
  const { page, perPage, nextPage, prevPage } = usePagination({ perPage: 20 })
  const { data: coins, isLoading, error, refetch } = useCoinsData({ page, perPage })
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleRefresh = () => {
    refetch()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Cryptocurrency Dashboard</h1>
            <p className="text-muted-foreground">Track and analyze cryptocurrency market data in real-time</p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={handleRefresh} variant="outline" className="w-full sm:w-auto">
              Refresh
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg flex items-center justify-between">
              <span className="text-sm">Failed to load cryptocurrency data. Please try again.</span>
              <Button size="sm" variant="ghost" onClick={handleRefresh}>
                Retry
              </Button>
            </div>
          )}

          {/* Chart Section */}
          {!isLoading && !error && coins && coins.length > 0 && <DataChart coins={coins} />}

          {/* Table Section */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Failed to load data</p>
              </div>
            ) : filteredCoins.length > 0 ? (
              <>
                <DataTable coins={filteredCoins} />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredCoins.length} of {coins.length} cryptocurrencies
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={prevPage} variant="outline" disabled={page === 1}>
                      Previous
                    </Button>
                    <Button onClick={nextPage} variant="outline">
                      Next
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No cryptocurrencies found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
