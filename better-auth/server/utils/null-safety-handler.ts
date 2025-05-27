import type { EventHandlerRequest, H3Event } from 'h3';
import { noContentError } from './errors';

// 자동 타입감지는 안됨
export function defineEventHandlerWithNullSaftey<T>(handler: (event: H3Event<EventHandlerRequest>) => Promise<T> | T) {
  return defineEventHandler(async event => {
    const result = await handler(event)
    return validateNullSafety(result);
  })
}

const validateNullSafety = <T>(value: T | T[]): Response<NonNullable<T | T[]>> => {
  if(value === null || value === undefined) { // number 0 일때는 피하기 위해 지정
    throw noContentError('Value cannot be null or undefined');
  }
  return wrapResponse(value);
}


type VariableType = 'array' | 'object' | 'string' | 'number' | 'boolean' | 'undefined' | 'null' | string
interface Response<T> {
  isEmpty: boolean    // data가 배열일경우 data.langth == 0 , {} 빈객체일경우 true 아니면 false
  valueType: VariableType,  // typeof data  ex) array, object, string, number or customTypes, interfaces that's using only debug
  result: T | T[]
}

// null/undefined는 validate에서 미리 거르므로 여기선 체크 생략
function wrapResponse<T>(value: NonNullable<T | T[]>): Response<NonNullable<T | T[]>> {
  const isArray = Array.isArray(value)
  const isObject = typeof value === 'object' && !isArray

  const isEmpty = isArray
    ? value.length === 0
    : isObject
      ? Object.keys(value).length === 0
      : false

  const valueType = isArray
    ? 'array'
    : typeof value

  return {
    isEmpty,
    valueType,
    result: value,
  }
}


// defineEventHandler에 getParams, getQuery, getBody 이거 유효성 검사 하는거 있을텐데
// Symbol 조사 
