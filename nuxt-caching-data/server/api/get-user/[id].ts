import { z } from "zod/v4";

const User = z.object({
  id: z.coerce.number(),
});

export default defineEventHandler(async (event) => {

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