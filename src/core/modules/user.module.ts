import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common"

import { GetUserProfileMiddleware } from "@src/core/middlewares/get-user-profile.middleware"
import { GetUserProfileStrategy } from "@src/core/strategies/get-user-profile.strategy"
import { SessionRepository } from "@src/core/repositories/session.repository"
import { UserRepository } from "@src/core/repositories/user.repository"
import { UserController } from "@src/core/controllers/user.controller"
import { UserService } from "@src/core/services/user.service"

@Module({
    controllers: [
        UserController
    ],
    providers: [
        GetUserProfileStrategy,
        SessionRepository, 
        UserRepository,
        UserService
    ]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(GetUserProfileMiddleware).forRoutes({ 
            method: RequestMethod.GET, 
            path: "/user/profile" 
        })
    }
}