/**
 * Daily Target 组件的 props 类型
 */
export type TargetProps = {
  image?: string
  isLocked?: boolean
  isPlus?: boolean
  isShowDate?: boolean
  isToday?: boolean
  highestScore?: string
  isTransparent?: boolean
  month?: string
  day?: string
  id?: string
  colors?: string[]
}

export type TargetScore = {
  id: string
  lastScore: string
  highScore: string
}
