// 파일 경로: src/wallet/wallet.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [PrismaModule], // PrismaModule을 임포트합니다.
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
