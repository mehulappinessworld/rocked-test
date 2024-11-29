import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator"
import { PaginationDto } from "src/content/dto/create-content.dto";

export class WatchUserDto {
    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNumber()
    content_id: number
}


export class GetContentFilterDto extends PaginationDto {
    @ApiPropertyOptional()
    title: string

    @ApiProperty()
    email: string

    @ApiPropertyOptional()
    strat_date: Date

    @ApiPropertyOptional()
    end_date: Date

    @ApiPropertyOptional()
    tags: string

}