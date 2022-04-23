import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RequestDurationInterceptor implements NestInterceptor {
  // Durée de la requete
  // duree = dateSortie - dateEntrée
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const inDate = Date.now();
    return next.handle().pipe(
      tap(() => {
        const outDate = Date.now();
        console.log(`La durée de la requète est : ${outDate - inDate} ms`);
      }),
    );
  }
}
