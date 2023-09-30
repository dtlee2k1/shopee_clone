import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export async function register(body: { email: string; password: string }) {
  const response = await http.post<AuthResponse>('/register', body)
  return response
}

export async function login(body: { email: string; password: string }) {
  const response = await http.post<AuthResponse>('/login', body)
  return response
}

export async function logout() {
  await http.post('/logout')
}
