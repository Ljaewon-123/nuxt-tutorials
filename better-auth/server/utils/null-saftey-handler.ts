import type { EventHandlerRequest, H3Event } from 'h3';
import { noContentError } from './errors';

// 자동 타입감지는 안됨
export function defineEventHandlerWithNullSaftey<T>(handler: (event: H3Event<EventHandlerRequest>) => Promise<T> | T) {
  return defineEventHandler(async event => {
    const result = await handler(event)
    return validateNullSafety(result);
  })
}

const validateNullSafety = <T>(value: T | T[]): NonNullable<T | T[]> => {
  if(value === null || value === undefined) { // number 0 일때는 피하기 위해 지정
    throw noContentError('Value cannot be null or undefined');
  }
  if(Array.isArray(value)) { // 이걸 throw처리 할거냐 말거냐 
    if(value.length === 0) {
      // Response 인터페이스 사용
    }
  }
  if(typeof value === 'object' && Object.keys(value).length === 0 ){
    // Response 인터페이스 사용
  }

  return value; // 여기에도 Response 인터페이스 사용하고 return 알맞게 해주기 
}



interface Response {
  isEmpty: boolean    // data가 배열일경우 data.langth == 0 , {} 빈객체일경우 true 아니면 false
  valueType: string,  // typeof data  ex) array, object, string, number or customTypes, interfaces that's using only debugging
  result: any | any[]
}