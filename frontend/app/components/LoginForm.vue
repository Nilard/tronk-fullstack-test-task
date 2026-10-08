<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const { $api } = useNuxtApp()

const state = reactive({
  email: undefined,
  password: undefined,
})

const togglePassword = ref(false)

type Schema = typeof state

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // const { $api } = useNuxtApp()
  await $api('/auth/login', {
    method: 'POST',
    body: event.data,
    onResponse ({ response }) {
      authStore.setToken(response._data.access_token)
    },
  })
}
</script>

<template>
  <UForm :state="state" @submit="onSubmit" class="space-y-4 max-w-80 m-auto">
    <UFormField :label="$t('Email')" orientation="horizontal">
      <UInput
        v-model="state.email"
        type="email"
        autocomplete="on"
        placeholder=" "
        required
        class="w-60"
      />
    </UFormField>

    <UFormField :label="$t('Password')" orientation="horizontal">
      <UInput
        v-model="state.password"
        :type="togglePassword ? 'text' : 'password'"
        autocomplete="on"
        :ui="{ trailing: 'pe-1' }"
        placeholder=" "
        required
        class="w-60"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="togglePassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="togglePassword ? 'Hide password' : 'Show password'"
            :aria-pressed="togglePassword"
            aria-controls="password"
            @click="togglePassword = !togglePassword"
          />
        </template>
      </UInput>
    </UFormField>

    <UButton type="submit" block>{{ $t('Login') }}</UButton>
  </UForm>
</template>
