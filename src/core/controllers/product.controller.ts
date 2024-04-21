import { UseInterceptors, UseFilters, Controller, HttpCode, UseGuards, Post, Req } from "@nestjs/common"
import { ApiTags, ApiBody, ApiSecurity } from "@nestjs/swagger"

import { BaseExceptionInterceptor } from "@core/interceptors/base-exception.interceptor"
import { BaseResponseInterceptor } from "@core/interceptors/base-response.interceptor"
import { PostProductCreateSchema } from "@common/schemas/post-product-create.schema"
import { PostProductCreateBodyDto } from "@common/dtos/post-product-create.dto"
import { PostProductCreateGuard } from "@core/guards/post-product-create.guard"
import { ClientExceptionFilter } from "@core/filters/client-exception.filter"
import { ServerExceptionFilter } from "@core/filters/server-exception.filter"
import { BaseExceptionFilter } from "@core/filters/base-exception.filter"
import { UserRoleDecorator } from "@common/decorators/user-role.decorator"
import { ResponseStatusEnum } from "@common/enums/response-status.enum"
import { ProductService } from "@core/services/product.service"
import { UserRoleGuard } from "@common/guards/user-role.guard"
import { UserRoleEnum } from "@common/enums/user-role.enum"

@ApiTags("Product")
@UseFilters(BaseExceptionFilter, ClientExceptionFilter, ServerExceptionFilter)
@UseInterceptors(BaseResponseInterceptor, BaseExceptionInterceptor)
@Controller("/product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiSecurity("access")
    @ApiBody({ type: PostProductCreateBodyDto })
    @UseGuards(PostProductCreateGuard, UserRoleGuard)
    @UserRoleDecorator(UserRoleEnum.ADMIN)
    @Post("/create")
    @HttpCode(ResponseStatusEnum.CREATED)
    public async postProductCreate(@Req() request: PostProductCreateSchema) {
        return await this.productService.postProductCreate(request)
    }
}