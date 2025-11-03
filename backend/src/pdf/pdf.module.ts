import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { UsersService } from '../users/user.service';
import { ParseModule } from '../parse/parse.module';

@Module({
  imports: [ParseModule],
  controllers: [PdfController],
  providers: [PdfService, UsersService],
})
export class PdfModule { }
