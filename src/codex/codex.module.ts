import { Module } from '@nestjs/common';
import { CodexService } from './codex.service';
import { CodexController } from './codex.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CodexController],
  providers: [CodexService],
  imports: [PrismaModule],
})
export class CodexModule {}
