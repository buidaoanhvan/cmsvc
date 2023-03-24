import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSegmentDto } from './dto/create-segment.dto';
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
    const result = await this.prisma.segment.findMany({
      include: {
        voucher: { select: { title: true } },
        user: { select: { email: true, fullname: true } },
      },
      orderBy: { created_at: 'desc' },
    });
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

  async getCsv(id: number, user_id: number) {
    const result = await this.prisma.segment.findFirst({ where: { id } });

    if (result.status == 1 && result.user_id == user_id) {
      const data = await this.prisma.codex.findMany({
        where: { segment_id: result.id },
        select: { codex: true },
      });
      return {
        success: true,
        code: 200,
        message: 'Lấy dữ liệu thành công',
        data: data,
      };
    } else if (result.status == 2) {
      return {
        success: false,
        code: 400,
        message: 'Yêu cầu bị từ chối!',
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Yêu cầu chưa được duyệt!',
      };
    }
  }

  async accept(id: number) {
    try {
      const segment = await this.prisma.segment.findFirst({
        where: { id },
      });

      if (segment.status == 0) {
        const countVoucher = await this.prisma.codex.findMany({
          where: { voucher_id: segment.voucher_id, segment_id: null },
          select: { id: true },
          take: segment.amount,
        });

        if (segment.amount == countVoucher.length) {
          for (let i = 0; i < countVoucher.length; i += 5000) {
            const batch = countVoucher.slice(i, i + 5000);
            const codexIds = batch.map((item) => item.id);
            await this.prisma.codex.updateMany({
              where: { id: { in: codexIds } },
              data: { segment_id: segment.id },
            });
          }

          await this.prisma.segment.update({
            where: { id },
            data: { status: 1 },
          });

          return {
            success: true,
            code: 200,
            message: 'Cập nhật thành công!',
          };
        } else {
          return {
            success: false,
            code: 400,
            message: 'Số lượng voucher không đủ!',
          };
        }
      } else if (segment.status == 2) {
        return {
          success: false,
          code: 400,
          message: 'Yêu cầu đã bị từ chối!',
        };
      } else {
        return {
          success: false,
          code: 400,
          message: 'Yêu cầu đã được duyệt!',
        };
      }
    } catch (error) {
      return {
        success: false,
        code: 400,
        message: 'Không thành công!',
      };
    }
  }

  async deny(id: number) {
    const segment = await this.prisma.segment.findFirst({
      where: { id },
    });

    if (segment.status == 1) {
      return {
        success: false,
        code: 400,
        message: 'Yêu cầu đã được duyệt!',
      };
    } else if (segment.status == 2) {
      return {
        success: false,
        code: 400,
        message: 'Yêu cầu đã được từ chối!',
      };
    } else {
      await this.prisma.segment.update({
        where: { id },
        data: { status: 2 },
      });

      return {
        success: true,
        code: 200,
        message: 'Cập nhật thành công!',
      };
    }
  }
}
