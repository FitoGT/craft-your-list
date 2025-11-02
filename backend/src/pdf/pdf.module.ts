import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { ParseModule } from '../parse/parse.module';

@Module({
  imports: [ParseModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule { }
