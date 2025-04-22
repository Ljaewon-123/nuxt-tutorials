<script setup lang="ts">
const session = authClient.useSession()
// console.log(session) // hydrate error

const { data: sessionAsync } = await authClient.useSession(useFetch);
console.log(sessionAsync, '?')
</script>

<template>
    <div>
        {{ session }}
    </div>
    <div>
      <span>
        sessionAsync:
      </span>
      {{ sessionAsync }}
    </div>
</template>