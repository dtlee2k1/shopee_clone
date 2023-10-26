import { User } from 'src/types/user.type'

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const localStorageEvent = new EventTarget()

export const clearLS = () => {
  localStorage.clear()
  // when clearLS func is invoked localStorageEvent will send a new event called `clearLS`
  const clearLSEvent = new Event('clearLS')
  localStorageEvent.dispatchEvent(clearLSEvent)
}
