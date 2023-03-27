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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { HasPermissions } from 'src/auth/has-permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // @Post()
  // @HasPermissions('ADMIN_USER')
  // @UseGuards(PermissionsGuard)
  // async create(@Body() createPermissionDto: CreatePermissionDto) {
  //   const result = await this.permissionsService.create(createPermissionDto);
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

  @Get()
  @HasPermissions('ADMIN_USER')
  @UseGuards(PermissionsGuard)
  async findAll() {
    const result = await this.permissionsService.findAll();
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
  // async update(
  //   @Param('id') id: string,
  //   @Body() updatePermissionDto: UpdatePermissionDto,
  // ) {
  //   const result = await this.permissionsService.update(
  //     +id,
  //     updatePermissionDto,
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

  // @Delete(':id')
  // @HasPermissions('ADMIN_USER')
  // @UseGuards(PermissionsGuard)
  // async remove(@Param('id') id: string) {
  //   const result = await this.permissionsService.remove(+id);
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
