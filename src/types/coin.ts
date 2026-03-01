export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  currentPrice: number
  marketCap: number | null
  marketCapRank: number | null
  totalVolume: number | null
  high24h: number
  low24h: number
  priceChangePercentage24h: number | null
  circulatingSupply: number
  totalSupply: number | null
  ath: number
  atl: number
}
