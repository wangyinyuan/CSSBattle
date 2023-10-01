/**
 * Daily Target 组件的 props 类型
 */
export type TargetProps = {
  image?: string
  isAvailable?: boolean
  isLocked?: boolean
  isPlus?: boolean
  isShowDate?: boolean
  isToday?: boolean
  highestScore?: string
  month?: string
  day?: string
}
