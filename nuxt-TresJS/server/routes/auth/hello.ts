export default defineEventHandler((event) => {
  'Hello World!'
  sendRedirect(event, '/login')
})

// 드디어 깨달았다... routes와 sendRedirect를

// fetch가 아니라 page 접근 그 자체일때 통함 
