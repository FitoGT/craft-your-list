import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PdfModule } from './pdf/pdf.module';
import { HealthController } from './health/health.controller';
import { TcgModule } from './tcg/tcg.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    PdfModule,
    TcgModule,
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule { }
