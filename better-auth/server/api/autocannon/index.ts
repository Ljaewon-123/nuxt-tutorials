import autocannon from 'autocannon'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Content-Type", "text/html");
  setResponseHeader(event, "Cache-Control", "no-cache");
  setResponseHeader(event, "Transfer-Encoding", "chunked");

  const instance = await autocannon({
    url: 'http://localhost:3000/api/circuit/hello',
    connections: 10,
    duration: 10
  })

  // autocannon.track(instance);

  return instance
  // return sendStream(event, stream)
})

// 필드	뜻	단위	목적
// latencies	요청~응답까지 걸린 시간	ms	얼마나 빠르게 응답하는가
// requests	초당 요청 처리 수	req/sec	얼마나 많이 처리하는가
// throughput	초당 응답 데이터 크기	bytes/sec	얼마나 많이 보냈는가
