import { ApiProperty } from "@nestjs/swagger"

export class PostAuthSignupBodyDto {
    @ApiProperty()
    password: string
    
    @ApiProperty()
    login: string
}