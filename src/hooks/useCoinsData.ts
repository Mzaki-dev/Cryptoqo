import { useQuery } from '@tanstack/react-query'
import { CoinGecko } from '../services/coinGeckoService'
import { Coin } from '../types/coin'

interface UseCoinsDataOptions {
  page?: number
  perPage?: number
  order?: string
  search?: string
}

export function useCoinsData({
  page = 1,
  perPage = 20,
  order = 'market_cap_desc',
  search = '',
}: UseCoinsDataOptions = {}) {
  const { getList: data, search: searchFn } = CoinGecko()

  const queryKey = search.trim()
    ? ['coins', { search }]
    : ['coins', { page, perPage, order }]

  const queryFn = () => {
    if (search.trim()) {
      return searchFn(search)
    }
    return data(page, perPage, order)
  }

  return useQuery<Coin[], Error>({
    queryKey,
    queryFn,
  })
}
