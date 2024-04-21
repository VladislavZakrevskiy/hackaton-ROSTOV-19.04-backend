import { Injectable, NestMiddleware } from "@nestjs/common"

import { Request, Response, NextFunction } from "express"

import { PostOrderCreateSchema } from "@src/common/schemas/post-order-create.schema"
import { ExceptionService } from "@src/core/services/exception.service"
import { ZodService } from "@src/core/services/zod.service"

@Injectable()
export class PostOrderCreateMiddleware implements NestMiddleware {
    constructor(
        private readonly exceptionService: ExceptionService, 
        private readonly zodService: ZodService
    ) {}

    public async use(request: Request, response: Response, next: NextFunction) {
        const error = await this.zodService.validateDataWithSchema(PostOrderCreateSchema, request)

        if(error) {
            throw this.exceptionService.getBadRequestException(error)
        }
        else {
            return next()
        }
    }
}