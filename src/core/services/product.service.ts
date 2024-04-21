import { Injectable } from "@nestjs/common"

import { PostProductCreateSchema } from "@common/schemas/post-product-create.schema"
import { ProductRepository } from "@core/repositories/product.repository"
import { ResponseService } from "@core/services/response.service"

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository, 
        private readonly responseService: ResponseService
    ) {}

    public async postProductCreate(request: PostProductCreateSchema) {
        const product = await this.productRepository.createByName(request.body.name)
        
        return this.responseService.getCreatedResponse("Product has successfully created", {
            product: product
        })
    }
}