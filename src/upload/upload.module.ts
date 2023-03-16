import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [MulterModule.register({ dest: 'public/' })],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
