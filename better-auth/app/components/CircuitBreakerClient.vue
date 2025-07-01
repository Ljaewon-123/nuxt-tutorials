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
      <div>
        <p>Error object</p>
        <pre>
          {{ errobj?.data }}
        </pre>
      </div>

      <div>
        <p>Server Fetch?</p>
        {{ data }} // {{ error }}
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useCircuitBreaker } from '~/composables/useCircuitFetch'

const { $breaker, $callWithBreaker } = useNuxtApp()
const result = ref('')
const loading = ref(false)
const status = ref()
const errobj = ref()

// 되긴하네...?
const { data, error } = await useAsyncData('breaker-fetch', async () => {
  return $callWithBreaker('hello-api', async () => $fetch('/api/circuit/hello'))
  // return $fetch('/api/circuit/hello')
})

// 방법 1: 가장 간단한 사용법 
const callApi = async () => {
  loading.value = true
  result.value = ''

  try {
    const res = await $callWithBreaker('hello-api', async () => $fetch('/api/circuit/hello'))
    result.value = res.message
  } catch (err: any) {
    errobj.value = err
    result.value = `에러: ${err.message || 'unknown'}`
  } finally {
    loading.value = false
  }
}

// 방법 2: 상태 정보도 필요한 경우
const callApiWithStatus = async () => {
  loading.value = true
  result.value = ''

  const breakerWrapper = $breaker('hello-api', async () => $fetch('/api/circuit/hello'))
  status.value = breakerWrapper.breaker // 상태 확인용

  try {
    const res = await breakerWrapper.execute()
    result.value = res.message
  } catch (err: any) {
    errobj.value = err
    result.value = `에러: ${err.message || 'unknown'}`
  } finally {
    loading.value = false
  }
}
</script>


<!-- https://nodeshift.dev/opossum/#circuitbreaker -->