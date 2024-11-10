import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dtoClass: ClassConstructor<T>) {}

  public intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<T | T[]> | Promise<Observable<T | T[]>> {
    return next.handle().pipe(
      map((data: T | T[]) =>
        plainToInstance(this.dtoClass, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
