import { Global, Module } from "@nestjs/common"

import { ZodService } from "@core/services/zod.service"

@Global()
@Module({
    providers: [
        ZodService
    ],
    exports: [
        ZodService
    ]
})
export class ZodModule {}