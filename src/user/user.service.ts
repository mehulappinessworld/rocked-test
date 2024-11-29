import { Injectable } from '@nestjs/common';
import { WatchUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  create(watchUserDto: WatchUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

}
