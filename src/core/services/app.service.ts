import { Injectable } from "@nestjs/common"

import { ResponseService } from "@core/services/response.service"

@Injectable()
export class AppService {
    constructor(private readonly responseService: ResponseService) {}

    public async getAppIndex() {
        return this.responseService.getOkResponse("Hello World")
    }
}