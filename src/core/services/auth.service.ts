import { Injectable } from "@nestjs/common"

import { PostAuthSignupSchema } from "@common/schemas/post-auth-signup.schema"
import { SessionRepository } from "@src/core/repositories/session.repository"
import { FingerprintService } from "@core/services/fingerprint.service"
import { UserRepository } from "@src/core/repositories/user.repository"
import { ResponseService } from "@src/core/services/response.service"
import { BcryptService } from "@src/core/services/bcrypt.service"
import { JwtService } from "@src/core/services/jwt.service"

@Injectable()
export class AuthService {
    constructor(
        private readonly fingerprintService: FingerprintService,
        private readonly sessionRepository: SessionRepository, 
        private readonly responseService: ResponseService, 
        private readonly userRepository: UserRepository, 
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService
    ) {}

    public async postAuthSignup(request: PostAuthSignupSchema) {
        const fingerprint = await this.fingerprintService.getFingerprint(request)

        const hash = await this.bcryptService.hashDataWithSalt(request.user.password)
        
        const user = await this.userRepository.createByLoginAndPassword(request.user.login, hash)

        const refresh = await this.jwtService.signRefreshToken({ id: user.id })
        const access = await this.jwtService.signAccessToken({ id: user.id })

        const session = await this.sessionRepository.upsertByUserAndAccessAndRefreshAndFingerprint(user, access, refresh, fingerprint)

        return this.responseService.getCreatedResponse("User has successfully signed up", {
            refresh: refresh,
            access: access
        })
    }

    public async postAuthLogin(request: PostAuthSignupSchema) {
        const fingerprint = await this.fingerprintService.getFingerprint(request)
        
        const refresh = await this.jwtService.signRefreshToken({ id: request.user.id })
        const access = await this.jwtService.signAccessToken({ id: request.user.id })

        const session = await this.sessionRepository.upsertByUserAndAccessAndRefreshAndFingerprint(request.user, access, refresh, fingerprint)

        return this.responseService.getOkResponse("User has successfully logged in", {
            refresh: refresh,
            access: access
        })
    }
}