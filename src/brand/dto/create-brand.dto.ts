import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  logo: string;

  status: number;
}
