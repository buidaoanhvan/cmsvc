import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto): Promise<any> {
    return this.prisma.brand.create({
      data: createBrandDto,
    });
  }

  async findAll() {
    const brandAll = await this.prisma.brand.findMany();
    return brandAll;
    // return  `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  remove(id: number) {
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}
