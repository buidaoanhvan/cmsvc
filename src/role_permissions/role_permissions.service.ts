import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRolePermissionDto } from './dto/create-role_permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto';

@Injectable()
export class RolePermissionsService {
  constructor(private prisma: PrismaService) { }

  async create(createRolePermissionDto: CreateRolePermissionDto) {
    const { roleId, listPermission } = createRolePermissionDto;
    const result = listPermission.forEach(async (permissionId) => {
      await this.prisma.role_permissions.create({
        data: {
          roles: {
            connect: { id: roleId },
          },
          permissions: {
            connect: { id: permissionId },
          },
        },
      });
    });

    return {
      success: true,
      code: 200,
      message: 'Thêm Role_Permission thành công!',
      data: result,
    };
    
  }

  async findAll() {
    const result = await this.prisma.role_permissions.findMany({});
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
    return `This action returns a #${id} rolePermission`;
  }

  async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
    const { roleId, listPermission } = updateRolePermissionDto;
    const result = listPermission.forEach(async (permissionId) => {
      await this.prisma.role_permissions.update({
        where: { id },
        data: {
          roles: {
            connect: { id: roleId },
          },
          permissions: {
            connect: { id: permissionId },
          },
        },
      });
    });

    return {
      success: true,
      code: 200,
      message: 'Sửa Role_Permission thành công!',
      data: result,
    };
  }

  async remove(id: number) {
    const result = await this.prisma.role_permissions.delete({
      where: { id },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Xóa role_permissions thành công!',
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Xóa role_permissions không thành công!',
      };
    }
  }
}
