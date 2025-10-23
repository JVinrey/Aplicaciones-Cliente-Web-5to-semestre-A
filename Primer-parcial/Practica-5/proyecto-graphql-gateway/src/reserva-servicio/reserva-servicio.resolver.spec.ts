import { Test, TestingModule } from '@nestjs/testing';
import { ReservaServicioResolver } from './reserva-servicio.resolver';
import { ReservaServicioService } from './reserva-servicio.service';

describe('ReservaServicioResolver', () => {
  let resolver: ReservaServicioResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservaServicioResolver, ReservaServicioService],
    }).compile();

    resolver = module.get<ReservaServicioResolver>(ReservaServicioResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
