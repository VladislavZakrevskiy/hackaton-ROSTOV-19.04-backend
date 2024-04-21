import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { NestFactory } from "@nestjs/core"

import { BaseExceptionInterceptor } from "@core/interceptors/base-exception.interceptor"
import { BaseResponseInterceptor } from "@core/interceptors/base-response.interceptor"
import { ClientExceptionFilter } from "@core/filters/client-exception.filter"
import { ServerExceptionFilter } from "@core/filters/server-exception.filter"
import { BaseExceptionFilter } from "@core/filters/base-exception.filter"
import { AppModule } from "@core/modules/app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: { origin: "http://localhost:3000/", credentials: true } })

    const config = new DocumentBuilder()
    .setTitle("Hackathon API")
    .setDescription("Hackathon API")
    .addSecurity("refresh", { type: "apiKey", name: "authorization", in: "header" })
    .addSecurity("access", { type: "apiKey", name: "authorization", in: "header" })
    .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup("swagger", app, document)

    app.useGlobalFilters(new BaseExceptionFilter(), new ClientExceptionFilter(), new ServerExceptionFilter())

    app.useGlobalInterceptors(new BaseResponseInterceptor(), new BaseExceptionInterceptor())

    await app.listen(8080)
}

bootstrap()