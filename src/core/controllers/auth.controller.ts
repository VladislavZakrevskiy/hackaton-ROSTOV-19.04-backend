import { UseInterceptors, UseFilters, Controller, HttpCode, UseGuards, Post, Req } from "@nestjs/common"
import { ApiTags, ApiBody } from "@nestjs/swagger"

import { BaseExceptionInterceptor } from "@core/interceptors/base-exception.interceptor"
import { BaseResponseInterceptor } from "@core/interceptors/base-response.interceptor"
import { PostAuthSignupSchema } from "@common/schemas/post-auth-signup.schema"
import { ClientExceptionFilter } from "@core/filters/client-exception.filter"
import { ServerExceptionFilter } from "@core/filters/server-exception.filter"
import { PostAuthLoginSchema } from "@common/schemas/post-auth-login.schema"
import { PostAuthSignupBodyDto } from "@common/dtos/post-auth-signup.dto"
import { BaseExceptionFilter } from "@core/filters/base-exception.filter"
import { PostAuthSignupGuard } from "@core/guards/post-auth-signup.guard"
import { PostAuthLoginBodyDto } from "@common/dtos/post-auth-login.dto"
import { PostAuthLoginGuard } from "@core/guards/post-auth-login.guard"
import { ResponseStatusEnum } from "@common/enums/response-status.enum"
import { AuthService } from "@core/services/auth.service"

@ApiTags("Auth")
@UseFilters(BaseExceptionFilter, ClientExceptionFilter, ServerExceptionFilter)
@UseInterceptors(BaseResponseInterceptor, BaseExceptionInterceptor)
@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiBody({ type: PostAuthSignupBodyDto })
    @UseGuards(PostAuthSignupGuard)
    @HttpCode(ResponseStatusEnum.CREATED)
    @Post("/signup")
    public async postAuthSignup(@Req() request: PostAuthSignupSchema) {
        return await this.authService.postAuthSignup(request)
    }

    @ApiBody({ type: PostAuthLoginBodyDto })
    @UseGuards(PostAuthLoginGuard)
    @HttpCode(ResponseStatusEnum.OK)
    @Post("/login")
    public async postAuthLogin(@Req() request: PostAuthLoginSchema) {
        return await this.authService.postAuthLogin(request)
    }
}