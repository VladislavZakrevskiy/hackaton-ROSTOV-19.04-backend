import * as express from "express"
import * as zod from "zod"

export interface PostOrderCreateSchema extends express.Request {
    body: {
        consumer_id: string
        positions: Array<{ product_id: string, quantity: number }>
    }
}

export const PostOrderCreateSchema = zod.object({
    body: zod.object({
        consumer_id: zod.string({ 
            invalid_type_error: "ConsumerId field must be a string", 
            required_error: "ConsumerId field is required" 
        }),
        positions: zod.array(
            zod.object({
                product_id: zod.string({ 
                    invalid_type_error: "ProductId field must be a string", 
                    required_error: "ProductId field is required" 
                }),
                quantity: zod.number({ 
                    invalid_type_error: "Quantity field must be a number", 
                    required_error: "Quantity field is required" 
                })
            })
        )
    })
})