<template>
  <div>
    <NuxtRouteAnnouncer />

    <p>hi</p>
    <h1>{{ client }}</h1>

    <button @click="hitServer">req server</button>

    <p>Server</p>
    <h1>{{ server }}</h1>
    <!-- <NuxtWelcome /> -->
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { client } = runtimeConfig.public
const server = ref()
const hitServer = async() => {
  server.value = await $fetch('/api')
}
</script>