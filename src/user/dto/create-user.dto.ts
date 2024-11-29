import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator"

export class WatchUserDto {
    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNumber()
    content_id: number
}
