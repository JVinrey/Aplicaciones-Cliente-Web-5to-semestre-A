import { Test, TestingModule } from '@nestjs/testing';
import { FotoServicioService } from './foto-servicio.service';

describe('FotoServicioService', () => {
  let service: FotoServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoServicioService],
    }).compile();

    service = module.get<FotoServicioService>(FotoServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
