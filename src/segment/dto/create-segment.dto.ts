import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSegmentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  amount: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;
}
