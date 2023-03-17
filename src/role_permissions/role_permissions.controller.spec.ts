import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionsController } from './role_permissions.controller';
import { RolePermissionsService } from './role_permissions.service';

describe('RolePermissionsController', () => {
  let controller: RolePermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolePermissionsController],
      providers: [RolePermissionsService],
    }).compile();

    controller = module.get<RolePermissionsController>(
      RolePermissionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
