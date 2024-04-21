import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common"

import * as rxjs from "rxjs"

import { InternalServerErrorException } from "@src/common/exceptions/internal-server-error.exception"
import { BaseExceptionClass } from "@src/common/classes/base-exception.class"

@Injectable()
export class BaseExceptionInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            rxjs.catchError((error) => {
                if(error instanceof BaseExceptionClass) {
                    throw error
                }
                else {
                    throw new InternalServerErrorException("Unhandled exception has occurred", error)
                }
            })
        )
    }
}