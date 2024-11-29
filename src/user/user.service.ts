import { Injectable, NotFoundException } from '@nestjs/common';
import { GetContentFilterDto, WatchUserDto } from './dto/create-user.dto';
import { PrismaServise } from 'src/database/prisma.service';
import { ResponseType } from 'src/domain/helper';
import { ContentStatus, Prisma } from '@prisma/client';

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

  async findAll(query: GetContentFilterDto) {
    try {
      //pagination
      const limit = +query.limit || 3;
      const page = +query.page || 1;
      const offset = ((page - 1) * limit)

      //filter
      const where: Prisma.ContentWhereInput = {
        UsersContentWatch: {
          every: {
            user: {
              email: query.email
            }
          }
        },
        status: ContentStatus.PUBLISHED,
        ...(query.title ? {
          title: {
            contains: query.title
          }
        } : {})
      }

      //date filter
      if (query.strat_date && query.end_date) {
        where.publish_date = {
          gte: new Date(query.strat_date),
          lte: new Date(query.end_date)
        }
      }
      const data = await this.prismaServise.content.findMany({
        where: where,
        include: {
          UsersContentWatch: true
        },
        take: limit,
        skip: offset
      });
      return {
        status: ResponseType.SUCCESS,
        data: data,
        message: "Data Get Done"
      }
    } catch (err) {
      throw new err
    }
  }

}
