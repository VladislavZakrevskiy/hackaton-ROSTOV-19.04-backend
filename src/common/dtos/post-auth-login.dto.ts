import { ApiProperty } from "@nestjs/swagger"

export class PostAuthLoginBodyDto {
    @ApiProperty()
    password: string
    
    @ApiProperty()
    login: string
}