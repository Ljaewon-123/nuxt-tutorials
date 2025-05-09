import { defineEventHandlerWithCheckUser } from "~~/server/utils/composing"

const PERMISSION = 'user.edit'
//  미들웨어의 대체품
export default defineEventHandlerWithCheckUser(PERMISSION, async (event) => {
  
  console.log(event.context, 'user context')

  return 'CONTENT'
})