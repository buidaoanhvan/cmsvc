import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HasPermissions } from 'src/auth/has-permissions.decorator';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { CodexService } from './codex.service';
import { CreateCodexDto } from './dto/create-codex.dto';
import { UpdateCodexDto } from './dto/update-codex.dto';
import * as XLSX from 'xlsx';



@Controller('codex')
export class CodexController {
  constructor(private readonly codexService: CodexService) { }

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
  async update(@Param('id') id: string, @Body() updateCodexDto: UpdateCodexDto) {
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



  // TEST IMPORT 2
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile() file: Express.Multer.File) {
    try {
      await this.codexService.import(file);
      return {
        statusCode: 200,
        message: "codex impoprt thành công!",
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error,
      };
    }

  }
}
