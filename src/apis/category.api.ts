import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export async function getCategories() {
  const response = await http.get<SuccessResponse<Category[]>>('/categories')
  return response
}
