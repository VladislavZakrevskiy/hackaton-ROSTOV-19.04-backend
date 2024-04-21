import { UseInterceptors, UseFilters, Controller, HttpCode, UseGuards, Get, Req } from "@nestjs/common"
import { ApiTags, ApiSecurity } from "@nestjs/swagger"

import { BaseExceptionInterceptor } from "@core/interceptors/base-exception.interceptor"
import { BaseResponseInterceptor } from "@core/interceptors/base-response.interceptor"
import { GetUserProfileSchema } from "@common/schemas/get-user-profile.schema"
import { ClientExceptionFilter } from "@core/filters/client-exception.filter"
import { ServerExceptionFilter } from "@core/filters/server-exception.filter"
import { UserRoleDecorator } from "@common/decorators/user-role.decorator"
import { BaseExceptionFilter } from "@core/filters/base-exception.filter"
import { GetUserProfileGuard } from "@core/guards/get-user-profile.guard"
import { ResponseStatusEnum } from "@common/enums/response-status.enum"
import { UserRoleGuard } from "@common/guards/user-role.guard"
import { UserRoleEnum } from "@common/enums/user-role.enum"
import { UserService } from "@core/services/user.service"

@ApiTags("User")
@UseFilters(BaseExceptionFilter, ClientExceptionFilter, ServerExceptionFilter)
@UseInterceptors(BaseResponseInterceptor, BaseExceptionInterceptor)
@Controller("/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiSecurity("access")
    @UserRoleDecorator(UserRoleEnum.ADMIN, UserRoleEnum.USER)
    @UseGuards(GetUserProfileGuard, UserRoleGuard)
    @HttpCode(ResponseStatusEnum.OK)
    @Get("/profile")
    public async getUserProfile(@Req() request: GetUserProfileSchema) {
        return await this.userService.getUserProfile(request)
    }
}