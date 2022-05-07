import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ect: ExecutionContext) => {
  const request = ect.switchToHttp().getRequest();
  return request.user;
});
