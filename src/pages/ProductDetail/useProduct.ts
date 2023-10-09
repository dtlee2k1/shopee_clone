import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProduct } from 'src/apis/product.api'
import { Product } from 'src/types/product.type'
import { getIdFromNameId } from 'src/utils/helpers'

export function useProduct() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: ProductDetailData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id)
  })

  const product = ProductDetailData?.data.data as Product

  return { product, isLoading }
}
