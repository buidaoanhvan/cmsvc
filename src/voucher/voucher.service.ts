import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const moment = require('moment-timezone');
@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  async create(createVoucherDto: CreateVoucherDto) {
    try {
      createVoucherDto.status = 1;
      const {
        brandId,
        supplierId,
        title,
        description,
        image,
        status,
        discount_value,
        discount_type,
        max_discount,
        start_time,
        end_time,
      } = createVoucherDto;

      const result = await this.prisma.voucher.create({
        data: {
          title,
          description,
          image,
          status,
          discount_type,
          discount_value,
          max_discount,
          start_time,
          end_time,
          brand: brandId
            ? { connect: { id: brandId } }
            : { connect: undefined },
          supplier: supplierId
            ? { connect: { id: supplierId } }
            : { connect: undefined },
        },
      });
      if (result) {
        return {
          success: true,
          code: 200,
          message: 'Thêm voucher thành công!',
          data: result,
        };
      } else {
        return {
          success: false,
          code: 400,
          message: 'Thêm voucher không thành công!',
        };
      }
    } catch (error) {
      switch (error.code) {
        case 'P2025':
          return {
            success: false,
            code: 400,
            message: 'Đối tác thương hiệu không hợp lệ!',
          };
        default:
          console.log(error);
          return {
            success: false,
            code: 400,
            message: 'Lỗi không xác định!',
          };
      }
    }
  }

  async findAll() {
    const result = await this.prisma.voucher.findMany({
      include: {
        _count: {
          select: {
            codex: { where: { segment_id: null } },
          },
        },
      },
    });
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
    return `This action returns a #${id} voucher`;
  }

  async update(id: number, updateVoucherDto: UpdateVoucherDto) {
    try {
      updateVoucherDto.status = 1;
      const {
        brandId,
        supplierId,
        title,
        description,
        image,
        status,
        discount_value,
        discount_type,
        max_discount,
        start_time,
        end_time,
      } = updateVoucherDto;

      const result = await this.prisma.voucher.update({
        where: { id: id },
        data: {
          title,
          description,
          image,
          status,
          discount_type,
          discount_value,
          max_discount,
          start_time,
          end_time,
          brand: brandId
            ? { connect: { id: brandId } }
            : { connect: undefined },
          supplier: supplierId
            ? { connect: { id: supplierId } }
            : { connect: undefined },
        },
      });
      if (result) {
        return {
          success: true,
          code: 200,
          message: 'Thêm voucher thành công!',
          data: result,
        };
      } else {
        return {
          success: false,
          code: 400,
          message: 'Thêm voucher không thành công!',
        };
      }
    } catch (error) {
      switch (error.code) {
        case 'P2025':
          return {
            success: false,
            code: 400,
            message: 'Đối tác thương hiệu không hợp lệ!',
          };
        default:
          console.log(error);
          return {
            success: false,
            code: 400,
            message: 'Lỗi không xác định!',
          };
      }
    }
  }

  async remove(id: number) {
    const result = await this.prisma.voucher.delete({
      where: { id },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'xóa voucher thành công!',
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Xóa voucher không thành công!',
      };
    }
  }
}
