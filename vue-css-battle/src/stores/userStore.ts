import { loginAPI } from '@/apis/user'
import type { UserProfile } from '@/types/userProfile'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserProfile>({})
    const getUserInfo = async ({ username, password }: { username: string; password: string }) => {
      const res = await loginAPI({ username, password })
      userInfo.value = res
    }

    //清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
    }
    return { userInfo, getUserInfo, clearUserInfo }
  },
  { persist: true }
)
