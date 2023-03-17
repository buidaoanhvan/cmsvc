import { Test, TestingModule } from '@nestjs/testing';
import { CodexController } from './codex.controller';
import { CodexService } from './codex.service';

describe('CodexController', () => {
  let controller: CodexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodexController],
      providers: [CodexService],
    }).compile();

    controller = module.get<CodexController>(CodexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
