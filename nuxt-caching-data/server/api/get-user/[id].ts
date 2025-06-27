import { z } from "zod/v4";

const User = z.object({
  id: z.coerce.number(),
});

// throw new BadRequestException('Bad Request Error')
// nitro에서 예상못한 오류로 잡아서 createError와 똑같은 객체로 return해주고 nitro error log를 띄운다.
export default defineEventHandler(async (event) => {
  // throw createError({
  //   message: 'hi',
  //   statusCode: 400
  // })

  // return await $fetch('http://localhost:3001')

  const params = await getValidatedRouterParams(event, User.parse)
  // const id = getRouterParam(event, 'id')
  
  const user = {
    id: params.id,
    email: 'email@email.com'
  }
  
  return {
    message: 'found user' + params.id,
    user
  }
})


// nuxt로깅은 front-end 성능추적용과 어플리케이션이 깨질만한 심각한 요소 혹은 보안위주로 로깅할 방법 찾기 