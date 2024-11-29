import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaServise } from 'src/database/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaServise],
})
export class UserModule {}
