import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserIdCheckMiddleware implements NestMiddleware {
  use({ params }: Request, res: Response, next: NextFunction) {
    if (isNaN(Number(params.id)) || Number(params.id) <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    next();
  }
}
