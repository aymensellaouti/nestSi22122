import { Injectable } from '@nestjs/common';
import { GenricCrud } from '../generics/genric.crud';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CvService extends GenricCrud<Cv> {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
  ) {
    super(cvRepository);
  }
}
