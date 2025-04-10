<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls, Text3D } from '@tresjs/cientos';
// Orbit controls by extending

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};
</script>

<template>
  <div class="w-screen h-screen">
    <TresCanvas v-bind="gl" >
      <TresPerspectiveCamera :position="[4, 3, 9]" />
      <OrbitControls />
      <Suspense>
        <Text3D
          :position="[0, 1, 0]"
          text="Click N' Drag"
          font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json" 
        >
          <TresMeshNormalMaterial />
        </Text3D>
      </Suspense>
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
      <TresGridHelper />
    </TresCanvas>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #000;
}
</style>