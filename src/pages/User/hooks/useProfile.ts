import { useQuery } from '@tanstack/react-query'
import { getProfile } from 'src/apis/user.api'

export function useProfile() {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  })

  const profile = profileData?.data.data

  return { profile, isLoading }
}
