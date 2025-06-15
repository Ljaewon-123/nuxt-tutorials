<template>
  <div>
    page 1\
    <NuxtTime :datetime="Date.now()" />
    <li>
      <!-- 먼저 렌더링된 놈이 캐시key 우선권을 가져가는거 같음 -->
      <ul>
        <ComponentA/>
      </ul>
      <ul>
        <ComponentB/>
      </ul>
    </li>
  </div>
</template>

<script setup lang="ts">

</script>