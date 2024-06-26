import { ServerExceptionClass } from "@src/common/classes/server-exception.class"
import { ExceptionStatusEnum } from "@src/common/enums/exception-status.enum"

export class InternalServerErrorException extends ServerExceptionClass {
    constructor(message: ExceptionMessageType, cause?: ExceptionCauseType) {
        super({ message: message, status: ExceptionStatusEnum.INTERNAL_SERVER_ERROR, cause: cause }, ExceptionStatusEnum.INTERNAL_SERVER_ERROR)
    }
}