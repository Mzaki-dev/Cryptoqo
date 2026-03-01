import { useState } from 'react'

interface UsePaginationOptions {
  initialPage?: number
  initialPerPage?: number
}

export function usePagination({
  initialPage = 1,
  initialPerPage = 10,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage)
  const [perPage, setPerPage] = useState(initialPerPage)

  const goToPage = (newPage: number) => {
    setPage(Math.max(1, newPage))
  }

  const nextPage = () => setPage((p) => p + 1)
  const prevPage = () => setPage((p) => Math.max(1, p - 1))
  const reset = () => setPage(initialPage)

  return {
    page,
    perPage,
    setPerPage,
    goToPage,
    nextPage,
    prevPage,
    reset,
  }
}
