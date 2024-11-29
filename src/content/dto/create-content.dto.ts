import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ContentStatus } from "@prisma/client"
import { IsString } from "class-validator"

export enum OrderBYContent {
    TITLE = "title",
    PUBLISH_DATE = "publish_date",
}
export enum SortBy {
    ASC = "asc",
    DESC = "desc"
}
export class PaginationDto {
    @ApiPropertyOptional()
    limit: number
    @ApiPropertyOptional()
    page: number
}

export class GetContentFilterDto extends PaginationDto {
    @ApiPropertyOptional()
    title: string

    @ApiPropertyOptional({})
    status: ContentStatus

    @ApiPropertyOptional()
    strat_date: Date

    @ApiPropertyOptional()
    end_date: Date

    @ApiPropertyOptional({
        default: OrderBYContent.TITLE
    })
    orderBy: OrderBYContent

    @ApiPropertyOptional({
        default: SortBy.ASC
    })
    sortBy: SortBy

}
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

    @ApiProperty({
        default: ContentStatus.DRAFT
    })
    @IsString()
    status: ContentStatus

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    publish_date: Date

    @ApiProperty()
    @IsString()
    thumbnail: string

    @ApiProperty({
        default: ["Tag1", "tag2"]
    })
    tags: string[]
}

export class AllContentDto {
    @ApiPropertyOptional()
    email: string
}
export class UpdateContentDto {
    @ApiPropertyOptional()
    code: string

    @ApiPropertyOptional()
    title: string

    @ApiPropertyOptional()
    url: string

    @ApiPropertyOptional({
        default: ContentStatus.DRAFT
    })
    status: ContentStatus

    @ApiPropertyOptional()
    description: string

    @ApiPropertyOptional()
    publish_date: Date

    @ApiPropertyOptional()
    thumbnail: string

    @ApiPropertyOptional({
        default: {
            list: ["Tag1", "tag2"]
        }
    })
    tags: any

}
