import { JwtService as NestJwtService } from "@nestjs/jwt"
import { Injectable } from "@nestjs/common"

import { ConfigService } from "@src/core/services/config.service"

@Injectable()
export class JwtService {
    constructor(private readonly nestJwtService: NestJwtService, private readonly configService: ConfigService) {}

    public async signRefreshToken(payload: any) {
        return await this.nestJwtService.signAsync(payload, { 
            expiresIn: await this.configService.getRefreshTokenExpiresIn(),
            algorithm: await this.configService.getRefreshTokenAlgorithm()
        })
    }

    public async signAccessToken(payload: any) {
        return await this.nestJwtService.signAsync(payload, { 
            expiresIn: await this.configService.getAccessTokenExpiresIn(),
            algorithm: await this.configService.getAccessTokenAlgorithm()
        })
    }
}