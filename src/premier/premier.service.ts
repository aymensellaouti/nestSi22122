import { Injectable } from '@nestjs/common';

@Injectable()
export class PremierService {
  sayHello(): string {
    return 'Hello SI2 :)';
  }
}
