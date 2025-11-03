import { Body, Controller, Post, Res, Get, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { ParseService } from '../parse/parse.service';
import { PdfService } from './pdf.service';
import { UsersService } from '../users/user.service';
import { DecklistDto } from './pdf.types';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { calculateDivision, splitBirthdateParts } from '../utils/division.utils';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly parse: ParseService,
    private readonly pdf: PdfService,
    private readonly user: UsersService
  ) { }

  @Post('decklist')
  async decklist(@Body() body: any, @Res() res: Response) {
    const dto = plainToInstance(DecklistDto, body);
    await validateOrReject(dto);

    const parsedDeck = this.parse.parseDeck(dto.rawList);
    let fields: Record<string, string | boolean> | undefined;

    if (dto.userId) {
      const userData = await this.user.findOne(dto.userId);

      if (!userData) {
        throw new NotFoundException(`User with ID ${dto.userId} not found`);
      }

      const player_name = [userData.name, userData.lastname].filter(Boolean).join(' ').trim();
      const player_id = (userData as any)?.popId ?? userData.id;

      const birthdate = new Date(userData.birthdate);
      const { month, day, year } = splitBirthdateParts(birthdate);

      const division = calculateDivision(birthdate);
      const junior = division === 'junior' ? 'Yes' : '';
      const senior = division === 'senior' ? 'Yes' : '';
      const master = division === 'master' ? 'Yes' : '';

      fields = {
        player_name,
        player_id,
        month,
        day,
        year,
        junior,
        senior,
        master,
      };
    }

    const pdfBuffer = await this.pdf.render(parsedDeck, fields);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="decklist.pdf"');
    res.send(pdfBuffer);
  }

  @Get('debug/fields')
  async fields() {
    try {
      const fields = await (this.pdf as any).listFields();
      return { count: fields.length, fields };
    } catch {
      return { error: 'No se pudo leer campos. ¿Seguro que el PDF acroform existe en src/templates?' };
    }
  }
}
