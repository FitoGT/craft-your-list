import { Body, Controller, Post, Res, Get, NotFoundException, Query } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { UsersService } from '../users/user.service';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { DecklistDto } from './pdf.dto';
import { calculateDivision, splitBirthdateParts } from '../utils/division.utils';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdf: PdfService,
    private readonly user: UsersService,
  ) { }

  @Post('decklist')
  async decklist(@Body() body: any, @Res() res: Response) {
    const dto = plainToInstance(DecklistDto, body);
    await validateOrReject(dto);

    const parsed = this.pdf.parse(dto.tcg, dto.rawList);

    let fields: Record<string, string | boolean> | undefined;

    if (dto.userId) {
      if (dto.tcg === 'pokemon') {
        const userData = await this.user.findOneWithPokemon(dto.userId);
        if (!userData) throw new NotFoundException(`User with ID ${dto.userId} not found`);

        const player_name = [userData.name, userData.lastname].filter(Boolean).join(' ').trim();
        const player_id = userData.pokemonInfo?.playerId ?? '';
        const birthdate = new Date(userData.birthdate);
        const { month, day, year } = splitBirthdateParts(birthdate);
        const division = calculateDivision(birthdate);
        const junior = division === 'junior' ? 'Yes' : '';
        const senior = division === 'senior' ? 'Yes' : '';
        const master = division === 'master' ? 'Yes' : '';

        fields = { player_name, player_id, month, day, year, junior, senior, master };
      }

      if (dto.tcg === 'yugioh') {
        const userData = await this.user.findOne(dto.userId);
        if (!userData) throw new NotFoundException(`User with ID ${dto.userId} not found`);

        fields = {
          name: userData.name ?? '',
          lastname: userData.lastname ?? '',
          konami_id: (userData as any)?.yugiohInfo?.konamiId ?? '',
        };
      }
    }

    const pdfBuffer = await this.pdf.render(dto.tcg, parsed, fields);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="decklist.pdf"');
    res.send(pdfBuffer);
  }

  @Get('debug/fields')
  async fields(@Query('tcg') tcg: 'pokemon' | 'yugioh' = 'pokemon') {
    try {
      const fields = await this.pdf.listFields(tcg);
      return { tcg, count: fields.length, fields };
    } catch {
      return { error: `No se pudo leer campos de ${tcg}. ¿Seguro que el PDF acroform existe en src/templates?` };
    }
  }
}
