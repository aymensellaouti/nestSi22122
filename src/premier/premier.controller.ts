import { Body, Controller, Get, Post } from '@nestjs/common';
import { PremierService } from './premier.service';

@Controller('premier')
export class PremierController {
  constructor(private premierService: PremierService) {}
  @Get('')
  sayHello() {
    return this.premierService.sayHello();
  }
  @Post('')
  post(@Body() requestBody) {
    console.log(requestBody);
    return requestBody;
  }
}
