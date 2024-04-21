import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common"

import * as rxjs from "rxjs"

import { BaseResponseClass } from "@src/common/classes/base-response.class"

@Injectable()
export class BaseResponseInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            rxjs.map((data) => {
                if(data instanceof BaseResponseClass) {
                    return data.getResponse()
                }
                else {
                    return data
                }
            })
        )
    }
}