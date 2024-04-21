import { ResponseStatusEnum } from "@src/common/enums/response-status.enum"

export interface BaseResponseInterface {
    readonly message: ResponseMessageType
    readonly status: ResponseStatusEnum
}