import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common"

import { PostOrderCreateMiddleware } from "@core/middlewares/post-order-create.middleware"
import { PostOrderCreateStrategy } from "@core/strategies/post-order-create.strategy"
import { SessionRepository } from "@core/repositories/session.repository"
import { OrderRepository } from "@core/repositories/order.repository"
import { OrderController } from "@core/controllers/order.controller"
import { UserRepository } from "@core/repositories/user.repository"
import { OrderService } from "@core/services/order.service"

@Module({
    controllers: [
        OrderController
    ],
    providers: [
        PostOrderCreateStrategy,
        OrderRepository,
        SessionRepository, 
        OrderService,
        UserRepository
    ]
})
export class OrderModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PostOrderCreateMiddleware).forRoutes({ 
            method: RequestMethod.POST, 
            path: "/order/create" 
        })
    }
}