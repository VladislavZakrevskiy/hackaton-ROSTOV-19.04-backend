import { ClientExceptionInterface } from "@src/common/interfaces/client-exception.interface"
import { ExceptionStatusEnum } from "@src/common/enums/exception-status.enum"
import { BaseExceptionClass } from "@src/common/classes/base-exception.class"

export class ClientExceptionClass extends BaseExceptionClass {
    constructor(response: ClientExceptionInterface, status: ExceptionStatusEnum) {
        super(response, status)
    }
}