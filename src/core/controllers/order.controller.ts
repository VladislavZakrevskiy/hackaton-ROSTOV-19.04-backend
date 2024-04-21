import { UseInterceptors, UseFilters, Controller, HttpCode, UseGuards, Post, Req } from "@nestjs/common"
import { ApiTags, ApiBody, ApiSecurity } from "@nestjs/swagger"

import { BaseExceptionInterceptor } from "@core/interceptors/base-exception.interceptor"
import { BaseResponseInterceptor } from "@core/interceptors/base-response.interceptor"
import { PostOrderCreateSchema } from "@common/schemas/post-order-create.schema"
import { PostOrderCreateBodyDto } from "@common/dtos/post-order-create.dto"
import { PostOrderCreateGuard } from "@core/guards/post-order-create.guard"
import { ClientExceptionFilter } from "@core/filters/client-exception.filter"
import { ServerExceptionFilter } from "@core/filters/server-exception.filter"
import { BaseExceptionFilter } from "@core/filters/base-exception.filter"
import { UserRoleDecorator } from "@common/decorators/user-role.decorator"
import { ResponseStatusEnum } from "@common/enums/response-status.enum"
import { OrderService } from "@core/services/order.service"
import { UserRoleGuard } from "@common/guards/user-role.guard"
import { UserRoleEnum } from "@common/enums/user-role.enum"

@ApiTags("Order")
@UseFilters(BaseExceptionFilter, ClientExceptionFilter, ServerExceptionFilter)
@UseInterceptors(BaseResponseInterceptor, BaseExceptionInterceptor)
@Controller("/order")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiSecurity("access")
    @ApiBody({ type: PostOrderCreateBodyDto })
    @UseGuards(PostOrderCreateGuard, UserRoleGuard)
    @UserRoleDecorator(UserRoleEnum.ADMIN)
    @Post("/create")
    @HttpCode(ResponseStatusEnum.CREATED)
    public async postOrderCreate(@Req() request: PostOrderCreateSchema) {
        return await this.orderService.postOrderCreate(request)
    }
}