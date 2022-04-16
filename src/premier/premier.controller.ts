import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('premier')
export class PremierController {
  @Get('')
  sayHello() {
    return 'Hello SI2';
  }
  @Post('')
  post(@Body() requestBody) {
    console.log(requestBody);
    return requestBody;
  }
}
