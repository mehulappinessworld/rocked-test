import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto, UpdateContentDto } from './dto/create-content.dto';
import { PrismaServise } from 'src/database/prisma.service';
import { ResponseType } from 'src/domain/helper';

@Injectable()
export class ContentService {
  constructor(private readonly prismaServise: PrismaServise) { }
  async create(createContentDto: CreateContentDto) {
    try {
      const content = await this.prismaServise.content.create({
        data: createContentDto
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
  async findAll() {
    try {
      return await this.prismaServise.content.findMany();
    } catch (err) {
      throw err
    }
  }
  async findOne(id: number) {
    try {
      const check = await this.prismaServise.content.findUnique({
        where: {
          id: +id
        }
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
      if (check) {
        await this.prismaServise.content.update({
          where: {
            id: +id
          },
          data: updateContentDto
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
