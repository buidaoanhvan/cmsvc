import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [PrismaModule],
})
export class RolesModule {}
