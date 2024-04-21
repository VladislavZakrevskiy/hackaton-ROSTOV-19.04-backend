import { ApiProperty } from "@nestjs/swagger"

export class PostWarehouseCreateBodyDto {
    @ApiProperty()
    name: string
}