export default defineEventHandler((event) => {
  'Hello World!'
  sendRedirect(event, '/login')
})

// 드디어 깨달았다... routes와 sendRedirect를
