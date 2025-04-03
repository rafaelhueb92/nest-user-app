import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) return filter ? request.user[filter] : request.user;
    throw new NotFoundException(
      'User not found in Request, did you include AuthGuard in the route?',
    );
  },
);
