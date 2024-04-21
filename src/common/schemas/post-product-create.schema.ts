import * as express from "express"
import * as zod from "zod"

export interface PostProductCreateSchema extends express.Request {
    body: {
        name: string
    }
}

export const PostProductCreateSchema = zod.object({
    body: zod.object({
        name: zod.string({ 
            invalid_type_error: "Name field must be a string", 
            required_error: "Name field is required" 
        })
    })
})