import { IsNotEmpty } from "class-validator";

export class CreateCodexDto {
  //  @IsNotEmpty()
    voucherId: number;

 //   @IsNotEmpty()
    segmentId: number;

    @IsNotEmpty()
    codex: string;

    @IsNotEmpty()
    is_used: number;

    @IsNotEmpty()
    phone: string;
    
    @IsNotEmpty()
    status: number;
}
