import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RolePermissionsService } from './role_permissions.service';
// import { CreateRolePermissionDto } from './dto/create-role_permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto';
import { HasPermissions } from 'src/auth/has-permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}

  @Post('permissions/:id')
  @HasPermissions('ADMIN_USER')
  @UseGuards(PermissionsGuard)
  async findOne(@Param('id') id: string) {
    const result = await this.rolePermissionsService.findOne(+id);
    if (result.success) {
      return {
        statusCode: result.code,
        message: result.message,
        data: result.data,
      };
    } else {
      return {
        statusCode: result.code,
        message: result.message,
      };
    }
  }

  @Patch()
  @HasPermissions('ADMIN_USER')
  @UseGuards(PermissionsGuard)
  async update(@Body() updateRolePermissionDto: UpdateRolePermissionDto) {
    const result = await this.rolePermissionsService.update(
      updateRolePermissionDto,
    );
    if (result.success) {
      return {
        statusCode: result.code,
        message: result.message,
      };
    } else {
      return {
        statusCode: result.code,
        message: result.message,
      };
    }
  }

  // @Post()
  // @HasPermissions('ADMIN_USER')
  // @UseGuards(PermissionsGuard)
  // async create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
  //   const result = await this.rolePermissionsService.create(
  //     createRolePermissionDto,
  //   );
  //   if (result.success) {
  //     return {
  //       statusCode: result.code,
  //       message: result.message,
  //       data: result.data,
  //     };
  //   } else {
  //     return {
  //       statusCode: result.code,
  //       message: result.message,
  //     };
  //   }
  // }

  // @Get()
  // @HasPermissions('ADMIN_USER')
  // @UseGuards(PermissionsGuard)
  // async findAll() {
  //   const result = await this.rolePermissionsService.findAll();
  //   if (result.success) {
  //     return {
  //       statusCode: result.code,
  //       message: result.message,
  //       data: result.data,
  //     };
  //   } else {
  //     return {
  //       statusCode: result.code,
  //       message: result.message,
  //     };
  //   }
  // }

  // @Delete(':id')
  // @HasPermissions('ADMIN_USER')
  // @UseGuards(PermissionsGuard)
  // async remove(@Param('id') id: string) {
  //   const result = await this.rolePermissionsService.remove(+id);
  //   if (result.success) {
  //     return {
  //       statusCode: result.code,
  //       message: result.message,
  //     };
  //   } else {
  //     return {
  //       statusCode: result.code,
  //       message: result.message,
  //     };
  //   }
  // }
}
