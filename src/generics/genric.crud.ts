import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export class GenricCrud<T> {
  constructor(private readonly repository: Repository<T>) {}
  create(entity): Promise<T> {
    return this.repository.save(entity);
  }

  findAll(criteria): Promise<T[]> {
    return this.repository.find(criteria);
  }

  async findOne(id): Promise<T> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  // async update(id, partialEntity) {
  //   const entity: T = await this.repository.preload({ id, ...partialEntity });
  //   if (!entity) {
  //     throw new NotFoundException(`Entity innexistante !!`);
  //   }
  //   //  2- Mettre à jour les champs envoyé via le body
  //   return this.repository.save(entity);
  // }
}
