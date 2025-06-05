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
