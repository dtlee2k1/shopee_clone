import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export async function registerAccount(body: { email: string; password: string }) {
  const response = await http.post<AuthResponse>('/register', body)
  return response
}
