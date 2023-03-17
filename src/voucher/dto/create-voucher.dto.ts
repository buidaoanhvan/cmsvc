import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import moment from "moment";

export class CreateVoucherDto {
    @IsNotEmpty()
    brandId: number;

    @IsNotEmpty()
    supplierId: number;

    @IsNotEmpty()
    title: string;

    description: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
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
    start_time: Date;

    @IsNotEmpty()
    end_time: Date;
}
