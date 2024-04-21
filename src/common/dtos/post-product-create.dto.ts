import { ApiProperty } from "@nestjs/swagger"

export class PostProductCreateBodyDto {
    @ApiProperty()
    name: string
}