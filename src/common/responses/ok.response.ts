import { ClientResponseClass } from "@src/common/classes/client-response.class"
import { ResponseStatusEnum } from "@src/common/enums/response-status.enum"

export class OkResponse extends ClientResponseClass {
    constructor(message: ResponseMessageType, data?: ResponseDataType) {
        super({ message: message, status: ResponseStatusEnum.OK, data: data }, ResponseStatusEnum.OK)
    }
}