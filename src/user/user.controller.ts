import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetContentFilterDto, WatchUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post("watched")
  create(@Body() createContentDto: WatchUserDto) {
    return this.userService.create(createContentDto);
  }

  @Get('content')
  findAll(@Query() query: GetContentFilterDto) {
    return this.userService.findAll(query);
  }

}
