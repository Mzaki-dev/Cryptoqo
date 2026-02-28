import { useState } from 'react'

interface UsePaginationOptions {
  initialPage?: number
  perPage?: number
}

export function usePagination({
  initialPage = 1,
  perPage = 20,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage)

  const goToPage = (newPage: number) => {
    setPage(Math.max(1, newPage))
  }

  const nextPage = () => setPage((p) => p + 1)
  const prevPage = () => setPage((p) => Math.max(1, p - 1))
  const reset = () => setPage(initialPage)

  return {
    page,
    perPage,
    goToPage,
    nextPage,
    prevPage,
    reset,
  }
}
