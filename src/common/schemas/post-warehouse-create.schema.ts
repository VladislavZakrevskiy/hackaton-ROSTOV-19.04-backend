import * as express from "express"
import * as zod from "zod"

export interface PostWarehouseCreateSchema extends express.Request {
    body: {
        name: string
    }
}

export const PostWarehouseCreateSchema = zod.object({
    body: zod.object({
        name: zod.string({ 
            invalid_type_error: "Name field must be a string", 
            required_error: "Name field is required" 
        })
    })
})