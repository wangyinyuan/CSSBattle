import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // 从localStorage读取主题或默认为dark
  const storedTheme = localStorage.getItem('user-theme')
  const theme = ref(storedTheme || 'dark')
  const isDark = computed(() => theme.value === 'dark')

  function setThemeOnRoot(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme)
  }

  function toggleTheme(): void {
    theme.value = isDark.value ? 'light' : 'dark'
    // 保存主题设置到localStorage
    localStorage.setItem('user-theme', theme.value)
    setThemeOnRoot(theme.value)
  }

  return { theme, isDark, toggleTheme, setThemeOnRoot }
})
