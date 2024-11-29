import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { PrismaServise } from 'src/database/prisma.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, PrismaServise],
})
export class ContentModule {}
