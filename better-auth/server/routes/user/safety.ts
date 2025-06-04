import { defineEventHandlerWithCheckUserNull } from "~~/server/utils/role-nullsaftey"

const PERMISSION = 'user.edit'

export default defineEventHandlerWithCheckUserNull(PERMISSION, async (event, user) => {
  console.log(user, 'user')
  return user
})