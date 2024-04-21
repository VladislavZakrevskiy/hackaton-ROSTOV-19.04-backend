import { ClientResponseClass } from "@src/common/classes/client-response.class"
import { ResponseStatusEnum } from "@src/common/enums/response-status.enum"

export class CreatedResponse extends ClientResponseClass {
    constructor(message: ResponseMessageType, data?: ResponseDataType) {
        super({ message: message, status: ResponseStatusEnum.CREATED, data: data }, ResponseStatusEnum.CREATED)
    }
}