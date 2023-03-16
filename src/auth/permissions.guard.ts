import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndOverride<any>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );
    const { user } = await context.switchToHttp().getRequest();

    //Kiểm tra có phải ADMIN không
    const admin = await this.prisma.roles.findFirst({ where: { id: user.ur } });
    if (admin.guard_name === 'ADMIN') {
      return true;
    }

    //Lấy ra quyền USER
    const permissions = await this.prisma.role_permissions.findMany({
      where: { role_id: user.ur },
      select: {
        permissions: {
          select: {
            guard_name: true,
          },
        },
      },
    });

    //Kiểm tra quyền
    return permissions.some((per) =>
      per.permissions?.guard_name?.includes(requiredPermissions),
    );
  }
}
