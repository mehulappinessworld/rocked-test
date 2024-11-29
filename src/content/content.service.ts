import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto, GetContentFilterDto, OrderBYContent, SortBy, UpdateContentDto } from './dto/create-content.dto';
import { PrismaServise } from 'src/database/prisma.service';
import { ResponseType } from 'src/domain/helper';
import { Prisma } from "@prisma/client"

@Injectable()
export class ContentService {
  constructor(private readonly prismaServise: PrismaServise) { }
  async create(createContentDto: CreateContentDto) {
    try {
      const content = await this.prismaServise.content.create({
        data: {
          ...createContentDto,
          tags: {
            connectOrCreate: createContentDto?.tags?.map((tag) => ({
              where: { name: tag },
              create: { name: tag }
            }))
          }
        }
      })
      return {
        status: ResponseType.SUCCESS,
        data: content,
        mesage: "Content Updated"
      }
    } catch (err) {
      throw err
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
        ...(query.title ? {
          title: {
            contains: query.title,
          }
        } : {}),
        ...(query.status ? {
          status: query.status
        } : {}),
      }

      //date filter
      if (query.strat_date && query.end_date) {
        where.publish_date = {
          gte: new Date(query.strat_date),
          lte: new Date(query.end_date)
        }
      }
      // let publish_date: any = {}
      // if (query.end_date) {
      //   publish_date = {
      //     ...publish_date,
      //     lte: new Date(query.end_date)
      //   }
      // }
      // if (Object.keys(publish_date)?.length > 0) {
      //   where.publish_date = publish_date
      // }
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
      const data = await this.prismaServise.content.findMany({
        where: where,
        include: {
          tags: true,
        },
        orderBy: orderBy,
        take: limit,
        skip: offset
      });
      return {
        status: ResponseType.SUCCESS,
        data: data,
        message: "Data Get Done"
      }
    } catch (err) {
      throw err
    }
  }
  async findOne(id: number) {
    try {
      const check = await this.prismaServise.content.findUnique({
        where: {
          id: +id
        },
        include: {
          tags: true,
        },
      });
      if (check) {
        return check
      } else {
        throw new NotFoundException('Content not Found')
      }
    } catch (err) {
      throw err
    }
  }
  async allWatched(id: number) {
    try {
      const check = await this.prismaServise.content.findUnique({
        where: {
          id: +id
        },
        select: {
          UsersContentWatch: {
            select: {
              user: {
                select: {
                  email: true
                }
              }
            }
          }
        }
      });
      if (check) {
        return {
          emails: (check).UsersContentWatch?.map((data) => data.user.email)
        }
      } else {
        throw new NotFoundException('Content not Found')
      }
    } catch (err) {
      throw err
    }
  }
  async update(id: number, updateContentDto: UpdateContentDto) {
    try {
      const check = await this.prismaServise.content.findUnique({
        where: {
          id: +id
        }
      });
      if (updateContentDto.status) {
        if (check.status == updateContentDto.status) {
          throw new NotFoundException(`Content Already in ${updateContentDto.status} Sattus`)
        }
      }
      if (check) {
        await this.prismaServise.content.update({
          where: {
            id: +id
          },
          data: {
            ...updateContentDto,
            ...(updateContentDto?.tags?.length > 0 ? {
              tags: {
                connectOrCreate: updateContentDto?.tags?.map((tag) => ({
                  where: { name: tag },
                  create: { name: tag }
                }))
              }
            } : {})
          }
        });
        return {
          status: ResponseType.SUCCESS,
          mesage: "Content Updated"
        }
      } else {
        throw new NotFoundException('Content not Found')
      }
    } catch (err) {
      throw err
    }
  }
  async remove(id: number) {
    try {
      const check = await this.prismaServise.content.findUnique({
        where: {
          id: +id
        }
      });
      if (check) {
        const dleeted = await this.prismaServise.content.delete({
          where: {
            id: +id
          }
        });
        return dleeted
      } else {
        throw new NotFoundException('Content not Found')
      }
    } catch (err) {
      throw err
    }
  }
}
