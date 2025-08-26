<template>
  <div>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
const data = ref()
onMounted(() => {
  const eventSource = new EventSource('http://localhost:3000/api/event-stream/hi')
  eventSource.onmessage = (event) => {
    console.log(event.data)
    data.value = data
  }
})
</script>