import { fetchApi } from './apiClient'
import { Coin } from '../types'

interface CoinGeckoResponse {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  ath: number
  atl: number
}

export async function fetchCoinsData(
  page: number = 1,
  perPage: number = 20,
  order: string = 'market_cap_desc'
): Promise<Coin[]> {
  const endpoint = `/coins/markets?vs_currency=usd&order=${order}&per_page=${perPage}&page=${page}&sparkline=false`
  
  const data = await fetchApi<CoinGeckoResponse[]>(endpoint)
  
  return data.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    image: coin.image,
    currentPrice: coin.current_price,
    marketCap: coin.market_cap,
    marketCapRank: coin.market_cap_rank,
    totalVolume: coin.total_volume,
    high24h: coin.high_24h,
    low24h: coin.low_24h,
    priceChangePercentage24h: coin.price_change_percentage_24h,
    circulatingSupply: coin.circulating_supply,
    totalSupply: coin.total_supply,
    ath: coin.ath,
    atl: coin.atl,
  }))
}

export async function searchCoins(query: string): Promise<Coin[]> {
  if (!query.trim()) {
    return []
  }

  try {
    const endpoint = `/search?query=${encodeURIComponent(query)}`
    const data = await fetchApi<{ coins: any[] }>(endpoint)
    
    if (!data.coins) {
      return []
    }

    // Get detailed data for first 5 results
    const coinIds = data.coins.slice(0, 5).map((c) => c.id).join(',')
    return fetchCoinsData(1, 5)
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}
