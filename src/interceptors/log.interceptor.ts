import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();
    const { url, method } = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        console.log(
          `The execution with path ${method} ${url} lend ${Date.now() - dt} ms`,
        );
      }),
    );
  }
}
