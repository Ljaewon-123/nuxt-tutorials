export default defineEventHandler(event => {
  const runtimeConfig = useRuntimeConfig()
  const { server } = runtimeConfig
  return { message: server }
})