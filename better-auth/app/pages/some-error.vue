<template>
  <h1>
    Occure some error
  </h1>
  <UButton @click="callApi">API 요청</UButton>
  <pre>{{ result?.data.message }}</pre> ???
  <pre>{{ result }}</pre>
  <!-- <UButton @click="execute()">Composable API 요청</UButton>
  <pre>{{ error?.data.message }}</pre> ???
  <pre>{{ error }}</pre> -->
</template>

<script setup lang="ts">
const result = ref()
const callApi = async() => {
  try {
    result.value = await $fetch('/api/test/:createError')
  } catch (error) {
    result.value = error
  }
}

// 맨날 햇갈리네
// const callComposableApi = async() => {
//   await $fetch('/api/test/:createError')
// }
// const { execute, error } = await useAsyncData('test', callComposableApi, {
//   // immediate: false,
//   // server: false
// })

</script> 