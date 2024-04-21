import { Injectable } from "@nestjs/common"

import { PrismaService } from "@core/services/prisma.service"

@Injectable()
export class OrderRepository {
    constructor(private readonly prismaService: PrismaService) {}

    public async createByConsumerIdAndPositions(consumer_id: string, positions: Array<{ product_id: string, quantity: number }>) {
        return await this.prismaService.order.create({
            data: {
                consumer: {
                    connect: {
                        id: consumer_id
                    }
                },
                positions: {
                    create: positions
                }
            }
        })
    }
}