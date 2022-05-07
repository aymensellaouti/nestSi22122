import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtpayloadDto } from "./dto/jwtpayload.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ jwt: string }> {
    return this.authService.login(loginDto);
  }
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }
}
