import { IsNotEmpty } from 'class-validator';

export class CreateCodexDto {
  //  @IsNotEmpty()
  voucherId: number;

  //   @IsNotEmpty()
  segmentId: number;

  codex: string;

  is_used: number;

  phone: string;

  status: number;
}
