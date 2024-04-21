import { UseInterceptors, UseFilters, Controller, HttpCode, UseGuards, Get } from "@nestjs/common"
import { ApiTags, ApiSecurity } from "@nestjs/swagger"

import { BaseExceptionInterceptor } from "@core/interceptors/base-exception.interceptor"
import { BaseResponseInterceptor } from "@core/interceptors/base-response.interceptor"
import { ClientExceptionFilter } from "@core/filters/client-exception.filter"
import { ServerExceptionFilter } from "@core/filters/server-exception.filter"
import { BaseExceptionFilter } from "@src/core/filters/base-exception.filter"
import { UserRoleDecorator } from "@common/decorators/user-role.decorator"
import { ResponseStatusEnum } from "@common/enums/response-status.enum"
import { GetAppIndexGuard } from "@core/guards/get-app-index.guard"
import { UserRoleGuard } from "@common/guards/user-role.guard"
import { UserRoleEnum } from "@common/enums/user-role.enum"
import { AppService } from "@core/services/app.service"

@ApiTags("App")
@UseFilters(BaseExceptionFilter, ClientExceptionFilter, ServerExceptionFilter)
@UseInterceptors(BaseResponseInterceptor, BaseExceptionInterceptor)
@Controller("/")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiSecurity("access")
    @UseGuards(GetAppIndexGuard, UserRoleGuard)
    @UserRoleDecorator(UserRoleEnum.ADMIN)
    @Get("/")
    @HttpCode(ResponseStatusEnum.OK)
    public async getAppIndex() {
        return await this.appService.getAppIndex()
    }
}