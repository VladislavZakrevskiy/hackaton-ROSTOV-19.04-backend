import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

import { Strategy } from "passport-local"

import { ExceptionService } from "@core/services/exception.service"
import { UserRepository } from "@core/repositories/user.repository"

@Injectable()
export class PostAuthSignupStrategy extends PassportStrategy(Strategy, "post-auth-signup") {
    constructor(
        private readonly exceptionService: ExceptionService, 
        private readonly userRepository: UserRepository
    ) {
        super({
            passwordField: "password",
            usernameField: "login"
        })
    }

    public async validate(login: string, password: string) {
        const user = await this.userRepository.findUniqueByLogin(login)

        if(user) {
            throw this.exceptionService.getConflictException("Login is already taken")
        }
        else {
            const user = {
                password: password,
                login: login
            }

            return user
        }
    }
}