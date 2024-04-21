import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

import { Strategy, ExtractJwt } from "passport-jwt"
import { Request } from "express"

import { RefreshPayloadInterface } from "@src/common/interfaces/refresh-payload.interface"
import { SessionRepository } from "@src/core/repositories/session.repository"
import { FingerprintService } from "@src/core/services/fingerprint.service"
import { ExceptionService } from "@src/core/services/exception.service"
import { UserRepository } from "@src/core/repositories/user.repository"

@Injectable()
export class GetTokenRefreshStrategy extends PassportStrategy(Strategy, "get-token-refresh") {
    constructor(
        private readonly fingerprintService: FingerprintService,
        private readonly sessionRepository: SessionRepository,
        private readonly exceptionService: ExceptionService, 
        private readonly userRepository: UserRepository
    ) {
        super({
            passReqToCallback: true,
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: "secret"
        })
    }

    public async validate(request: Request, payload: RefreshPayloadInterface) {
        const user = await this.userRepository.findUniqueById(payload.id)

        if(user) {
            const fingerprint = await this.fingerprintService.getFingerprint(request)

            const session = await this.sessionRepository.findUniqueByUserAndRefreshAndFingerprint(user, request.headers.authorization, fingerprint)

            if(session) {
                return user
            }
            else {
                throw this.exceptionService.getNotFoundException("Session was not found")
            }
        }
        else {
            throw this.exceptionService.getNotFoundException("User was not found")
        }
    }
}