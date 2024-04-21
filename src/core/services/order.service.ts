import { Injectable } from "@nestjs/common"

import { PostOrderCreateSchema } from "@common/schemas/post-order-create.schema"
import { OrderRepository } from "@core/repositories/order.repository"
import { ResponseService } from "@core/services/response.service"

@Injectable()
export class OrderService {
    constructor(
        private readonly responseService: ResponseService,
        private readonly orderRepository: OrderRepository
    ) {}

    public async postOrderCreate(request: PostOrderCreateSchema) {
        const order = await this.orderRepository.createByConsumerIdAndPositions(request.body.consumer_id, request.body.positions)
        
        return this.responseService.getCreatedResponse("Order has successfully created", {
            order: order
        })
    }
}