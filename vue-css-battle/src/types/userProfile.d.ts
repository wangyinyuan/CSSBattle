import type { TargetScore } from '@/types/target'

export type UserProfile = {
  token?: string
  id?: string
  name?: string
  avatar?: string
  bio?: string
  isPlus?: boolean
}

export type UserGameInfo = {
  id?: string
  name?: string
  avatar?: string
  totalScore?: number
  totalTarget?: number
  rank?: number
}
