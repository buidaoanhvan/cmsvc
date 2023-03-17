import { PartialType } from '@nestjs/swagger';
import { CreateRolePermissionDto } from './create-role_permission.dto';

export class UpdateRolePermissionDto extends PartialType(
  CreateRolePermissionDto,
) {}
