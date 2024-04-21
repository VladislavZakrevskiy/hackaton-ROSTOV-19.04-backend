import { Injectable } from "@nestjs/common"

import { CreatedResponse } from "@src/common/responses/created.response"
import { OkResponse } from "@src/common/responses/ok.response"

@Injectable()
export class ResponseService {
    public getCreatedResponse(message: ResponseMessageType, data?: ResponseDataType) {
        return new CreatedResponse(message, data)
    }

    public getOkResponse(message: ResponseMessageType, data?: ResponseDataType) {
        return new OkResponse(message, data)
    }
}