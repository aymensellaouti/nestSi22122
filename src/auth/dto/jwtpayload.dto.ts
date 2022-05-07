import { UserRoleEnum } from '../../user/entities/user.entity';

export class JwtpayloadDto {
  username: string;
  email: string;
  role: UserRoleEnum;
}
