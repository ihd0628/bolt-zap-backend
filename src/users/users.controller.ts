import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  // GET /users/me 경로로 요청이 들어옵니다.
  @Get('me')
  // @UseGuards() 데코레이터가 바로 '출입증 검사원' 역할을 합니다.
  // AuthGuard('jwt')는 우리가 만든 JwtStrategy를 사용하라고 알려줍니다.
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request) {
    // JwtStrategy의 validate 메소드가 성공적으로 실행되면,
    // req 객체 안에 user 정보가 담겨있게 됩니다.
    return req.user;
  }
}
