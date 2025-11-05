import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { UsersService } from '../users/user.service';

@Module({
  controllers: [PdfController],
  providers: [PdfService, UsersService],
  exports: [PdfService],
})
export class PdfModule { }
