import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import { getProducts } from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export function useProductList() {
  const queryParams = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      order: queryParams.order,
      sort_by: queryParams.sort_by || 'createdAt',
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )

  //QUERY
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true
  })

  return { data, queryConfig }
}
