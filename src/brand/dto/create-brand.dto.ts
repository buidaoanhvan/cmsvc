import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
    @IsNotEmpty()
    name: string;
    logo: string;
    status: number
}
