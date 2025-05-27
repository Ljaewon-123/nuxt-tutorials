import type { EventHandlerRequest, H3Event } from 'h3';
import { noContentError } from './errors';

export function defineEventHandlerWithNullSafety<D, T extends EventHandlerRequest = EventHandlerRequest>(handler: (event: H3Event<T>) => Promise<D> | D) {
  return defineEventHandler(async event => {
    const result = await handler(event)
    return validateNullSafety<D>(result);
  })
}

const validateNullSafety = <T>(value: T): Response<NonNullable<T>> => {
  if(value === null || value === undefined) { // number 0 일때는 피하기 위해 지정
    throw noContentError('Value cannot be null or undefined');
  }
  return wrapResponse(value);
}


type VariableType = 'array' | 'object' | 'string' | 'number' | 'boolean' | 'undefined' | 'null' | string
interface Response<T> { // array나 object가 아니면 딱히 쓸데가 없을거같은데 
  isEmpty: boolean    // data가 배열일경우 data.langth == 0 , {} 빈객체일경우 true 아니면 false
  valueType: VariableType,  // typeof data  ex) array, object, string, number or customTypes, interfaces that's using only debug
  result: T
}

// null/undefined는 validate에서 미리 거르므로 여기선 체크 생략
function wrapResponse<T>(value: NonNullable<T>): Response<NonNullable<T>> {
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

// null safety 하는건 좋은데 array나 object일때는 별로인거 같은데 
// 배열이나 object에만 Response를 적용하면 일관성은 없는데 쓰기는 편하겠다. 


// defineEventHandler에 getParams, getQuery, getBody 이거 유효성 검사 하는거 있을텐데
// https://h3.dev/examples/validate-data#validate-params
