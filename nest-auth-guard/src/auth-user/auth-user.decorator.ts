import { createParamDecorator } from "@nestjs/common";

export const AuthUser = createParamDecorator((_data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return JSON.parse(req.headers["x-user"]); // Should I parse?
});

