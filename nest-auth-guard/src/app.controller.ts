import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthUser } from './auth-user/auth-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  existsUserInfo(@AuthUser() user: any) {
    console.log(user);
    console.log(user.id)
    return user;
  }
}
