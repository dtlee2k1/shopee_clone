import { useQuery } from '@tanstack/react-query'
import { getCategories } from 'src/apis/category.api'

export function useCategories() {
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  return { categoriesData }
}
