import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allContext = [context.getClass(), context.getHandler()];
    // console.log('get', this.reflector.get('roles', context.getClass()));
    // console.log('getAll', this.reflector.getAll('roles', allContext));
    // console.log(
    //   'getAllAndOverride',
    //   this.reflector.getAllAndOverride('roles', allContext),
    // );
    const roles = this.reflector.getAllAndMerge('roles', allContext);
    if (roles.length == 0) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user;
    return roles.some((role) => role == user.role);
  }
}
