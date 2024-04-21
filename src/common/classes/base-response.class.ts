import { BaseResponseInterface } from "@src/common/interfaces/base-response.interface"
import { ResponseStatusEnum } from "@src/common/enums/response-status.enum"

export class BaseResponseClass {
    constructor(private readonly response: BaseResponseInterface, private readonly status: ResponseStatusEnum) {}

    public getResponse() {
        return this.response
    }

    public getStatus() {
        return this.status
    }
}