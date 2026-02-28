const API_BASE_URL = 'https://api.coingecko.com/api/v3'

export interface ApiResponse<T> {
  data: T
  error?: string
}

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error)
    throw error
  }
}
