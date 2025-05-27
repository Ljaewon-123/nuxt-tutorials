import { defineRolesEventHandler } from "~~/server/utils/multi-role-handler"

//  미들웨어의 대체품, => 인터셉터의 대체품도 할수있다.
export default defineRolesEventHandler(['admin2', 'checker'], async (event) => {
  
  console.log(event.context, 'user context')

  return 'CONTENT'
})