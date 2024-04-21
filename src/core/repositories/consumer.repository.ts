import { Injectable } from "@nestjs/common"

import { PrismaService } from "@src/core/services/prisma.service"

@Injectable()
export class ConsumerRepository {
    constructor(private readonly prismaService: PrismaService) {}

    public async createByName(name: string) {
        return await this.prismaService.consumer.create({ 
            data: { 
                name: name
            }
        })
    }

    public async findUniqueById(id: string) {
        return await this.prismaService.consumer.findUnique({
            where: {
                id: id
            }
        })
    }
}