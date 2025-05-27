import type { EventHandlerRequest, H3Event } from 'h3';

interface User {
  id: number
  name: string
}

type EventHandlerWithUser<T extends EventHandlerRequest, D> = (event: H3Event<T>, user: User) => Promise<D>

export function defineEventHandlerWithCheckUser<T extends EventHandlerRequest, D>(permissionStr: string, handler: EventHandlerWithUser<T, D>){
  return defineEventHandler(async event => {
    const user = await getCurrentUser();
    // permission things
    checkPermission(user, permissionStr)
    return await handler(event, user)
  })
}

const checkPermission = (user: User, permission: string) => {
  const isAllowed = Math.random() > 0.5 ? true: false
  if(!isAllowed) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Permission Denied',
      message: 'Permission Denied',
    })
  }
}

const getCurrentUser = async () => {
  return {
    id: 1,
    name: 'John Doe',
  }
}