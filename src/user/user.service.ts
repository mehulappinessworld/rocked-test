import { Injectable, NotFoundException } from '@nestjs/common';
import { GetContentFilterDto, WatchUserDto } from './dto/create-user.dto';
import { PrismaServise } from 'src/database/prisma.service';
import { ResponseType } from 'src/domain/helper';
import { ContentStatus, Prisma } from '@prisma/client';
import { OrderBYContent, SortBy } from 'src/content/dto/create-content.dto';

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
      if (checkContent?.status == ContentStatus.DRAFT) {
        throw new NotFoundException("Content is Not Published Yet");
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
      throw err
    }
  }
  async findAll(query: GetContentFilterDto) {
    try {
      //pagination
      const limit = +query.limit || null;
      const page = +query.page || null;
      const offset = (((page || 0) - 1) * limit)

      let tags = query.tags;
      if (typeof query.tags == 'string') {
        tags = [query.tags]
      }
      let orderBy = {};
      let sortBy = query.sortBy || SortBy.ASC;
      if (query.orderBy == OrderBYContent.TITLE) {
        orderBy = {
          title: sortBy
        }
      }
      if (query.orderBy == OrderBYContent.PUBLISH_DATE) {
        orderBy = {
          publish_date: sortBy
        }
      }

      //filter
      const where: Prisma.ContentWhereInput = {
        status: ContentStatus.PUBLISHED,
        ...(query.title ? {
          title: {
            contains: query.title
          }
        } : {}),
        ...(tags?.length > 0 ? {
          tags: {
            some: {
              name: {
                in: tags
              }
            }
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
          UsersContentWatch: {
            where: {
              user: {
                email: query.email
              }
            }
          },
          tags: true
        },
        orderBy: orderBy,
        ...(limit ? {
          take: limit,
          skip: offset
        } : {})
      });
      return {
        status: ResponseType.SUCCESS,
        data: data,
        message: "Data Get Done"
      }
    } catch (err) {
      console.log("err", err)
      throw new err
    }
  }

}
