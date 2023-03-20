import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    createBrandDto.status = 1;
    const result = await this.prisma.brand.create({
      data: createBrandDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Thêm brand thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Thêm brand không thành công!',
      };
    }
  }

  async findAll() {
    const result = await this.prisma.brand.findMany({
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
    return `This action returns a #${id} brand`;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const result = await this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'Sửa brand thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Sửa brand không thành công!',
      };
    }
  }

  async remove(id: number) {
    const result = await this.prisma.brand.delete({
      where: { id },
    });
    if (result) {
      return {
        success: true,
        code: 200,
        message: 'xóa brand thành công!',
        data: result,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Xóa brand không thành công!',
      };
    }
  }
}
