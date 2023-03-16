import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileExt = extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = join(__dirname, '../..', 'public', fileName);

    return new Promise((resolve, reject) => {
      const stream = createReadStream(file.path);
      const writeStream = createWriteStream(filePath);

      stream.pipe(writeStream);
      writeStream.on('error', (err) => reject(err));
      writeStream.on('finish', () =>
        resolve(`${process.env.APP_URL}/public/${fileName}`),
      );
    });
  }
}
