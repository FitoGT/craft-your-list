import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): JwtModuleOptions => ({
        secret: cfg.get<string>('JWT_SECRET') ?? 'dev-secret',
        signOptions: {
          expiresIn: Number(cfg.get<string>('JWT_EXPIRES_IN') ?? '604800'), // número (segundos)
        },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
