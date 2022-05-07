import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenricCrud } from '../generics/genric.crud';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../skill/entities/skill.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from "../auth/dto/register.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends GenricCrud<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async create(registerDto: RegisterDto): Promise<User> {
    const user = await this.userRepository.create(registerDto);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    console.log('user', user);
    return this.userRepository.save(user);
  }
  findUserByEmailOrUsername(email: string, username: string): Promise<User> {
    return this.userRepository.findOne({
      where: [{ email }, { username }],
    });
  }
}
