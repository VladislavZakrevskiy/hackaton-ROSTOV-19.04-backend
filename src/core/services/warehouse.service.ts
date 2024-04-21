import { Injectable } from "@nestjs/common"

import { PostWarehouseCreateSchema } from "@common/schemas/post-warehouse-create.schema"
import { WarehouseRepository } from "@core/repositories/warehouse.repository"
import { ResponseService } from "@core/services/response.service"

@Injectable()
export class WarehouseService {
    constructor(
        private readonly warehouseRepository: WarehouseRepository, 
        private readonly responseService: ResponseService
    ) {}

    public async postWarehouseCreate(request: PostWarehouseCreateSchema) {
        const warehouse = await this.warehouseRepository.createByName(request.body.name)
        
        return this.responseService.getCreatedResponse("Warehouse has successfully created", {
            warehouse: warehouse
        })
    }
}