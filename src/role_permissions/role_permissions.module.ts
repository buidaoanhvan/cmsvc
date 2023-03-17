import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role_permissions.service';
import { RolePermissionsController } from './role_permissions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService],
  imports: [PrismaModule],
})
export class RolePermissionsModule {}
