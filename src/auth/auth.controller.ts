import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { Public } from './public.decorator';
import { PermissionsGuard } from './permissions.guard';
import { HasPermissions } from './has-permissions.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @HasPermissions('P_REGISTER')
  @UseGuards(PermissionsGuard)
  @Post('register')
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
  ): Promise<ApiResponse<any>> {
    const result = await this.authService.register(registerAuthDto);
    if (result.success) {
      return {
        statusCode: result.code,
        message: result.message,
        data: result.data,
      };
    } else {
      return {
        statusCode: result.code,
        message: result.message,
      };
    }
  }
}
