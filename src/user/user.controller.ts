import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guard';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
