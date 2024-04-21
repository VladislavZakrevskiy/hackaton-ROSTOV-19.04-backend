import { ApiProperty } from "@nestjs/swagger"

export class PostConsumerCreateBodyDto {
    @ApiProperty()
    name: string
}