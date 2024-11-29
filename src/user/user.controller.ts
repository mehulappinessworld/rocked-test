import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { WatchUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post("watched")
  create(@Body() createContentDto: WatchUserDto) {
    return this.userService.create(createContentDto);
  }

  @Get('content')
  findAll() {
    return this.userService.findAll();
  }

}
