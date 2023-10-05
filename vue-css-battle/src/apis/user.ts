import { request } from '@/utils/http'
import type { UserProfile } from '@/types/userProfile'

export const loginAPI = ({ account, password }: { account: string; password: string }) => {
  return request<UserProfile>({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}
