import { Injectable } from "@nestjs/common"

import { PostConsumerCreateSchema } from "@common/schemas/post-consumer-create.schema"
import { ConsumerRepository } from "@core/repositories/consumer.repository"
import { ResponseService } from "@core/services/response.service"

@Injectable()
export class ConsumerService {
    constructor(
        private readonly consumerRepository: ConsumerRepository, 
        private readonly responseService: ResponseService
    ) {}

    public async postconsumerCreate(request: PostConsumerCreateSchema) {
        const consumer = await this.consumerRepository.createByName(request.body.name)
        
        return this.responseService.getCreatedResponse("Consumer has successfully created", {
            consumer: consumer
        })
    }
}