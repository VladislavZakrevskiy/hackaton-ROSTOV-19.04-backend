import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common"

import { GetTokenRefreshMiddleware } from "@src/core/middlewares/get-token-refresh.middleware"
import { GetTokenRefreshStrategy } from "@src/core/strategies/get-token-refresh.strategy"
import { SessionRepository } from "@src/core/repositories/session.repository"
import { TokenController } from "@src/core/controllers/token.controller"
import { UserRepository } from "@src/core/repositories/user.repository"
import { TokenService } from "@src/core/services/token.service"

@Module({
    controllers: [
        TokenController
    ],
    providers: [
        GetTokenRefreshStrategy,
        SessionRepository, 
        UserRepository,
        TokenService
    ]
})
export class TokenModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(GetTokenRefreshMiddleware).forRoutes({ 
            method: RequestMethod.GET, 
            path: "/token/refresh" 
        })
    }
}