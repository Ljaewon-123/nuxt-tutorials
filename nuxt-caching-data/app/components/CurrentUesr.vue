<script setup lang="ts">
// user에 대한 패칭이 여기있으면 괜찮은데 만약 없다면??  이건 예시이긴 한데 그럴수있음
const { data: users } = useNuxtData('users')
// useNuxtData하위 구성요소에서 사용하기에 적합하다... 해결이 안되네

const comeToUserData = computed(() => {
  if(users.value) return true
  return false
})

defineExpose({
  isReady: comeToUserData
})
</script>

<template>
  <div >
    {{ users }}
  </div>
</template>