import { Injectable } from "@nestjs/common"

import { PrismaService } from "@src/core/services/prisma.service"

@Injectable()
export class WarehouseRepository {
    constructor(private readonly prismaService: PrismaService) {}

    public async createByName(name: string) {
        return await this.prismaService.warehouse.create({ 
            data: { 
                name: name
            }
        })
    }
}