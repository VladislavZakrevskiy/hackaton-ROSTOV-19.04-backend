import { AuthGuard } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

import { ExceptionService } from "@src/core/services/exception.service"

@Injectable()
export class PostAuthLoginGuard extends AuthGuard("post-auth-login") {
    constructor(private readonly exceptionService: ExceptionService) {
        super()
    }
    
    public handleRequest(error: unknown, user: any, info: unknown) {
        if(error) {
            throw error
        }
        else {
            if(info) {
                
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