import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtpayloadDto } from './dto/jwtpayload.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email } = registerDto;
    //  Todo Vérifier est ce qu'il y a un user avec cet email ou ce username
    const user = await this.userService.findUserByEmailOrUsername(
      email,
      username,
    );
    if (user) {
      throw new BadRequestException(`Le username ou l'email existe déjà`);
    } else {
      return this.userService.create(registerDto);
    }
  }

  async login(loginDto: LoginDto): Promise<{ jwt: string }> {
    //  Todo chercher le user avec cet email ou ce username
    const { username, password } = loginDto;
    //  Todo Vérifier est ce qu'il y a un user avec cet email ou ce username
    const user = await this.userService.findUserByEmailOrUsername(
      username,
      username,
    );
    if (!user) {
      throw new UnauthorizedException(`Veuillez vérifier vos credentials`);
    } else {
      const isUser = await bcrypt.compare(password, user.password);
      if (!isUser) {
        throw new UnauthorizedException(`Veuillez vérifier vos credentials`);
      } else {
        const payload: JwtpayloadDto = {
          username: user.username,
          email: user.email,
          role: user.role,
        };
        const jwt = this.jwtService.sign(payload);
        return { jwt };
      }
    }
  }
}
