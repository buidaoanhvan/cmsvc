import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateRolePermissionDto {
  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsArray()
  // @IsNumber({}, { each: true })
  listPermission: number[];
}
