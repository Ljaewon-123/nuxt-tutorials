import type { EventHandlerRequest, H3Event } from 'h3';

interface User {
  id: number
  name: string
  role: string
}

type EventHandlerWithUser<T extends EventHandlerRequest, D> = (event: H3Event<T>, user: User) => Promise<D>

const Permission = 'admin'

export function defineEventAdminHandler<T extends EventHandlerRequest, D>(handler: EventHandlerWithUser<T, D>){
  return defineEventHandler(async event => {
    const user = await getCurrentUser();
    // permission things
    checkPermission(user, Permission)
    return await handler(event, user)
  })
}

const checkPermission = (user: User, permission: string) => {
  if(user.role == permission) return 

  throw createError({
    statusCode: 403,
    statusMessage: 'Permission Denied',
    message: 'Permission Denied',
  })
}

const getCurrentUser = async () => {
  return {
    id: 1,
    name: 'John Doe',
    role: 'admin'
  }
}