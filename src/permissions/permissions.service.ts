import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const result = await this.prisma.permissions.create({
      data: createPermissionDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Thêm Permission thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Thêm Permission không thành công!',
      };
    }
  }

  async findAll() {
    const result = await this.prisma.permissions.findMany({});
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
    return `This action returns a #${id} permission`;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const result = await this.prisma.permissions.update({
      where: { id },
      data: updatePermissionDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Sửa Permission thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Sửa Permission không thành công!',
      };
    }
  }

  async remove(id: number) {
    const result = await this.prisma.permissions.delete({
      where: { id },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Xóa permissions thành công!',
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Xóa permissions không thành công!',
      };
    }
  }
}
