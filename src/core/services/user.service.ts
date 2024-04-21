import { Injectable } from "@nestjs/common"

import { GetUserProfileSchema } from "@common/schemas/get-user-profile.schema"
import { ResponseService } from "@src/core/services/response.service"

@Injectable()
export class UserService {
    constructor(private readonly responseService: ResponseService) {}

    public async getUserProfile(request: GetUserProfileSchema) {
        return this.responseService.getOkResponse("Here is information about user profile", {
            user: request.user
        })
    }
}