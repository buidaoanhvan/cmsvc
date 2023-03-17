import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';

@Injectable()
export class SegmentService {
  constructor(private prisma: PrismaService) {}

  async create(createSegmentDto: CreateSegmentDto) {
    const result = await this.prisma.segment.create({
      data: createSegmentDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Thêm segment thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Thêm segment không thành công!',
      };
    }
  }

  async findAll() {
    const result = await this.prisma.segment.findMany({});
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Hiển thị segment thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Hiển thị segemnt không thành công!',
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} segment`;
  }

  async update(id: number, updateSegmentDto: UpdateSegmentDto) {
    const result = await this.prisma.segment.update({
      where: { id },
      data: updateSegmentDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Sửa segment thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Sửa segemnt không thành công!',
      };
    }
  }

  async remove(id: number) {
    const result = await this.prisma.segment.delete({
      where: { id },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Xóa segment thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Xóa segment không thành công!',
      };
    }
  }
}
