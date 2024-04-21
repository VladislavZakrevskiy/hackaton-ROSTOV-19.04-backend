import { Global, Module } from "@nestjs/common"

import { ResponseService } from "@src/core/services/response.service"

@Global()
@Module({
    providers: [
        ResponseService
    ],
    exports: [
        ResponseService
    ]
})
export class ResponseModule {}