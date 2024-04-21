import { UseInterceptors, UseFilters, Controller, HttpCode, UseGuards, Post, Req } from "@nestjs/common"
import { ApiTags, ApiBody, ApiSecurity } from "@nestjs/swagger"

import { BaseExceptionInterceptor } from "@core/interceptors/base-exception.interceptor"
import { BaseResponseInterceptor } from "@core/interceptors/base-response.interceptor"
import { PostConsumerCreateSchema } from "@common/schemas/post-consumer-create.schema"
import { PostConsumerCreateBodyDto } from "@common/dtos/post-consumer-create.dto"
import { PostConsumerCreateGuard } from "@core/guards/post-consumer.guard"
import { ClientExceptionFilter } from "@core/filters/client-exception.filter"
import { ServerExceptionFilter } from "@core/filters/server-exception.filter"
import { BaseExceptionFilter } from "@core/filters/base-exception.filter"
import { UserRoleDecorator } from "@common/decorators/user-role.decorator"
import { ResponseStatusEnum } from "@common/enums/response-status.enum"
import { ConsumerService } from "@core/services/consumer.service"
import { UserRoleGuard } from "@common/guards/user-role.guard"
import { UserRoleEnum } from "@common/enums/user-role.enum"

@ApiTags("Consumer")
@UseFilters(BaseExceptionFilter, ClientExceptionFilter, ServerExceptionFilter)
@UseInterceptors(BaseResponseInterceptor, BaseExceptionInterceptor)
@Controller("/consumer")
export class ConsumerController {
    constructor(private readonly consumerService: ConsumerService) {}

    @ApiSecurity("access")
    @ApiBody({ type: PostConsumerCreateBodyDto })
    @UseGuards(PostConsumerCreateGuard, UserRoleGuard)
    @UserRoleDecorator(UserRoleEnum.ADMIN)
    @Post("/create")
    @HttpCode(ResponseStatusEnum.CREATED)
    public async postPonsumerCreate(@Req() request: PostConsumerCreateSchema) {
        return await this.consumerService.postconsumerCreate(request)
    }
}