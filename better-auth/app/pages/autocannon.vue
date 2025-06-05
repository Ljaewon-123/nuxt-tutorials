<template>
  <div class="m-4">
    <UButton @click="callAutoCannon" :loading="loading" class="mb-6">Load Test</UButton>
    <UCard>
      {{ answer }}
    </UCard>
    <div class="flex gap-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
        <span class="h-2 w-2 rounded-full bg-red-500"></span>
        totalCompletedRequests {{ answer?.totalCompletedRequests }}
      </div>
      <div class="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
        <span class="h-2 w-2 rounded-full bg-red-500"></span>
        totalRequests {{ answer?.totalRequests }}
      </div>
      <div class="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
        <span class="h-2 w-2 rounded-full bg-red-500"></span>
        Error {{ answer?.errors }}
      </div>
      <div v-for="status, code in answer?.statusCodeStats" class="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
        <span class="h-2 w-2 rounded-full bg-red-500"></span>
        {{ code }} {{ status.count }}
      </div>
    </div>
    <UCard>
      <div class="mt-6 p-4 border rounded">
        <h2 class="text-lg font-bold">합산 통계</h2>
        <ul class="list-disc pl-5 mt-2">
          <li>평균 지연 시간: {{ summary.totalAverageLatency }} ms</li>
          <li>초당 요청 수: {{ summary.totalRequestsPerSecond }} req/s</li>
          <li>초당 전송량: {{ summary.totalThroughputPerSecond }} bytes/s</li>
          <li>요청당 데이터 양: {{ summary.estimatedDataPerRequest }} bytes</li>
          <li>10초 동안 전송량: {{ summary.totalVolumeOver10s }} bytes</li>
        </ul>
      </div>
    </UCard>
    <UCard>
      <div class="p-4 space-y-6">
        <h1 class="text-2xl font-bold">Autocannon Stats</h1>

        <div v-for="(stats, label) in parsed" :key="label">
          <h2 class="text-xl font-semibold capitalize">{{ label }}</h2>
          <table class="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th class="border p-2">Metric</th>
                <th class="border p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key) in stats" :key="key">
                <td class="border p-2">{{ key }}</td>
                <td class="border p-2">{{ value.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">

const loading = ref(false)
const answer = ref()
const parsed = ref(Object.create(null))
const summary = ref(Object.create(null))
const callAutoCannon = async() => {
  try{
    loading.value = true
    const result = JSON.parse(await $fetch('/api/autocannon')) as any
    answer.value = result
    const raw = {
      latencies: result['latencies'],
      requests: result.requests,
      throughput: result.throughput,
    }

    parsed.value = parseAutocannonHistograms(raw)
    console.log(parsed.value.latencies)
    summary.value = calculateSummaryStats(parsed.value.latencies, parsed.value.requests, parsed.value.throughput)
  }
  finally{
    loading.value = false
  }
}
</script>