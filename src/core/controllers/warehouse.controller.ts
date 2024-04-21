import { UseInterceptors, UseFilters, Controller, HttpCode, UseGuards, Post, Req } from "@nestjs/common"
import { ApiTags, ApiBody, ApiSecurity } from "@nestjs/swagger"

import { PostWarehouseCreateSchema } from "@common/schemas/post-warehouse-create.schema"
import { BaseExceptionInterceptor } from "@core/interceptors/base-exception.interceptor"
import { BaseResponseInterceptor } from "@core/interceptors/base-response.interceptor"
import { PostWarehouseCreateBodyDto } from "@common/dtos/post-warehouse-create.dto"
import { PostWarehouseCreateGuard } from "@core/guards/post-warehouse-create.guard"
import { ClientExceptionFilter } from "@core/filters/client-exception.filter"
import { ServerExceptionFilter } from "@core/filters/server-exception.filter"
import { UserRoleDecorator } from "@common/decorators/user-role.decorator"
import { BaseExceptionFilter } from "@core/filters/base-exception.filter"
import { ResponseStatusEnum } from "@common/enums/response-status.enum"
import { WarehouseService } from "@core/services/warehouse.service"
import { UserRoleGuard } from "@common/guards/user-role.guard"
import { UserRoleEnum } from "@common/enums/user-role.enum"

@ApiTags("Warehouse")
@UseFilters(BaseExceptionFilter, ClientExceptionFilter, ServerExceptionFilter)
@UseInterceptors(BaseResponseInterceptor, BaseExceptionInterceptor)
@Controller("/warehouse")
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) {}

    @ApiSecurity("access")
    @ApiBody({ type: PostWarehouseCreateBodyDto })
    @UseGuards(PostWarehouseCreateGuard, UserRoleGuard)
    @UserRoleDecorator(UserRoleEnum.ADMIN)
    @Post("/create")
    @HttpCode(ResponseStatusEnum.CREATED)
    public async postWarehouseCreate(@Req() request: PostWarehouseCreateSchema) {
        return await this.warehouseService.postWarehouseCreate(request)
    }
}