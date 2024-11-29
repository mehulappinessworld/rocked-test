import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { isDate, IsString } from "class-validator"

export class CreateContentDto {
    @ApiProperty()
    @IsString()
    code: string

    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    @IsString()
    url: string

    @ApiProperty()
    @IsString()
    status: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    publish_date: Date

    @ApiProperty()
    @IsString()
    thumbnail: string

    @ApiProperty()
    @IsString()
    tags: string[]
}
export class UpdateContentDto extends CreateContentDto { }
