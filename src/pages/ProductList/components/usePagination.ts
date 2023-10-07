import { useSearchParams } from 'react-router-dom'

export function usePagination(pageSize: number) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const prevPage = () => {
    const prev = currPage === 1 ? currPage : currPage - 1
    searchParams.set('page', String(prev))
    setSearchParams(searchParams)
  }

  const nextPage = () => {
    const next = currPage === pageSize ? currPage : currPage + 1
    searchParams.set('page', String(next))
    setSearchParams(searchParams)
  }

  return { currPage, prevPage, nextPage, searchParams, setSearchParams }
}
