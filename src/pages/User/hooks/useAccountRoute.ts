import { useMatch } from 'react-router-dom'

export default function useAccountRoute() {
  const profileMatch = useMatch('user/account/profile')
  const passwordMatch = useMatch('user/account/password')
  const isAccountRoute = Boolean(profileMatch || passwordMatch)
  return isAccountRoute
}
