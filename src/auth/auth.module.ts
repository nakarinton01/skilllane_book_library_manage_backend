import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local/local.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('NEST_JWT_TOKEN_SECRET'),
        signOptions: { expiresIn: configService.get('NEST_JWT_TOKEN_EXPIRE') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
