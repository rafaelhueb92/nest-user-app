import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const data = this.authService.checkToken(
        (request.headers.authorization || ' ').split(' ')[1],
      );

      request.tokenPayload = data;

      request.user = await this.userService.findById(data.id);

      return true;
    } catch (e) {
      console.error('Auth Error', e.message);
      return false;
    }
  }
}
