import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtpayloadDto } from '../dto/jwtpayload.dto';
import { UserService } from '../../user/user.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { use } from 'passport';

@Injectable()
export class JwtauthStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtpayloadDto) {
    // Todo Récupérer le user
    console.log('in validate ', payload);
    const user = await this.userService.findUserByEmailOrUsername(
      payload.email,
      payload.username,
    );
    //  Vérifier s'il existe on le retourne
    if (!user) {
      throw new UnauthorizedException(
        `Vous n'êtes pas autorisé à accéder à cette ressource`,
      );
    }
    console.log(user);
    return user;
    //  sinon on déclenche une erreur
  }
}
