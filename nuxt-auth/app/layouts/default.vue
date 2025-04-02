<template>
  <div>
    <Drawer v-model:visible="visible" header="Drawer">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <NuxtLink to="/">Main</NuxtLink>
      <NuxtLink to="users">Users</NuxtLink>
      <NuxtLink to="magic-url">Magic-URL</NuxtLink>
    </Drawer>
    <Button icon="pi pi-arrow-right" @click="visible = true" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const visible = useState(() => false)
</script>