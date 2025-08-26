import sseAdapter from "crossws/adapters/sse";

const ws = sseAdapter({
  bidir: true,
  hooks: {
    open(peer) {
      console.log(`👤 Peer connected: ${peer.id}`);

      const reqUrl = peer.request?.url || '';
      const headers = peer.request?.headers
      const headerId = headers.get ? headers.get('x-crossws-id') : null;
      console.log(reqUrl, headers)

      // 1초마다 메시지 전송
      const interval = setInterval(() => {
        peer.send(`tick: ${new Date().toLocaleTimeString()} + ${headerId}`);
      }, 1000);

      // 연결 종료 시 인터벌 정리
      peer.close = () => {
        clearInterval(interval);
        console.log(`❌ Peer disconnected: ${peer.id}`);
      };
    },

    message(peer, message) {
      console.log(`📩 Message from ${peer.id}:`, message);
      // 응답 예시
      if (message.data === 'ping') {
        peer.send('pong');
      }
    },
    
    close(peer, event) {
      console.log("[ws] close", peer, event);
    },
  },
});

// 첫요청시 한번만 들어온다 
export default defineEventHandler(async (event) => {
  // SSE 요청 확인
  const accept = getHeader(event, 'accept');
  const crosswsId = getHeader(event, 'x-crossws-id');

  const parms = getRouterParams(event)
  console.log(`test params ${parms.id}`, crosswsId, 'ha?')
  const req = event.node.req
  if (accept === 'text/event-stream' || crosswsId) {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const request = new Request(url, {
      method: req.method,
      headers: {
        ...req.headers as HeadersInit,
        'x-crossws-id': parms.id
      },
    });

    return ws.fetch(request);
  }
  
  // 일반 HTTP 요청에 대한 응답
  return {
    message: 'SSE endpoint is ready',
    usage: 'Connect with Accept: text/event-stream header'
  };
});