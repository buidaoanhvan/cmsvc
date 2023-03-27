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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { HasPermissions } from 'src/auth/has-permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @HasPermissions('C_BRAND')
  @UseGuards(PermissionsGuard)
  async create(@Body() createBrandDto: CreateBrandDto) {
    const result = await this.brandService.create(createBrandDto);
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
  @HasPermissions('R_BRAND')
  @UseGuards(PermissionsGuard)
  async findAll() {
    const result = await this.brandService.findAll();
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

  @Patch(':id')
  @HasPermissions('U_BRAND')
  @UseGuards(PermissionsGuard)
  async update(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    const result = await this.brandService.update(+id, updateBrandDto);
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

  @Delete(':id')
  @HasPermissions('D_BRAND')
  @UseGuards(PermissionsGuard)
  async remove(@Param('id') id: number) {
    const result = await this.brandService.remove(+id);
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
}
