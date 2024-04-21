import { Injectable } from "@nestjs/common"

import { Request } from "express"
import { Schema } from "zod"

@Injectable()
export class ZodService {
    public async validateDataWithSchema(schema: Schema, data: Request) {
        const result = await schema.safeParseAsync(data)

        if(result.success === true) {
            return null
        }
        else {
            return result.error.issues.map((issue) => issue.message).shift()
        }
    }
}