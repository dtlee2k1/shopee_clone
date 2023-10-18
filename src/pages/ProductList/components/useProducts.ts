import { useQuery } from '@tanstack/react-query'
import { getProducts } from 'src/apis/product.api'
import useQueryConfigs from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

export function useProducts() {
  const queryConfig = useQueryConfigs()

  //QUERY
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true
  })

  return { productsData, queryConfig, isLoading }
}
