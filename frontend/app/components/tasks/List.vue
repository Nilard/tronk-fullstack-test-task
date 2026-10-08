<script setup lang="ts">
const { $api } = useNuxtApp()

const tasks = ref([])

const columns = [
  {
    header: 'Title',
    key: 'title',
  },
]

async function getTasks() {
  await $api('/tasks', {
    method: 'GET',
    onResponse ({ response }) {
      console.log(response._data.data)
      tasks.value = response._data.data
    },
  })
}

onMounted(async () => {
  await getTasks()
})
</script>
<template>
  <UTable :data="tasks" :columns="columns" />
</template>
