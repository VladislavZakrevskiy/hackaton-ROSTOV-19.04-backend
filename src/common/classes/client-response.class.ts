import { ClientResponseInterface } from "@src/common/interfaces/client-response.interface"
import { ResponseStatusEnum } from "@src/common/enums/response-status.enum"
import { BaseResponseClass } from "@src/common/classes/base-response.class"

export class ClientResponseClass extends BaseResponseClass {
    constructor(response: ClientResponseInterface, status: ResponseStatusEnum) {
        super(response, status)
    }
}