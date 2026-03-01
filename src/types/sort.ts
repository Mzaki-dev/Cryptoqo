export interface SortConfig {
  key: keyof import('./coin').Coin | null
  direction: 'asc' | 'desc'
}
