<template>
  <UCard>
    <div class="space-y-4">
      <UButton @click="callApi" :loading="loading">API 요청</UButton>
      <div class="text-white-700">
        {{ result }}
      </div>
      <div>
        {{ status }}
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { $breaker } = useNuxtApp()
const result = ref('')
const loading = ref(false)
const status = ref()

const callApi = async () => {
  loading.value = true
  result.value = ''

  const breaker = $breaker('hello-api', () => $fetch('/api/circuit/hello'))
  status.value = breaker

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


<!-- https://nodeshift.dev/opossum/#circuitbreaker -->