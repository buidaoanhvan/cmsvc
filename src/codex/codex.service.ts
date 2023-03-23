import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCodexDto } from './dto/create-codex.dto';
import { UpdateCodexDto } from './dto/update-codex.dto';
import * as XLSX from 'xlsx';
import { parse } from 'fast-csv';
import { createReadStream } from 'fs';

interface ExcelRow {
  codex: string;
}
@Injectable()
export class CodexService {
  // [x: string]: any;
  constructor(private prisma: PrismaService) { }

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

  // async import(file: Express.Multer.File, voucherId: number) {
  //   const workbook = XLSX.read(file.buffer, { type: 'buffer' });
  //   const batchSize = 200000;

  //   const sheet = workbook.Sheets[workbook.SheetNames[0]];
  //   const rows: ExcelRow[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //   for (let i = 1; i < rows.length; i += batchSize) {
  //     const batch = rows.slice(i, i + batchSize);
  //     const data = batch.map((row) => {

  //       return {
  //         codex: row[0],
  //         status: 1,
  //         voucher_id: voucherId
  //       };
  //     });

  //     await this.prisma.codex.createMany({
  //       data,
  //       skipDuplicates: true,
  //     });
  //   }
  // }

  async countOfCode() {
    console.log("count")
    const result = await this.prisma.codex.aggregate({
      where: { is_used: 0 },
      _count: true
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: ' không thành công!',
      };
    }
  }

  async download(codeInt: number, voucher: number) {

    const result = await this.prisma.codex.findMany({
      where: {
        is_used: 0,
        voucher_id: voucher
      },
      take: codeInt,
      select: { codex: true, id: true }
    });


    // If there are not enough unused codexes with that voucher ID, return an error message
    if (!result || result.length < codeInt) {
      return {
        success: true,
        code: 200,
        message: 'không đủ code!',
      }
    }
    console.log(result);
    // Mark the codexes as used
    const codexIds = result.map((codex) => codex.id);
    await this.prisma.codex.updateMany({
      where: { id: { in: codexIds } },
      data: { is_used: 1 }
    });

    // Return a success message and the downloaded codexes
    return {
      success: true,
      code: 200,
      message: 'xuất code thành công!',
      data: result,
    }
  }


  async importCsv(data: string) {
    const rows = data.split('\n').slice(1);
    const codexData = rows.map((row) => {
      const [ codex] = row.split(',');
      return {  codex };
    });

    const createdCodexes = await this.prisma.codex.createMany({
      data: codexData,
    });

    return { createdCodexes };
  }
}


