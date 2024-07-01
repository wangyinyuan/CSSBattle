import type { UserProfile } from '@/types/userProfile';
import { request } from '@/utils/http';

export const loginAPI = ({ username, password }: { username: string; password: string }) => {
  return request<UserProfile>({
    url: '/user/login',
    method: 'POST',
    data: {
      username,
      password
    }
  });
};
