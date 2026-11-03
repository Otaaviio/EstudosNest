import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";

export class ErrorHandingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    
    return next.handle().pipe(
      catchError( e => {
        return throwError(() => {
          if (e.name === 'NotFoundException') {
            return new BadRequestException(e.message);
          }

          return new BadRequestException("Ocorreu um erro desconhecido")
        })
      })
    );

  }
}