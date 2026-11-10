import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from '../recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from '../pessoas/pessoas.module';
import { SimpleMiddleware } from '../common/middlewares/simple.middleware';
import { OtherMiddleware } from '../common/middlewares/other.middleware';
import { MyExceptionFilter } from '../common/filters/my-exception.filters';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    RecadosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: 'postgres',
      autoLoadEntities: true,
      synchronize: true
    }),
    RecadosModule,
    PessoasModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(SimpleMiddleware, OtherMiddleware)
    .forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
