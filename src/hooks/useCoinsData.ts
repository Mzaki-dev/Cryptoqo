import { useQuery } from '@tanstack/react-query'
import { fetchCoinsData } from '../services/coinGeckoService'
import { Coin } from '../types'

interface UseCoinsDataOptions {
  page?: number
  perPage?: number
  order?: string
}

export function useCoinsData({
  page = 1,
  perPage = 20,
  order = 'market_cap_desc',
}: UseCoinsDataOptions = {}) {
  return useQuery<Coin[], Error>({
    queryKey: ['coins', { page, perPage, order }],
    queryFn: () => fetchCoinsData(page, perPage, order),
  })
}
