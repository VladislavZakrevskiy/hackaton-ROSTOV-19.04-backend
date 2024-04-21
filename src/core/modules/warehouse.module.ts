import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common"

import { PostWarehouseCreateMiddleware } from "@core/middlewares/post-warehouse-create.middleware"
import { PostWarehouseCreateStrategy } from "@core/strategies/post-warehouse-create.strategy"
import { WarehouseRepository } from "@core/repositories/warehouse.repository"
import { WarehouseController } from "@core/controllers/warehouse.controller"
import { SessionRepository } from "@core/repositories/session.repository"
import { WarehouseService } from "@core/services/warehouse.service"
import { UserRepository } from "@core/repositories/user.repository"

@Module({
    controllers: [
        WarehouseController
    ],
    providers: [
        PostWarehouseCreateStrategy,
        WarehouseRepository,
        SessionRepository, 
        WarehouseService,
        UserRepository
    ]
})
export class WarehouseModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PostWarehouseCreateMiddleware).forRoutes({ 
            method: RequestMethod.POST, 
            path: "/warehouse/create" 
        })
    }
}