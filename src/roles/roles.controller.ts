import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { HasPermissions } from 'src/auth/has-permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HasPermissions('ADMIN_USER')
  @UseGuards(PermissionsGuard)
  async create(@Body() createRoleDto: CreateRoleDto) {
    const result = await this.rolesService.create(createRoleDto);
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

  @Get()
  @HasPermissions('ADMIN_USER')
  @UseGuards(PermissionsGuard)
  async findAll() {
    const result = await this.rolesService.findAll();
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

  // @Patch(':id')
  // @HasPermissions('ADMIN_USER')
  // @UseGuards(PermissionsGuard)
  // async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   const result = await this.rolesService.update(+id, updateRoleDto);
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
  // async remove(@Param('id') id: number) {
  //   const result = await this.rolesService.remove(+id);
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
