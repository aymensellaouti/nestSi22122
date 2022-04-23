import { Module } from '@nestjs/common';
import { PremierController } from './premier.controller';
import { PremierService } from './premier.service';

@Module({
  controllers: [PremierController],
  providers: [PremierService],
})
export class PremierModule {}
