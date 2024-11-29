import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { AllContentDto, CreateContentDto, GetContentFilterDto, UpdateContentDto } from './dto/create-content.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Admin-Content")
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) { }

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  findAll(@Query() query: GetContentFilterDto) {
    return this.contentService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentService.remove(+id);
  }

  @Get('allWatched/:id')
  allWatched(@Param('id') id: number, @Query() email: AllContentDto) {
    return this.contentService.allWatched(+id, email);
  }

}
