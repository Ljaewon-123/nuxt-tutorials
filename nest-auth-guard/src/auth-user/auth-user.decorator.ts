import { createParamDecorator } from "@nestjs/common";

export const AuthUser = createParamDecorator((_data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});

