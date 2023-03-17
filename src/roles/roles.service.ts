import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const result = await this.prisma.roles.create({
      data: createRoleDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Thêm roles thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Thêm roles không thành công!',
      };
    }
  }

  async findAll() {
    const result = await this.prisma.roles.findMany();
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Không thành công!',
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const result = await this.prisma.roles.update({
      where: { id },
      data: updateRoleDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Sửa roles thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Sửa roles không thành công!',
      };
    }
  }

  async remove(id: number) {
    const result = await this.prisma.roles.delete({
      where: { id },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Xóa roles thành công!',
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Xóa roles không thành công!',
      };
    }
  }
}
