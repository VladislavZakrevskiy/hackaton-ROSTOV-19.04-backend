import { Injectable } from "@nestjs/common"

import { UnauthorizedException } from "@src/common/exceptions/unauthorized.exception"
import { BadRequestException } from "@src/common/exceptions/bad-request.exception"
import { ForbiddenException } from "@src/common/exceptions/forbidden.exception"
import { NotFoundException } from "@src/common/exceptions/not-found.exception"
import { ConflictException } from "@src/common/exceptions/conflict.exception"

@Injectable()
export class ExceptionService {
    public getUnauthorizedException(message: ExceptionMessageType) {
        return new UnauthorizedException(message)
    }

    public getBadRequestException(message: ExceptionMessageType) {
        return new BadRequestException(message)
    }

    public getForbiddenException(message: ExceptionMessageType) {
        return new ForbiddenException(message)
    }

    public getNotFoundException(message: ExceptionMessageType) {
        return new NotFoundException(message)
    }

    public getConflictException(message: ExceptionMessageType) {
        return new ConflictException(message)
    }
}