import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyExceptionFilter } from './common/filters/my-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: false
  }));

  // desse modo a injeção de dependências se perde
  // app.useGlobalFilters(new MyExceptionFilter());
  
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
