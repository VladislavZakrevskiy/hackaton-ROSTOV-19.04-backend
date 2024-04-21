import { BaseExceptionInterface } from "@src/common/interfaces/base-exception.interface"

export interface ServerExceptionInterface extends BaseExceptionInterface {
    readonly cause?: ExceptionCauseType
}