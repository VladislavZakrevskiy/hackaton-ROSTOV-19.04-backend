import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common"

import { PostProductCreateMiddleware } from "@core/middlewares/post-product-create.middleware"
import { PostProductCreateStrategy } from "@core/strategies/post-product-create.strategy"
import { SessionRepository } from "@core/repositories/session.repository"
import { ProductRepository } from "@core/repositories/product.repository"
import { ProductController } from "@core/controllers/product.controller"
import { UserRepository } from "@core/repositories/user.repository"
import { ProductService } from "@core/services/product.service"

@Module({
    controllers: [
        ProductController
    ],
    providers: [
        PostProductCreateStrategy,
        ProductRepository,
        SessionRepository, 
        ProductService,
        UserRepository
    ]
})
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PostProductCreateMiddleware).forRoutes({ 
            method: RequestMethod.POST, 
            path: "/product/create" 
        })
    }
}