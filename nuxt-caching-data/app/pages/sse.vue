<script setup lang="ts">
import { WebSocketSSE } from "crossws/websocket/sse";
const url = useRequestURL()
const result = ref()
onMounted(() => {
  const ws = new WebSocketSSE("http://localhost:3000/api/sse/3", { bidir: true });

  ws.addEventListener("open", () => {
    ws.send("ping");
  });

  ws.addEventListener("message", (event: any) => {
    result.value = event.data
    console.log("Received:", event.data);
  });

  onBeforeRouteLeave(() => {
    ws.close()
  })
})


</script>

<template>
<div>
  <p>
    hi SSE
    {{ url }}
  </p>
  <div>
    {{ result }}
  </div>
</div>
</template>