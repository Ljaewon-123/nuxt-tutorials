<template>
  <NuxtRouteAnnouncer>
    <template #default="{ message }">
      <p>{{ message }} was loaded.</p>
    </template>
  </NuxtRouteAnnouncer>
  <NuxtLayout >
    <NuxtPage />
  </NuxtLayout>
  <!-- <button @click="dynamicLayout">Change lay0ut</button> -->
</template>

<script setup lang="ts">

// const layout = 'another'
// nuxtLayout에 :name추가하면 레이아웃 전역으로 사용

// ***************
// 처음만 서버를 통할 뿐이지 그 이후에는 CSR로 동작 일단은 말이다.
// ***************

</script>

<style>

</style>