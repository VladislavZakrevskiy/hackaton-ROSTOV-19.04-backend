import { UseInterceptors, UseFilters, Controller, HttpCode, UseGuards, Get, Req } from "@nestjs/common"
import { ApiTags, ApiSecurity } from "@nestjs/swagger"

import { BaseExceptionInterceptor } from "@core/interceptors/base-exception.interceptor"
import { BaseResponseInterceptor } from "@core/interceptors/base-response.interceptor"
import { GetTokenRefreshSchema } from "@common/schemas/get-token-refresh.schema"
import { ClientExceptionFilter } from "@core/filters/client-exception.filter"
import { ServerExceptionFilter } from "@core/filters/server-exception.filter"
import { GetTokenRefreshGuard } from "@core/guards/get-token-refresh.guard"
import { UserRoleDecorator } from "@common/decorators/user-role.decorator"
import { BaseExceptionFilter } from "@core/filters/base-exception.filter"
import { ResponseStatusEnum } from "@common/enums/response-status.enum"
import { UserRoleGuard } from "@common/guards/user-role.guard"
import { TokenService } from "@core/services/token.service"
import { UserRoleEnum } from "@common/enums/user-role.enum"

@ApiTags("Token")
@UseFilters(BaseExceptionFilter, ClientExceptionFilter, ServerExceptionFilter)
@UseInterceptors(BaseResponseInterceptor, BaseExceptionInterceptor)
@Controller("/token")
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @ApiSecurity("refresh")
    @UserRoleDecorator(UserRoleEnum.ADMIN, UserRoleEnum.USER)
    @UseGuards(GetTokenRefreshGuard, UserRoleGuard)
    @HttpCode(ResponseStatusEnum.OK)
    @Get("/refresh")
    public async getTokenRefresh(@Req() request: GetTokenRefreshSchema) {
        return await this.tokenService.getTokenRefresh(request)
    }
}