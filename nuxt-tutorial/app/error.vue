<template>
  <NuxtLayout>
    <section>
      <h1 class="text-4xl mb-4">
        Opps {{ error?.statusCode }}
      </h1>

      <h2 class="text-xl text-gray-500 dark:text-gray-400">
        {{ error?.statusMessage }}
      </h2>
      <h3>
        {{ error?.message }}
      </h3>
    </section>
    <button @click="handleErr">back to home</button>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps({ error: Object })


const handleErr = () => {
  clearError({
    redirect: '/'
  })
}

</script>