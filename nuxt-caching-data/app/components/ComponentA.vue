<script setup lang="ts">
const id = useState('key', () => 1)
const fetchUser = async(id: number) => {
  return await $fetch(`/api/get-user/${id}`)
}

// 이제 key도 computed랑 getter가능 
const { data: users, status, execute, error } = await useAsyncData('users', () => fetchUser(id.value))
// const { data: users, status, execute } = await useLazyAsyncData('users', () => fetchUser(id.value), {
//   immediate: false
// })
</script>

<template>
  <div>
    <p>Current ID: {{ id }}</p>
    <button @click="id++, execute()">plus id</button>
    <p>Statue</p>
    {{ status }}
    <p>User</p>
    {{ users }}
    {{ parseErrorData(error)?.message }}
  </div>
</template>
