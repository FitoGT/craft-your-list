import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async register(dto: RegisterDto) {
    // validaciones cruzadas
    if (dto.tcg === 'pokemon' && !dto.playerId) {
      throw new BadRequestException('playerId es requerido para tcg=pokemon');
    }
    if (dto.tcg === 'yugioh' && !dto.konamiId) {
      throw new BadRequestException('konamiId es requerido para tcg=yugioh');
    }

    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email ya registrado');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    // creamos el usuario + perfil 1:1 según tcg elegido
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
      include: { pokemonInfo: true, yugiohInfo: true },
    });

    // devuelve sin hash
    const { passwordHash: _, ...safe } = user;
    return safe;
  }
}
