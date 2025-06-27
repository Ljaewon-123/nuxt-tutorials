<script setup lang="ts">
const msg = defineModel({ required:true })
</script>

<template>
  <input v-model="msg"/>
</template>