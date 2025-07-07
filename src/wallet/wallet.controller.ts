// 파일 경로: src/wallet/wallet.controller.ts

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // GET /wallet 경로로 요청이 들어옵니다.
  @Get()
  // 이 API도 'jwt' 전략을 사용하는 AuthGuard로 보호합니다.
  @UseGuards(AuthGuard('jwt'))
  getMyWallet(@Req() req: Request) {
    // req.user에는 JwtStrategy의 validate 메소드가 반환한
    // password가 제외된 user 객체가 들어있습니다.
    const user = req.user as { id: string };

    // user id를 서비스에 넘겨서 해당 유저의 지갑을 찾습니다.
    return this.walletService.getWalletByUserId(user.id);
  }
}
