<template>
  <div class="m-4">
    <UButton @click="callAutoCannon" class="mb-6">Load Test</UButton>
    <UCard>
      {{ answer }}
    </UCard>
  </div>
</template>

<script setup lang="ts">
const answer = ref()
const callAutoCannon = async() => {
  answer.value = await $fetch('/api/autocannon')
}
</script>