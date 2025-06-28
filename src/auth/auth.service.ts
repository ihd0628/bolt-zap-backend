import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        wallet: {
          create: { balanceSats: 0 },
        },
      },
      select: { id: true, email: true, createdAt: true },
    });

    return user;
  }

  async login(loginDto: CreateUserDto) {
    const { email, password } = loginDto;

    // 1. 이메일로 사용자 확인
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }

    // 2. 비밀번호 일치 여부 확인
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('이메메일 또는 비밀번호를 확인해주세요.');
    }

    // 3. JWT 페이로드 생성 (토큰에 담을 정보)
    const payload = { sub: user.id, email: user.email };

    // 4. JWT 생성 및 반환
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
