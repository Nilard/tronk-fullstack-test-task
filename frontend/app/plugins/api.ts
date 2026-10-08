import { useAuthStore } from "~/stores/auth"

async function refreshToken() {
  const authStore = useAuthStore()
  const { $api } = useNuxtApp()
  await $api('/auth/refresh', {
    method: 'POST',
    onRequest ({ options }) {
      options.headers.set('Authorization', `Bearer ${authStore.token}`)
    },
    onResponse ({ response }) {
      authStore.setToken(response._data.access_token)
    },
    onResponseError () {
      authStore.removeToken()
    },
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  const api = $fetch.create({
    baseURL: 'http://localhost:8000/api',
    onRequest ({ request, options, error }) {
      if (authStore.token) {
        options.headers.set('Authorization', `Bearer ${authStore.token}`)
      }
    },
    async onResponseError ({ response, options }) {
      if (response.status === 401) {
        const token = authStore.token
        if (token) {
          options.headers.set('Authorization', `Bearer ${token}`)
        }
        await refreshToken()
      }
      },
  })

  return {
    provide: {
      api,
    },
  }
})
