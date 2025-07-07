// 파일 경로: src/wallet/wallet.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getWalletByUserId(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new NotFoundException('지갑을 찾을 수 없습니다.');
    }

    // BigInt 타입은 JSON으로 바로 변환되지 않을 수 있으므로 문자열로 변환해줍니다.
    return {
      ...wallet,
      balanceSats: wallet.balanceSats.toString(),
    };
  }
}
