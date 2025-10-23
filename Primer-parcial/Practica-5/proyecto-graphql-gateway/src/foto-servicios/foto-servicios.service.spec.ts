import { Test, TestingModule } from '@nestjs/testing';
import { FotoServiciosService } from './foto-servicios.service';

describe('FotoServiciosService', () => {
  let service: FotoServiciosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoServiciosService],
    }).compile();

    service = module.get<FotoServiciosService>(FotoServiciosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
