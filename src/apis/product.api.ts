import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export async function getProducts(params: ProductListConfig) {
  const response = await http.get<SuccessResponse<ProductList>>('/products', { params })
  return response
}

export async function getProduct(id: string) {
  const response = await http.get<SuccessResponse<Product>>(`/products/${id}`)
  return response
}
