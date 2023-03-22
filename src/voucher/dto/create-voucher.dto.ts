import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateVoucherDto {
  brandId: number;

  supplierId: number;

  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  image: string;

  status: number;

  @IsNotEmpty()
  @IsNumber()
  discount_value: number;

  @IsNotEmpty()
  @IsNumber()
  discount_type: number;

  @IsNotEmpty()
  @IsNumber()
  max_discount: number;

  @IsNotEmpty()
  @IsDateString()
  start_time: any;

  @IsNotEmpty()
  @IsDateString()
  end_time: any;
}
