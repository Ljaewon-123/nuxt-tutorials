<template>
  <div>
    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      Please check you Email to confrim your registiration
    </h1>
    <h2>
      route: {{ route.query.token }}
    </h2>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['verify-magic-link']
})
const route = useRoute()
const token = computed(() => route.query.token as string | undefined)

const veridateLink = async() => {
  await $fetch(`/auth/magic-link/${token.value}`)
}

watchEffect(() => {
  if (token.value) {
    console.log('Magic link token:', token.value)

    veridateLink()
  }
})
</script>