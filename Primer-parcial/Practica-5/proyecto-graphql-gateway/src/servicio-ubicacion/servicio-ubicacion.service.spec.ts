import { Test, TestingModule } from '@nestjs/testing';
import { ServicioUbicacionService } from './servicio-ubicacion.service';

describe('ServicioUbicacionService', () => {
  let service: ServicioUbicacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicioUbicacionService],
    }).compile();

    service = module.get<ServicioUbicacionService>(ServicioUbicacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
