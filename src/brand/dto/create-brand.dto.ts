import { IsNumber, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateBrandDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsUrl()
    logo: string;
    
    @IsNotEmpty()
    @IsNumber()
    status: number
}
