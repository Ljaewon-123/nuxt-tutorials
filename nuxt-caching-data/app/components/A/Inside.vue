<script setup lang="ts">
const { data: users } = useNuxtData('users')
</script>

<template>
  <div>
    <p>I'm inside compoents </p>
    <p>using useNuxtDate cache function</p>
    {{ users }}
  </div>
</template>