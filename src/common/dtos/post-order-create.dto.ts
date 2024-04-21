import { ApiProperty } from "@nestjs/swagger"

export class PostOrderCreateBodyPositionsDto {
    @ApiProperty({ type: String })
    product_id: string

    @ApiProperty({ type: Number })
    quantity: number
}

export class PostOrderCreateBodyDto {
    @ApiProperty({ type: String })
    consumer_id: string

    @ApiProperty({ type: PostOrderCreateBodyPositionsDto, isArray: true })
    positions: Array<PostOrderCreateBodyPositionsDto>
}