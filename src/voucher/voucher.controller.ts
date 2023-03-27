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
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { HasPermissions } from 'src/auth/has-permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  @HasPermissions('C_VOUCHER')
  @UseGuards(PermissionsGuard)
  async create(@Body() createVoucherDto: CreateVoucherDto) {
    const result = await this.voucherService.create(createVoucherDto);
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
  @HasPermissions('R_VOUCHER')
  @UseGuards(PermissionsGuard)
  async findAll() {
    const result = await this.voucherService.findAll();
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
  @HasPermissions('U_VOUCHER')
  @UseGuards(PermissionsGuard)
  async update(
    @Param('id') id: number,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    const result = await this.voucherService.update(+id, updateVoucherDto);
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
  @HasPermissions('D_VOUCHER')
  @UseGuards(PermissionsGuard)
  async remove(@Param('id') id: number) {
    const result = await this.voucherService.remove(+id);
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
}
