import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

import { Strategy, ExtractJwt } from "passport-jwt"
import { Request } from "express"

import { AccessPayloadInterface } from "@src/common/interfaces/access-payload.interface"
import { SessionRepository } from "@src/core/repositories/session.repository"
import { FingerprintService } from "@src/core/services/fingerprint.service"
import { ExceptionService } from "@src/core/services/exception.service"
import { UserRepository } from "@src/core/repositories/user.repository"

@Injectable()
export class GetUserProfileStrategy extends PassportStrategy(Strategy, "get-user-profile") {
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

    public async validate(request: Request, payload: AccessPayloadInterface) {
        const user = await this.userRepository.findUniqueById(payload.id)

        if(user) {
            const fingerprint = await this.fingerprintService.getFingerprint(request)

            const session = await this.sessionRepository.findUniqueByUserAndAccessAndFingerprint(user, request.headers.authorization, fingerprint)

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