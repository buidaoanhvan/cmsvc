import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { SegmentService } from './segment.service';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { HasPermissions } from 'src/auth/has-permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Parser } from '@json2csv/plainjs';
import type { Response } from 'express';
@Controller('segment')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post()
  @HasPermissions('C_SEGMENT')
  @UseGuards(PermissionsGuard)
  async create(
    @Body() createSegmentDto: CreateSegmentDto,
    @Request() req: any,
  ) {
    createSegmentDto.user_id = req.user.ui;
    createSegmentDto.status = 0;
    const result = await this.segmentService.create(createSegmentDto);
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
  @HasPermissions('R_SEGMENT')
  @UseGuards(PermissionsGuard)
  async findAll() {
    const result = await this.segmentService.findAll();
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

  @Post('accept/:id')
  @HasPermissions('A_SEGMENT')
  @UseGuards(PermissionsGuard)
  async segmentAccept(@Param('id') id: string) {
    try {
      const result = await this.segmentService.accept(+id);
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
    } catch (error) {
      console.log(error);
    }
  }

  @Post('deny/:id')
  @HasPermissions('A_SEGMENT')
  @UseGuards(PermissionsGuard)
  async segmentDeny(@Param('id') id: string) {
    try {
      const result = await this.segmentService.deny(+id);
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
    } catch (error) {
      console.log(error);
    }
  }

  @Get('csv/:id')
  @Post('deny/:id')
  @HasPermissions('F_SEGMENT')
  async getCsv(
    @Param('id') id: string,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      const result = await this.segmentService.getCsv(+id, req.user.ui);
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(result.data);
      res.header('Content-Type', 'text/csv');
      return res.send(csv);
    } catch (error) {
      console.log(error);
    }
  }
}
