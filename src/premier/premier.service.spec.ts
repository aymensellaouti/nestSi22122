import { Test, TestingModule } from '@nestjs/testing';
import { PremierService } from './premier.service';

describe('PremierService', () => {
  let service: PremierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PremierService],
    }).compile();

    service = module.get<PremierService>(PremierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
