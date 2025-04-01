import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDTO } from './dto/create-user.dto';
import { updatePutUserDTO } from './dto/update-put-user.dto';
import { updatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createUserDTO) {
    return await this.prisma.user.create({ data });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findById(id: number) {
    await this.exists(id);
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: updatePutUserDTO) {
    await this.exists(id);
    return await this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async updatePartial(id: number, data: updatePatchUserDTO) {
    await this.exists(id);
    return await this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return await this.prisma.user.delete({ where: { id } });
  }

  async exists(id: number) {
    if ((await this.prisma.user.count({ where: { id } })) == 0) {
      throw new NotFoundException('ID Not found!');
    }
  }
}
