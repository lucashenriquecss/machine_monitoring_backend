import { Test, TestingModule } from '@nestjs/testing';
import { TelimetryGateway } from './telimetry.gateway';
import { TelimetryService } from './telimetry.service';

describe('TelimetryGateway', () => {
  let gateway: TelimetryGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelimetryGateway, TelimetryService],
    }).compile();

    gateway = module.get<TelimetryGateway>(TelimetryGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
