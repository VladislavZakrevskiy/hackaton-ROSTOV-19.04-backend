import { ServerExceptionInterface } from "@src/common/interfaces/server-exception.interface"
import { ExceptionStatusEnum } from "@src/common/enums/exception-status.enum"
import { BaseExceptionClass } from "@src/common/classes/base-exception.class"

export class ServerExceptionClass extends BaseExceptionClass {
    constructor(response: ServerExceptionInterface, status: ExceptionStatusEnum) {
        super(response, status)
    }
}