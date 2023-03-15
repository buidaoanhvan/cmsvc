import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello() {
    const user = await this.prisma.user.findMany();
    return user;
  }
}
