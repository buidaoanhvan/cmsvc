import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCodexDto } from './dto/create-codex.dto';
import { UpdateCodexDto } from './dto/update-codex.dto';
import * as fs from 'fs';
import * as csv from 'fast-csv';
@Injectable()
export class CodexService {
  // [x: string]: any;
  constructor(private prisma: PrismaService) {}

  async create(createCodexDto: CreateCodexDto) {
    const { voucherId, segmentId, codex, is_used, phone, status } =
      createCodexDto;

    const result = await this.prisma.codex.create({
      data: {
        segment: { connect: { id: segmentId } },
        voucher: { connect: { id: voucherId } },
        codex,
        is_used,
        phone,
        status,
      },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Thêm codex thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Thêm codex không thành công!',
      };
    }
  }

  async findAll() {
    const result = await this.prisma.codex.findMany();
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
    return `This action returns a #${id} codex`;
  }

  async update(id: number, updateCodexDto: UpdateCodexDto) {
    const { voucherId, segmentId, codex, is_used, phone, status } =
      updateCodexDto;

    const result = await this.prisma.codex.update({
      where: { id },
      data: {
        segment: { connect: { id: segmentId } },
        voucher: { connect: { id: voucherId } },
        codex,
        is_used,
        phone,
        status,
      },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Sửa codex thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Sửa codex không thành công!',
      };
    }
  }

  async remove(id: number) {
    const result = await this.prisma.codex.delete({
      where: { id },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'xóa codex thành công!',
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Xóa codex không thành công!',
      };
    }
  }

  async import(id: number, file: string) {
    const csvData = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .pipe(csv.parse({ headers: true }))
        .on('data', async (row) => {
          row.voucher_id = id;
          csvData.push(row);
        })
        .on('error', reject)
        .on('end', resolve);
    });
    const countRow = await this.prisma.codex.createMany({
      data: csvData,
      skipDuplicates: true,
    });
    return countRow;
  }
}
