import { Injectable } from "@nestjs/common"

import { GetTokenRefreshSchema } from "@common/schemas/get-token-refresh.schema"
import { SessionRepository } from "@src/core/repositories/session.repository"
import { FingerprintService } from "@core/services/fingerprint.service"
import { ResponseService } from "@src/core/services/response.service"
import { JwtService } from "@src/core/services/jwt.service"

@Injectable()
export class TokenService {
    constructor(
        private readonly fingerprintService: FingerprintService,
        private readonly sessionRepository: SessionRepository, 
        private readonly responseService: ResponseService, 
        private readonly jwtService: JwtService
    ) {}

    public async getTokenRefresh(request: GetTokenRefreshSchema) {
        const fingerprint = await this.fingerprintService.getFingerprint(request)

        const refresh = await this.jwtService.signRefreshToken({ id: request.user.id })
        const access = await this.jwtService.signAccessToken({ id: request.user.id })

        const session = await this.sessionRepository.upsertByUserAndAccessAndRefreshAndFingerprint(request.user, access, refresh, fingerprint)

        return this.responseService.getOkResponse("Here is refreshed pair of tokens", {
            refresh: refresh,
            access: access
        })
    }
}