import { Injectable } from "@nestjs/common"

import * as bcrypt from "bcrypt"

@Injectable()
export class BcryptService {
    public async compareDataWithEncrypted(data: string, encrypted: string) {
        return await bcrypt.compare(data, encrypted)
    }

    public async hashDataWithSalt(data: string) {
        return await bcrypt.hash(data, await bcrypt.genSalt())
    }
}