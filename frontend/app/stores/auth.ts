// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // Связываем состояние с куками
  // const token = useCookie('auth_token', {
  //   maxAge: 60 * 60 * 24 * 7, // 7 дней
  //   watch: true,             // следить за изменениями
  // })

  const token = ref(null)
  const user = ref(null)

  // Геттер (вычисляемое свойство)
  const isAuthenticated = computed(() => !!token.value)

  // Действия (actions)
  function setToken(newToken: string) {
    token.value = newToken
  }

  function removeToken() {
    token.value = null
    user.value = null
  }

  return { token, user, isAuthenticated, setToken, removeToken }
})
