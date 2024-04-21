import { ConfigModule as NestConfigModule } from "@nestjs/config"
import { Global, Module } from "@nestjs/common"

import * as joi from "joi"

import { ConfigService } from "@src/core/services/config.service"

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            validationSchema: joi.object({
                REFRESH_TOKEN_EXPIRES_IN: joi.number().required(),
                REFRESH_TOKEN_ALGORITHM: joi.string().required(),
                ACCESS_TOKEN_EXPIRES_IN: joi.number().required(),
                ACCESS_TOKEN_ALGORITHM: joi.string().required()
            })
        })
    ],
    providers: [
        ConfigService
    ],
    exports: [
        ConfigService
    ]
})
export class ConfigModule {}