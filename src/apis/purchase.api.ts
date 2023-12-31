import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export async function addToCart(body: { product_id: string; buy_count: number }) {
  const response = await http.post<SuccessResponse<Purchase>>('/purchases/add-to-cart', body)
  return response
}

export async function getPurchases(params: { status: PurchaseListStatus }) {
  const response = await http.get<SuccessResponse<Purchase[]>>('/purchases', { params })
  return response
}

export async function buyPurchases(body: { product_id: string; buy_count: number }[]) {
  const response = await http.post<SuccessResponse<Purchase[]>>('/purchases/buy-products', body)
  return response
}

export async function updatePurchase(body: { product_id: string; buy_count: number }) {
  const response = await http.put<SuccessResponse<Purchase>>('/purchases/update-purchase', body)
  return response
}

export async function deletePurchases(purchaseIds: string[]) {
  const response = await http.delete<SuccessResponse<{ deleted_count: number }>>('/purchases', { data: purchaseIds })
  return response
}
