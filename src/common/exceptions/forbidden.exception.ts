import { ClientExceptionClass } from "@src/common/classes/client-exception.class"
import { ExceptionStatusEnum } from "@src/common/enums/exception-status.enum"

export class ForbiddenException extends ClientExceptionClass {
    constructor(message: ExceptionMessageType) {
        super({ message: message, status: ExceptionStatusEnum.FORBIDDEN }, ExceptionStatusEnum.FORBIDDEN)
    }
}