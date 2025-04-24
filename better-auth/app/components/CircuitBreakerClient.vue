<template>
  <UCard>
    <div class="space-y-4">
      <UButton @click="callApi" :loading="loading">API 요청</UButton>
      <div class="text-gray-700">
        {{ result }}
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { $breaker } = useNuxtApp()
const result = ref('')
const loading = ref(false)

const callApi = async () => {
  loading.value = true
  result.value = ''

  const breaker = $breaker('hello-api', () => $fetch('/api/hello'))

  breaker.fallback(() => ({ message: 'Fallback: API unavailable' }))

  try {
    const res = await breaker.fire()
    result.value = res.message
  } catch (err: any) {
    result.value = `에러: ${err.message || 'unknown'}`
  } finally {
    loading.value = false
  }
}
</script>
