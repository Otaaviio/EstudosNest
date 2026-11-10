import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

export class OtherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    console.log("Other middleware")

  }
}