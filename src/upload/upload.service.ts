import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream, unlinkSync } from 'fs';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileExt = extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = join(__dirname, '../..', 'public', fileName);
    // remove file
    const fileRm = join(__dirname, '../..', file.path);
    return new Promise((resolve, reject) => {
      const stream = createReadStream(file.path);
      const writeStream = createWriteStream(filePath);

      stream.pipe(writeStream);
      writeStream.on('error', (err) => reject(err));

      writeStream.on('finish', async () => {
        resolve(`${process.env.APP_URL}/public/${fileName}`);
        try {
          unlinkSync(fileRm);
        } catch (error) {
          console.log('xóa file thất bại');
        }
      });
    });
  }
}
