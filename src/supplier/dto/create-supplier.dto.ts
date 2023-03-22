import { IsNumber, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  status: number;
}
