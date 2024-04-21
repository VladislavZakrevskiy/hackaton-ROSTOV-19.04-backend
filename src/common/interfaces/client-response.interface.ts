import { BaseResponseInterface } from "@src/common/interfaces/base-response.interface"

export interface ClientResponseInterface extends BaseResponseInterface {
    readonly data?: ResponseDataType
}