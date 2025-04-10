<script setup lang="ts">
const groupRef = shallowRef()
const { onLoop } = useRenderLoop()

onLoop(() => {
  if (groupRef.value) {
    groupRef.value.rotation.y += 0.01
  }
})
</script>
<template>
  <div class="w-screen h-screen">
    <TresCanvas >
      <TresGroup ref="groupRef" :position="[0,0,0]">
        <TresMesh>
          <TresBoxGeometry />
          <TresMeshBasicMaterial color="red" />
        </TresMesh>
        <TresMesh>
          <TresSphereGeometry />
          <TresMeshBasicMaterial color="blue" />
        </TresMesh>
      </TresGroup>
    </TresCanvas>
  </div>
</template>