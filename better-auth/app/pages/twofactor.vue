<template>
  <div>
    <h1>2FA</h1>
    {{ data }}
    <span>??</span>
  </div>
</template>

<script setup lang="ts">
const auth = authClient


const { data } = await auth.twoFactor.enable({
  password: "password", // user password required
});
</script>