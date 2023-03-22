import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCodexDto } from './dto/create-codex.dto';
import { UpdateCodexDto } from './dto/update-codex.dto';
import * as XLSX from 'xlsx';

interface ExcelRow {
  codex: string;
  is_used: number;
  phone: string;
  status: number;
}
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

  async import(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const batchSize = 1000;

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: ExcelRow[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    for (let i = 1; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const data = batch.map((row) => {
        // console.log(row[0], row.status, row.phone); // Log the values of codex, status, and phone to check if they are null

        return {
          codex: row[0],
          is_used: row[1],
          status: row[2],
        };
      });

      await this.prisma.codex.createMany({
        data,
        skipDuplicates: true,
      });
    }
  }
}
