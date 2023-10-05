import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const httpInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

httpInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    ElMessage({
      type: 'warning',
      message: error.response.data.message
    })
    return Promise.reject(error)
  }
)

export function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return httpInstance(config) as Promise<T>
}
