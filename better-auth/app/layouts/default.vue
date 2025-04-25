<script setup lang=ts>
const { loggedIn } = useAuth()
</script>

<template>
  <div>
    <nav class="m-4">
      <ul class="flex gap-4">
        <li v-if="loggedIn"><ULink to="/">Home</ULink></li>
        <li><ULink to="/sign-up-in">Sign Up / Sign In</ULink></li>
        <li><ULink to="/circuit-breaker">Circuit Breaker</ULink></li>
        <li><ULink to="/admin">Admin</ULink></li>
      </ul>
    </nav>
    <main>
      <slot/>
    </main>
  </div>
</template>