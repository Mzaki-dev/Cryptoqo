import { useState, useEffect } from 'react'
import { useCoinsData } from '../../hooks/useCoinsData'
import { usePagination } from '../../hooks/usePagination'
import DataTable from './DataTable'
import DataChart from './DataChart'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from '../../components/common/Loader'
import { SearchIcon } from 'lucide-react'

export default function Dashboard() {
  const { page, perPage, setPerPage, nextPage, prevPage, reset } = usePagination({ initialPerPage: 10 })
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(searchTerm), 500)
    return () => clearTimeout(handle)
  }, [searchTerm])

  useEffect(() => {
    reset()
  }, [debouncedSearch, reset])

  useEffect(() => {
    reset()
  }, [perPage, reset])

  const {
    data: chartCoins,
    isLoading: chartLoading,
    error: chartError,
  } = useCoinsData({ page: 1, perPage: 10 })

  const {
    data: tableCoins,
    isLoading: tableLoading,
    error: tableError,
    refetch,
  } = useCoinsData({ page, perPage, search: debouncedSearch })

  const filteredCoins = tableCoins || []
  // overall error is either chart or table
  const error = chartError || tableError


  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Cryptocurrency Dashboard</h1>
            <p className="text-muted-foreground">Track and analyze cryptocurrency market data in real-time</p>
          </div>


          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg flex items-center justify-between">
              <span className="text-sm">Failed to load cryptocurrency data. Please try again.</span>
              <Button size="sm" variant="ghost" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {/* Chart Section */}
          {!chartLoading && !chartError && chartCoins && chartCoins.length > 0 && (
            <DataChart coins={chartCoins} />
          )}

          {/* Table Section */}
          {/* Search, limit controls below charts */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 w-full sm:max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search coins by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-8 pl-10"
              />
            </div>
            <div>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="border-input rounded-md bg-background px-4 py-2 text-base"
              >
                {[5, 10, 15, 20, 30].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            {tableLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader />
              </div>
            ) : tableError ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Failed to load data</p>
              </div>
            ) : filteredCoins.length > 0 ? (
              <>
                <DataTable coins={filteredCoins} />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredCoins.length} cryptocurrencies
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
