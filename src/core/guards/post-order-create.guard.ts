import { AuthGuard } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

import { ExceptionService } from "@src/core/services/exception.service"

@Injectable()
export class PostOrderCreateGuard extends AuthGuard("post-order-create") {
    constructor(private readonly exceptionService: ExceptionService) {
        super()
    }
    
    public handleRequest(error: unknown, user: any, info: unknown) {
        if(error) {
            throw error
        }
        else {
            if(info) {
                throw this.exceptionService.getUnauthorizedException("Invalid access token was provided")
            }
            else {
                if(user) {
                    return user
                }
                else {
                    throw this.exceptionService.getNotFoundException("User was not found")
                }
            }
        }
    }
}