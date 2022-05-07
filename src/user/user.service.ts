import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenricCrud } from '../generics/genric.crud';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../skill/entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends GenricCrud<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
