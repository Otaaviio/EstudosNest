import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { response } from "express";
import { measureMemory } from "vm";

@Catch(BadRequestException)
export class MyExceptionFilter<T extends BadRequestException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const contexto = host.switchToHttp();
    const res = contexto.getResponse();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error = typeof res === 'string' ? {
      message: exceptionResponse
    } : (exception as object)

    response.status(404).json({
      statusCode,
      ...error
    });
  }
}