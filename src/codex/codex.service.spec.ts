import { Test, TestingModule } from '@nestjs/testing';
import { CodexService } from './codex.service';

describe('CodexService', () => {
  let service: CodexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodexService],
    }).compile();

    service = module.get<CodexService>(CodexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
