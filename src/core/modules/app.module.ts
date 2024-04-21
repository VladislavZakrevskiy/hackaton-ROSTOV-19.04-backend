import { Module } from "@nestjs/common"

import { GetAppIndexStrategy } from "@core/strategies/get-app-index.strategy"
import { SessionRepository } from "@core/repositories/session.repository"
import { FingerprintModule } from "@core/modules/fingerprint.module"
import { UserRepository } from "@core/repositories/user.repository"
import { ExceptionModule } from "@core/modules/exception.module"
import { WarehouseModule } from "@core/modules/warehouse.module"
import { AppController } from "@core/controllers/app.controller"
import { ResponseModule } from "@core/modules/response.module"
import { ConsumerModule } from "@core/modules/consumer.module"
import { ProductModule } from "@core/modules/product.module"
import { BcryptModule } from "@core/modules/bcrypt.module"
import { ConfigModule } from "@core/modules/config.module"
import { PrismaModule } from "@core/modules/prisma.module"
import { OrderModule } from "@core/modules/order.module"
import { TokenModule } from "@core/modules/token.module"
import { AppService } from "@core/services/app.service"
import { AuthModule } from "@core/modules/auth.module"
import { UserModule } from "@core/modules/user.module"
import { JwtModule } from "@core/modules/jwt.module"
import { ZodModule } from "@core/modules/zod.module"

@Module({
    imports: [
        FingerprintModule,
        ExceptionModule,
        WarehouseModule,
        ResponseModule,
        ConsumerModule,
        ProductModule,
        BcryptModule,
        ConfigModule,
        PrismaModule,
        OrderModule,
        TokenModule,
        AuthModule,
        UserModule,
        JwtModule,
        ZodModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        GetAppIndexStrategy,
        SessionRepository,
        UserRepository,
        AppService
    ]
})
export class AppModule {}