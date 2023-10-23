import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'email' | 'updatedAt' | 'createdAt'> {
  password?: string
  newPassword?: string
}

export async function getProfile() {
  const response = await http.get<SuccessResponse<User>>('/me')
  return response
}

export async function updateProfile(body: BodyUpdateProfile) {
  const response = await http.put<SuccessResponse<User>>('/user', body)
  return response
}

export async function uploadAvatar(body: FormData) {
  const response = await http.post<SuccessResponse<string>>('/user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}
