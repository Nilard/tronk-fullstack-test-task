<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
</script>
<template>
  <UApp>
    <UHeader title="To-Do List">
      <template #right>
        <!-- <UColorModeButton /> -->
        <UButton v-if="authStore.isAuthenticated" @click="authStore.removeToken()">{{ $t('Logout') }}</UButton>
      </template>
    </UHeader>

    <UMain class="py-4 sm:py-8">
      <UContainer class="flex flex-col h-full">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </UContainer>
    </UMain>

    <UFooter class="border-t border-default">
      <template #left>
        <p class="text-muted text-sm">© {{ new Date().getFullYear() }} TRONK</p>
      </template>
    </UFooter>
  </UApp>
</template>
