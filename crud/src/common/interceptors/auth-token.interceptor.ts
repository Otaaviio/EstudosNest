import { CallHandler, ExecutionContext, NestInterceptor, UnauthorizedException } from "@nestjs/common";

export class AuthTokenInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    
    const req = context.switchToHttp().getRequest();
    const token = req.header.authorrization.split(" ")[1];

    if ( !token || token != '123456' ) {
      throw new UnauthorizedException('usuário não logado')
    }
    
    console.log(token)

    return next.handle()
  }
}