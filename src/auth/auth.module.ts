import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtauthStrategy } from './strategy/jwtauth.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtauthStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule {}
