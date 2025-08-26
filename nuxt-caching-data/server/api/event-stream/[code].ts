export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code')
  const eventStream = createEventStream(event)

  const interval = setInterval(async () => {
    await eventStream.push(`${code}`)
  }, 1000)

  eventStream.onClosed(async () => {
    clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})
