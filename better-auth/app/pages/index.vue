<script setup lang="ts">
// 하이드레이트시 meta 즉 초기설정 
definePageMeta({
  middleware: 'auth'
  // auth: {
  //   requiresAuth: true,
  // }
})
const { authClient } = useAuth()
const session = authClient.useSession()

const getsession = await authClient.getSession()
// console.log(session) // hydrate error

const { data: sessionAsync } = await authClient.useSession(useFetch);
// console.log(sessionAsync, '? 서버측 전송')

const loading = ref(false)
const allApi = async () => {
  return await $fetch('/api/external')
}
const callApi = async () => {
  loading.value = true
  const data = await allApi()
  console.log(data)
  loading.value = false
}
</script>

<template>
    <UCard>
        {{ session }}
        {{ typeof session }}
    </UCard>
    <br>
    <UCard>
        <p>Get Session</p>
        {{ getsession }}
        {{ typeof getsession }}
    </UCard>
    <br>
    <UCard>
      <span>
        sessionAsync:
      </span>
      {{ sessionAsync }}
    </UCard>
    <UButton @click="callApi" :loading="loading">외부 API 요청</UButton>
</template>