<script setup lang="ts">
const session = authClient.useSession()
// console.log(session) // hydrate error

const { data: sessionAsync } = await authClient.useSession(useFetch);
// console.log(sessionAsync, '? 서버측 전송')
</script>

<template>
    <UCard>
        {{ session }}
    </UCard>
    <br>
    <UCard>
      <span>
        sessionAsync:
      </span>
      {{ sessionAsync }}
    </UCard>
</template>