import { Test, TestingModule } from '@nestjs/testing';
import { TelimetryService } from './telimetry.service';

describe('TelimetryService', () => {
  let service: TelimetryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelimetryService],
    }).compile();

    service = module.get<TelimetryService>(TelimetryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
