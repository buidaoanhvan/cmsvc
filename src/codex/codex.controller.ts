import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HasPermissions } from 'src/auth/has-permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { CodexService } from './codex.service';
import { CreateCodexDto } from './dto/create-codex.dto';
import { UpdateCodexDto } from './dto/update-codex.dto';
import { diskStorage } from 'multer';
import { editFileName } from '../helper/index';
import { Public } from '../auth/public.decorator';
import { v4 as uuidv4 } from 'uuid';
import { createObjectCsvWriter } from 'csv-writer';

@Controller('codex')
export class CodexController {
  constructor(private readonly codexService: CodexService) {}

  @Public()
  @Get('render')
  async render() {
    console.log(process.cwd());
    const csvWriter = createObjectCsvWriter({
      path: process.cwd() + '/abc.csv',
      header: ['code'],
    });

    const data = [];

    for (let index = 0; index < 100000; index++) {
      data.push({ code: uuidv4() });
    }

    csvWriter
      .writeRecords(data) // returns a promise
      .then((output) => {
        console.log(output);
        console.log('...Done');
      });
  }

  @Post()
  @HasPermissions('P_REGISTER')
  @UseGuards(PermissionsGuard)
  async create(@Body() createCodexDto: CreateCodexDto) {
    const result = await this.codexService.create(createCodexDto);
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
    const result = await this.codexService.findAll();
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codexService.findOne(+id);
  }

  @Patch(':id')
  @HasPermissions('P_REGISTER')
  @UseGuards(PermissionsGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCodexDto: UpdateCodexDto,
  ) {
    const result = await this.codexService.update(+id, updateCodexDto);
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
  @HasPermissions('P_REGISTER')
  @UseGuards(PermissionsGuard)
  async remove(@Param('id') id: string) {
    const result = await this.codexService.remove(+id);
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

  @Post('import/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/csv',
        filename: editFileName,
      }),
    }),
  )
  async import(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const countRow = await this.codexService.import(+id, file.path);
      return {
        statusCode: 200,
        message: 'thêm thành công ' + countRow + ' mã voucher.',
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Vui lòng thử lại sau',
      };
    }
  }
}
