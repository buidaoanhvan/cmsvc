import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BrandModule } from './brand/brand.module';
<<<<<<< HEAD
import { SupplierModule } from './supplier/supplier.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, BrandModule, SupplierModule, UploadModule, ConfigModule.forRoot()],
=======
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, BrandModule, AuthModule, ConfigModule.forRoot()],
>>>>>>> van
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
