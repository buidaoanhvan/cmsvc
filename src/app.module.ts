import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BrandModule } from './brand/brand.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SupplierModule } from './supplier/supplier.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    PrismaModule,
    BrandModule,
    SupplierModule,
    UploadModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
