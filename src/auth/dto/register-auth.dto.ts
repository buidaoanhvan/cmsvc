import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  role_id: number;
}
