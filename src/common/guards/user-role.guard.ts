import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

import { ExceptionService } from "@core/services/exception.service"
import { UserRoleEnum } from "@common/enums/user-role.enum"

@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(private readonly exceptionService: ExceptionService, private readonly reflector: Reflector) {}   

    public canActivate(context: ExecutionContext) {
        const roles = this.reflector.getAllAndOverride<UserRoleEnum[]>("roles", [context.getHandler(), context.getClass()])

        if(roles) {
            const request = context.switchToHttp().getRequest()

            const result = roles.some((role) => role === request.user.role)

            if(result) {
                return true
            }
            else {
                throw this.exceptionService.getForbiddenException("Not enough rights to execute the request")
            }
        }
        else {
            return true
        }
    }
}
