import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VoucherController],
  providers: [VoucherService],
  imports:[PrismaModule]
})
export class VoucherModule {}
