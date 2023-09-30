import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  //默认主题为dark
  const theme = ref('dark')
  const isDark = computed(() => theme.value === 'dark')

  function setThemeOnRoot(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme)
  }

  function toggleTheme(): void {
    theme.value = isDark.value ? 'light' : 'dark'
    setThemeOnRoot(theme.value)
  }

  return { theme, isDark, toggleTheme, setThemeOnRoot }
})
