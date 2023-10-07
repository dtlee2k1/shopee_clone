import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProduct } from 'src/apis/product.api'
import { Product } from 'src/types/product.type'

export function useProduct() {
  const { id } = useParams()
  const { data: ProductDetailData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as string)
  })

  const product = ProductDetailData?.data.data as Product

  return { product, isLoading }
}
