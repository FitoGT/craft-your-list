import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  private sign(user: { id: string; email: string }) {
    return this.jwt.sign({ sub: user.id, email: user.email });
  }

  async register(dto: RegisterDto) {
    if (dto.tcg === 'pokemon' && !dto.playerId) throw new BadRequestException('playerId requerido');
    if (dto.tcg === 'yugioh' && !dto.konamiId) throw new BadRequestException('konamiId requerido');

    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Email ya registrado');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        lastname: dto.lastname,
        email: dto.email,
        passwordHash,
        birthdate: new Date(dto.birthdate),
        nationality: dto.nationality,
        ...(dto.tcg === 'pokemon'
          ? { pokemonInfo: { create: { playerId: dto.playerId! } } }
          : { yugiohInfo: { create: { konamiId: dto.konamiId! } } }),
      },
    });

    const token = this.sign({ id: user.id, email: user.email });
    const { passwordHash: _ph, ...safe } = user;
    return { user: safe, token };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid Credentials');

    const token = this.sign({ id: user.id, email: user.email });
    const { passwordHash: _ph, ...safe } = user;
    return { user: safe, token };
  }
}