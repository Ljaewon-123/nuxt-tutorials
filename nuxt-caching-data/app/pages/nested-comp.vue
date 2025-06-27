<template>
  <div>
    <p>HI there</p>
    <p>It is awesome component techniques </p>
    {{ msg }}
    <AppForm.Form>
      <AppForm.FormInput v-model="msg"/>
    </AppForm.Form>
  </div>
</template>

<script setup lang="ts">
// auto import랑 맞출려면 고생좀 하겠네 직접 수정은 안되니까 
import * as AppForm from '~/components/app-form/index'

const msg = ref()
</script>