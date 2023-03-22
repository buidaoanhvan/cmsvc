import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto) {
    createSupplierDto.status = 1;
    const result = await this.prisma.supplier.create({
      data: createSupplierDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Thêm đối tác thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Thêm đối tác không thành công!',
      };
    }
  }

  async findAll() {
    const result = await this.prisma.supplier.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
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
    return `This action returns a #${id} supplier`;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const result = await this.prisma.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Sửa supplier thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Sửa supplier không thành công!',
      };
    }
  }

  async remove(id: number) {
    const result = await this.prisma.supplier.delete({
      where: { id },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Xóa supplier thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Xóa supplier không thành công!',
      };
    }
  }
}
