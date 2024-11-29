import { Injectable, NotFoundException } from '@nestjs/common';
import { WatchUserDto } from './dto/create-user.dto';
import { PrismaServise } from 'src/database/prisma.service';
import { ResponseType } from 'src/domain/helper';
import { ContentStatus } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaServise: PrismaServise) { }
  async create(watchUserDto: WatchUserDto) {
    try {
      const checkContent = await this.prismaServise.content.findUnique({
        where: {
          id: +watchUserDto.content_id
        }
      });
      if (!checkContent) {
        throw new NotFoundException("Content Not Found");
      }
      let checkUser = await this.prismaServise.user.findUnique({
        where: {
          email: watchUserDto.email
        }
      });
      if (!checkUser) {
        checkUser = await this.prismaServise.user.create({
          data: {
            email: watchUserDto?.email
          }
        })
      }
      const checkData = await this.prismaServise.usersContentWatch.findUnique({
        where: {
          userId_contentId: {
            userId: +checkUser?.id,
            contentId: checkContent?.id
          }
        }
      })
      if (checkData) {
        return {
          status: ResponseType.SUCCESS,
          data: checkData,
          message: "Already In Watched List"
        }
      }
      const addedData = await this.prismaServise.usersContentWatch.create({
        data: {
          userId: checkUser?.id,
          contentId: checkContent?.id
        }
      })
      return {
        status: ResponseType.SUCCESS,
        data: addedData,
        message: "Added Into Watched"
      }
    } catch (err) {
      throw new err
    }
  }

  async findAll() {
    try {
      const contents = await this.prismaServise.content.findMany({
        where: {
          status: ContentStatus.PUBLISHED
        }
      });
      return {
        status: ResponseType.SUCCESS,
        data: contents,
        message: "Data Get Done"
      }
    } catch (err) {
      throw new err
    }
  }

}
