import { ConfigService as NestConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"

@Injectable()
export class ConfigService {
    constructor(private readonly nestConfigService: NestConfigService) {}

    public getRefreshTokenExpiresIn() {
        return this.nestConfigService.get("REFRESH_TOKEN_EXPIRES_IN")
    }

    public getRefreshTokenAlgorithm() {
        return this.nestConfigService.get("REFRESH_TOKEN_ALGORITHM")
    }

    public getAccessTokenExpiresIn() {
        return this.nestConfigService.get("ACCESS_TOKEN_EXPIRES_IN")
    }

    public getAccessTokenAlgorithm() {
        return this.nestConfigService.get("ACCESS_TOKEN_ALGORITHM")
    }
}