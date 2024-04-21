import { Injectable } from "@nestjs/common"

import { PrismaService } from "@core/services/prisma.service"

@Injectable()
export class PositionRepository {
    constructor(private readonly prismaService: PrismaService) {}
}