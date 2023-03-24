import { IsNotEmpty } from 'class-validator';

export class CreateSegmentDto {
  user_id: number;
  status: number;
  @IsNotEmpty()
  voucher_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  amount: number;
}
