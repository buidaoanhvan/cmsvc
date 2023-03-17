import { PartialType } from '@nestjs/swagger';
import { CreateCodexDto } from './create-codex.dto';

export class UpdateCodexDto extends PartialType(CreateCodexDto) {}
