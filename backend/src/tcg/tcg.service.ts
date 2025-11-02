import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TcgService {
  constructor(private prisma: PrismaService) { }

  upsertPokemon(userId: string, playerId: string) {
    return this.prisma.pokemonUserInfo.upsert({
      where: { userId },
      update: { playerId },
      create: { userId, playerId },
      include: { user: true },
    });
  }
  getPokemon(userId: string) {
    return this.prisma.pokemonUserInfo.findUnique({ where: { userId } });
  }
  deletePokemon(userId: string) {
    return this.prisma.pokemonUserInfo.delete({ where: { userId } });
  }

  upsertYgo(userId: string, konamiId: string) {
    return this.prisma.yugiohUserInfo.upsert({
      where: { userId },
      update: { konamiId },
      create: { userId, konamiId },
      include: { user: true },
    });
  }
  getYgo(userId: string) {
    return this.prisma.yugiohUserInfo.findUnique({ where: { userId } });
  }
  deleteYgo(userId: string) {
    return this.prisma.yugiohUserInfo.delete({ where: { userId } });
  }
}
