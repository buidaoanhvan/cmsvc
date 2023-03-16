import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports:[PrismaModule]
})
export class BrandModule {}
