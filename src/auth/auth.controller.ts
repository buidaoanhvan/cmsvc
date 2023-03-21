import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { Public } from './public.decorator';
// import { PermissionsGuard } from './permissions.guard';
// import { HasPermissions } from './has-permissions.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const result = await this.authService.login(loginAuthDto);

    if (result.success) {
      return {
        code: result.code,
        message: result.message,
        user: result.user,
        accessToken: result.access_token,
      };
    } else {
      return {
        code: result.code,
        message: result.message,
      };
    }
  }

  // @HasPermissions('P_REGISTER')
  // @UseGuards(PermissionsGuard)
  @Public()
  @Post('register')
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
  ): Promise<ApiResponse<any>> {
    const result = await this.authService.register(registerAuthDto);
    if (result.success) {
      return {
        code: result.code,
        message: result.message,
        data: result.data,
      };
    } else {
      return {
        code: result.code,
        message: result.message,
      };
    }
  }

  @Post('user')
  async user(@Req() req: any) {
    const result = await this.authService.user(req.user.id);
    if (result.success) {
      return {
        code: result.code,
        message: result.message,
        data: result.data,
      };
    } else {
      return {
        code: result.code,
        message: result.message,
      };
    }
  }
}
