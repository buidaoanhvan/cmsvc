import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BrandModule } from './brand/brand.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SupplierModule } from './supplier/supplier.module';
import { UploadModule } from './upload/upload.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SegmentModule } from './segment/segment.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role_permissions/role_permissions.module';
import { CodexModule } from './codex/codex.module';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [
    PrismaModule,
    BrandModule,
    SupplierModule,
    UploadModule,
    AuthModule,
    ConfigModule.forRoot(),
    SegmentModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    CodexModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
