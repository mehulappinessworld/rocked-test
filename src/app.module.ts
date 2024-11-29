import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content/content.module';
import { UserModule } from './user/user.module';
import { PrismaServise } from './database/prisma.service';

@Module({
  imports: [ContentModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaServise],
})
export class AppModule {}
