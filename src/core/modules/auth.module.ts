import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common"

import { PostAuthSignupMiddleware } from "@src/core/middlewares/post-auth-signup.middleware"
import { PostAuthLoginMiddleware } from "@src/core/middlewares/post-auth-login.middleware"
import { PostAuthSignupStrategy } from "@core/strategies/post-auth-signup.strategy"
import { PostAuthLoginStrategy } from "@core/strategies/post-auth-login.strategy"
import { SessionRepository } from "@core/repositories/session.repository"
import { UserRepository } from "@core/repositories/user.repository"
import { AuthController } from "@core/controllers/auth.controller"
import { AuthService } from "@core/services/auth.service"

@Module({
    controllers: [
        AuthController
    ],
    providers: [
        PostAuthSignupStrategy,
        PostAuthLoginStrategy,
        SessionRepository,
        UserRepository,
        AuthService
    ]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PostAuthSignupMiddleware).forRoutes({ 
            method: RequestMethod.POST,
            path: "/auth/signup"
        })
        consumer.apply(PostAuthLoginMiddleware).forRoutes({ 
            method: RequestMethod.POST,
            path: "/auth/login"
        })
    }
}