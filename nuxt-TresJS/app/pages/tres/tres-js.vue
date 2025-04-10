<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three';
import { reactive } from 'vue';
import { OrbitControls } from '@tresjs/cientos';

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: SRGBColorSpace,
  toneMapping: NoToneMapping,
});

function onClick(ev: any) {
  if (ev) {
    ev.object.material.color.set('#008080');
  }
}

function onPointerEnter(ev: any) {
  console.log(ev);
  if (ev) {
    ev.object.material.color.set('#DFFF45');
  }
}

function onPointerLeave(ev: any) {
  if (ev) {
    ev.object.material.color.set('#efefef')
  }
}
</script>

<template>
  <div class="w-screen h-screen">
    <TresCanvas v-bind="state">
      <TresPerspectiveCamera
        :position="[11, 11, 11]"
        :fov="45"
        :near="0.1"
        :far="1000"
        :look-at="[-8, 3, -3]"
      />
      <OrbitControls />
      <TresScene>
        <TresDirectionalLight
          :position="[0, 8, 4]"
          :intensity="0.2"
          cast-shadow
        />
        <template v-for="x in [-2.5, 0, 2.5]">
          <template v-for="y in [-2.5, 0, 2.5]">
            <TresMesh
              v-for="z in [-2.5, 0, 2.5]"
              :key="`${x}-${y}-${z}`"
              :position="[x, y, z]"
              @click="onClick"
              @pointer-enter="onPointerEnter"
              @pointer-leave="onPointerLeave"
            >
              <TresBoxGeometry :args="[1, 1, 1]" />
              <TresMeshToonMaterial color="#efefef" />
            </TresMesh>
          </template>
        </template>
        <TresAmbientLight :intensity="0.5" />
      </TresScene>
    </TresCanvas>
  </div>
</template>
