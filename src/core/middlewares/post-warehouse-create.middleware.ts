import { Injectable, NestMiddleware } from "@nestjs/common"

import { Request, Response, NextFunction } from "express"

import { PostWarehouseCreateSchema } from "@src/common/schemas/post-warehouse-create.schema"
import { ExceptionService } from "@src/core/services/exception.service"
import { ZodService } from "@src/core/services/zod.service"

@Injectable()
export class PostWarehouseCreateMiddleware implements NestMiddleware {
    constructor(
        private readonly exceptionService: ExceptionService, 
        private readonly zodService: ZodService
    ) {}

    public async use(request: Request, response: Response, next: NextFunction) {
        const error = await this.zodService.validateDataWithSchema(PostWarehouseCreateSchema, request)

        if(error) {
            throw this.exceptionService.getBadRequestException(error)
        }
        else {
            return next()
        }
    }
}