import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

type UserData = {
  name?: string;
  lastname?: string;
  email?: string;
  nationality?: string;
  birthdate?: Date;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { pokemonInfo: true, yugiohInfo: true },
    });
  }

  async findOneWithPokemon(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { pokemonInfo: true },
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const exists = await this.prisma.user.findUnique({ where: { id } });
    const yugiohInfo = await this.prisma.yugiohUserInfo.findUnique({ where: { userId: id } });
    const pokemonInfo = await this.prisma.pokemonUserInfo.findUnique({ where: { userId: id } });
    if (!exists) throw new NotFoundException('User not found');

    const { birthdate, pokemonInfo: pokemonInfoDto, yugiohInfo: yugiohInfoDto, ...rest } = dto as any;
    console.log('Updating user', id, dto, { yugiohInfo, pokemonInfo });

    const data: any = { ...rest } as UserData;
    if (birthdate) data.birthdate = new Date(birthdate);

    if (yugiohInfoDto) {
      const { konamiId } = yugiohInfoDto as { konamiId?: string };
      if (konamiId) {
        if (yugiohInfo) {
          data.yugiohInfo = { update: { konamiId } };
        } else {
          data.yugiohInfo = { create: { konamiId } };
        }
      }
    }

    if (pokemonInfoDto) {
      const { playerId } = pokemonInfoDto as { playerId?: string };
      if (playerId) {
        const existingByPlayer = await this.prisma.pokemonUserInfo.findUnique({ where: { playerId } });
        if (existingByPlayer && existingByPlayer.userId !== id) {
          throw new ConflictException('playerId already associated with another user');
        }

        if (pokemonInfo) {
          data.pokemonInfo = { update: { playerId } };
        } else {
          data.pokemonInfo = { create: { playerId } };
        }
      }
    }

    return this.prisma.user.update({ where: { id }, data });
  }
}
