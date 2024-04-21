import { Injectable } from "@nestjs/common"

import { PrismaService } from "@src/core/services/prisma.service"
import { UserEntity } from "@src/common/entities/user.entity"

@Injectable()
export class SessionRepository {
    constructor(private readonly prismaService: PrismaService) {}

    public async upsertByUserAndAccessAndRefreshAndFingerprint(user: UserEntity, access: string, refresh: string, fingerprint: string) {
        return await this.prismaService.session.upsert({
            create: {
                refresh_token: refresh,
                access_token: access,
                fingerprint: fingerprint,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            },
            update: {
                refresh_token: refresh,
                access_token: access
            },
            where: {
                user_id_fingerprint: {
                    fingerprint: fingerprint,
                    user_id: user.id
                }
            }
        })
    }

    public async findUniqueByUserAndRefreshAndFingerprint(user: UserEntity, refresh: string, fingerprint: string) {
        return await this.prismaService.session.findUnique({
            where: {
                refresh_token: refresh,
                fingerprint: fingerprint,
                user: {
                    id: user.id
                }
            }
        })
    }

    public async findUniqueByUserAndAccessAndFingerprint(user: UserEntity, access: string, fingerprint: string) {
        return await this.prismaService.session.findUnique({
            where: {
                access_token: access,
                fingerprint: fingerprint,
                user: {
                    id: user.id
                }
            }
        })
    }
}