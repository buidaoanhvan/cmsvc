import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [PrismaModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
