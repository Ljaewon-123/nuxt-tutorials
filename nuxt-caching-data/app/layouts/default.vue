<template>
  <div>
    <p>This layout</p>
    <LazyCurrentUesr ref="user" :hydrate-after="20"/>
    <nav>
      <NuxtLink to="/">main</NuxtLink>
      <NuxtLink to="sse">sse</NuxtLink>
      <NuxtLink to="new-path-component">new-path-component</NuxtLink>
    </nav>
    <hr>
    <main>
      <slot/>
    </main>
  </div>
</template>

<script setup lang="ts">
// const user = useTemplateRef('user')
// 결국은 수화하는 순간에 미스매치 애러 발생한다.
</script>

