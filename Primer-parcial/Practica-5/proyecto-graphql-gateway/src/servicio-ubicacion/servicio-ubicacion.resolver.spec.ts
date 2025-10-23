import { Test, TestingModule } from '@nestjs/testing';
import { ServicioUbicacionResolver } from './servicio-ubicacion.resolver';
import { ServicioUbicacionService } from './servicio-ubicacion.service';

describe('ServicioUbicacionResolver', () => {
  let resolver: ServicioUbicacionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicioUbicacionResolver, ServicioUbicacionService],
    }).compile();

    resolver = module.get<ServicioUbicacionResolver>(ServicioUbicacionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
