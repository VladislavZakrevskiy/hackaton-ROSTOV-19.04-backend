import * as express from "express"
import * as zod from "zod"

export interface PostAuthLoginSchema extends express.Request {
    body: {
        password: string
        login: string
    }
}

export const PostAuthLoginSchema = zod.object({
    body: zod.object({
        password: zod.string({ 
            invalid_type_error: "Password field must be a string", 
            required_error: "Password field is required" 
        }),
        login: zod.string({ 
            invalid_type_error: "Login field must be a string", 
            required_error: "Login field is required" 
        })
    })
})