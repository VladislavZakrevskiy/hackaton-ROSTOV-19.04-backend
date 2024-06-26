import { Injectable } from "@nestjs/common"

import { PrismaService } from "@src/core/services/prisma.service"

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    public async createByLoginAndPassword(login: string, password: string) {
        return await this.prismaService.user.create({ 
            data: { 
                password: password, 
                login: login 
            }
        })
    }

    public async findUniqueByLogin(login: string) {
        return await this.prismaService.user.findUnique({ 
            where: {
                login: login 
            }
        })
    }

    public async findUniqueById(id: string) {
        return await this.prismaService.user.findUnique({ 
            where: {
                id: id
            }
        })
    }
}