import { useAuthStore } from "~/stores/auth"

// const authStore = useAuthStore()

export const useAPI = createUseFetch({
  baseURL: 'http://localhost:8000/api',
  lazy: true,
  dedupe: 'defer',
  onRequest ({ options }) {
    const token = useAuthStore().token
    if (token) {
      options.headers.set('Authorization', `Bearer ${token}`)
    }
  },
  async onResponseError ({ response, options }) {
    if (response.status === 401) {
      const token = useAuthStore().token
      if (token) {
        options.headers.set('Authorization', `Bearer ${token}`)
      }
      const { data } = await useAPI('/auth/refresh', {
        method: 'POST',
        onRequest ({ options }) {
          options.headers.set('Authorization', `Bearer ${token}`)
        },
        onResponse ({ response }) {
          useAuthStore().setToken(response._data.access_token)
        },
        onResponseError () {
          useAuthStore().removeToken()
        },
      })
    }
  },
})
