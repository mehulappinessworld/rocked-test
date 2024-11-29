import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content/content.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ContentModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
