import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

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
    if (!exists) throw new NotFoundException('User not found');

    const { pokemonInfo, yugiohInfo, birthdate, ...rest } = dto;

    const data: any = { ...rest };
    if (birthdate) data.birthdate = new Date(birthdate);

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
