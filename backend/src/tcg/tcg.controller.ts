import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TcgService } from './tcg.service';
import { UpsertPokemonDto } from './dto/upsert-pokemon.dto';
import { UpsertYgoDto } from './dto/upsert-ygo.dto';

@Controller('tcg')
export class TcgController {
  constructor(private readonly tcg: TcgService) { }

  @Post('pokemon')
  upsertPokemon(@Body() dto: UpsertPokemonDto) {
    return this.tcg.upsertPokemon(dto.userId, dto.playerId);
  }

  @Get('pokemon/:userId')
  getPokemon(@Param('userId') userId: string) {
    return this.tcg.getPokemon(userId);
  }

  @Delete('pokemon/:userId')
  delPokemon(@Param('userId') userId: string) {
    return this.tcg.deletePokemon(userId);
  }

  @Post('ygo')
  upsertYgo(@Body() dto: UpsertYgoDto) {
    return this.tcg.upsertYgo(dto.userId, dto.konamiId);
  }

  @Get('ygo/:userId')
  getYgo(@Param('userId') userId: string) {
    return this.tcg.getYgo(userId);
  }

  @Delete('ygo/:userId')
  delYgo(@Param('userId') userId: string) {
    return this.tcg.deleteYgo(userId);
  }
}
