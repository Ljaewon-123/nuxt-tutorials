import type { EventHandlerRequest, H3Event } from 'h3';
import { defineEventHandlerWithNullSafety } from './null-safety-handler';

interface User {
  id: number
  name: string
}

type EventHandlerWithUser<T extends EventHandlerRequest, D> = (event: H3Event<T>, user: User) => Promise<D>

export function defineEventHandlerWithCheckUserNull<T extends EventHandlerRequest, D>(permissionStr: string, handler: EventHandlerWithUser<T, D>){
  return defineEventHandlerWithNullSafety(async event => {
    const user = await getCurrentUser();
    // permission things
    checkPermission(user, permissionStr)
    return await handler(event, user)
  })
}

const checkPermission = (user: User, permission: string) => {
  if(permission == 'user.edit') return 
  
  throw forbiddenError('Error: Permission Denied')
}

const getCurrentUser = async () => {
  return {
    id: 1,
    name: 'John Doe',
  }
}