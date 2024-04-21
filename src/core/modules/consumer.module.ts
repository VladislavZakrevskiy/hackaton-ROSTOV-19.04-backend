import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common"

import { PostConsumerCreateMiddleware } from "@core/middlewares/post-consumer-create.middleware"
import { PostConsumerCreateStrategy } from "@core/strategies/post-consumer-create.strategy"
import { SessionRepository } from "@core/repositories/session.repository"
import { ConsumerRepository } from "@core/repositories/consumer.repository"
import { ConsumerController } from "@core/controllers/consumer.controller"
import { UserRepository } from "@core/repositories/user.repository"
import { ConsumerService } from "@core/services/consumer.service"

@Module({
    controllers: [
        ConsumerController
    ],
    providers: [
        PostConsumerCreateStrategy,
        ConsumerRepository,
        SessionRepository, 
        ConsumerService,
        UserRepository
    ]
})
export class ConsumerModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PostConsumerCreateMiddleware).forRoutes({ 
            method: RequestMethod.POST, 
            path: "/consumer/create" 
        })
    }
}