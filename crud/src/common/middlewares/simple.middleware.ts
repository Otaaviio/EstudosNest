import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    console.log("Após o próximo middleware do encadeamento")
    
    //Se eu usar um return next() os próximos middlewares não serão executados
    next();

    console.log("Após o próximo middleware do encadeamento")

    res.on('finish', () => {
      console.log('Conexao acabou')
    })
  }
}