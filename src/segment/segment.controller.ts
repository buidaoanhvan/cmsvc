import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  StreamableFile,
} from '@nestjs/common';
import { SegmentService } from './segment.service';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { HasPermissions } from 'src/auth/has-permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { join } from 'path';
import { createReadStream } from 'fs';
@Controller('segment')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post()
  @HasPermissions('P_REGISTER')
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
  async getCsv(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<StreamableFile> {
    try {
      const result = await this.segmentService.getCsv(+id, req.user.ui);
      const file = await createReadStream(
        join(process.cwd(), '/public/csv/codex-3452.csv'),
      );
      return new StreamableFile(file);
    } catch (error) {
      console.log(error);
    }
  }
}
