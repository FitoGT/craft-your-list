import { Body, Controller, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { ParseService } from '../parse/parse.service';
import { PdfService } from './pdf.service';
import { DecklistDto } from './pdf.types';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Controller('pdf')
export class PdfController {
  constructor(private readonly parse: ParseService, private readonly pdf: PdfService) { }

  @Post('decklist')
  async decklist(@Body() body: any, @Res() res: Response) {
    const dto = plainToInstance(DecklistDto, body);
    await validateOrReject(dto);

    const parsed = this.parse.parseDeck(dto.rawList);
    const pdfBuffer = await this.pdf.render(parsed);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="decklist.pdf"');
    res.send(pdfBuffer);
  }


  @Get('debug/fields')
  async fields() {
    try {
      const fields = await (this.pdf as any).listFields();
      return { count: fields.length, fields };
    } catch (e) {
      return { error: 'No se pudo leer campos. ¿Seguro que el PDF acroform existe en src/templates?' };
    }
  }
}
