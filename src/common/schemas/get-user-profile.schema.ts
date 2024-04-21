import * as express from "express"
import * as zod from "zod"

export interface GetUserProfileSchema extends express.Request {
    headers: {
        authorization: string
    }
}

export const GetUserProfileSchema = zod.object({
    headers: zod.object({
        authorization: zod.string({
            invalid_type_error: "Authorization header must be a string", 
            required_error: "Authorization header is required" 
        })
    })
})