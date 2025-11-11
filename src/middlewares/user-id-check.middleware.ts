import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        console.log('UserIdCheckMiddleware antes do controlador');

        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new BadRequestException('ID inválido. Deve ser um número.');
        }

        console.log('UserIdCheckMiddleware depois do controlador');

        next();
    }
}