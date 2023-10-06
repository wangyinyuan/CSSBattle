import { request } from '@/utils/http'
import type { UserProfile } from '@/types/userProfile'

export const loginAPI = ({ username, password }: { username: string; password: string }) => {
  return request<UserProfile>({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
