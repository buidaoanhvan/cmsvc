import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: loginAuthDto.email,
        },
      });

      if (user) {
        const passwordMatch = await bcrypt.compare(
          loginAuthDto.password,
          user.password,
        );
        if (loginAuthDto.email === user.email && passwordMatch) {
          const payload = {
            ui: user.id,
            un: user.fullname,
            up: user.phone,
            ur: user.role_id,
            ut: user.status,
          };

          delete user.password;

          return {
            success: true,
            code: 200,
            message: 'Đăng nhập thành công',
            user: user,
            access_token: this.jwtService.sign(payload),
          };
        } else {
          return {
            success: false,
            code: 400,
            message: 'Tài khoản và mật khẩu không đúng.',
          };
        }
      } else {
        return {
          success: false,
          code: 400,
          message: 'Người dùng không tồn tại.',
        };
      }
    } catch (error) {
      return {
        success: false,
        code: 500,
        message: 'Lỗi hệ thống vui lòng thử lại sau.',
      };
    }
  }

  async register(registerAuthDto: RegisterAuthDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: registerAuthDto.email,
        },
      });
      if (!user) {
        registerAuthDto.password = await bcrypt.hash(
          registerAuthDto.password,
          10,
        );
        const userRegister = await this.prisma.user.create({
          data: registerAuthDto,
        });

        delete userRegister.password;
        delete userRegister.status;
        delete userRegister.role_id;

        return {
          success: true,
          code: 200,
          message: 'Tạo tài khoản thành công.',
          data: userRegister,
        };
      } else {
        return {
          success: false,
          code: 400,
          message: 'Địa chỉ email đã tồn tại.',
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        code: 500,
        message: 'Lỗi hệ thống vui lòng thử lại sau',
        data: null,
      };
    }
  }

  async user(id: any) {
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    delete user.password;
    if (user) {
      return {
        success: true,
        code: 200,
        message: 'Người dùng',
        data: user,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Không tìm thấy người dùng',
      };
    }
  }

  async alluser() {
    const user = await this.prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        email: true,
        roles: {},
      },
      orderBy: { created_at: 'desc' },
    });
    if (user) {
      return {
        success: true,
        code: 200,
        message: 'Người dùng',
        data: user,
      };
    } else {
      return {
        success: false,
        code: 400,
        message: 'Không tìm thấy người dùng',
      };
    }
  }
}
