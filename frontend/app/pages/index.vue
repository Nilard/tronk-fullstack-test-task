<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
// const isAuthenticated = useAuthStore().isAuthenticated
// const token = useAuthStore().token
</script>

<template>
  <LoginForm v-if="!authStore.isAuthenticated" />
  <TasksList v-else-if="authStore.isAuthenticated" />
</template>
