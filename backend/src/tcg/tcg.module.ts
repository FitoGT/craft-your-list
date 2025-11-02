import { Module } from '@nestjs/common';
import { TcgService } from './tcg.service';
import { TcgController } from './tcg.controller';

@Module({
  controllers: [TcgController],
  providers: [TcgService],
})
export class TcgModule { }
