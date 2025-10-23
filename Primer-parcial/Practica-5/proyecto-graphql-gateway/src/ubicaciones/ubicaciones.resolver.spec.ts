import { Test, TestingModule } from '@nestjs/testing';
import { UbicacionesResolver } from './ubicaciones.resolver';
import { UbicacionesService } from './ubicaciones.service';

describe('UbicacionesResolver', () => {
  let resolver: UbicacionesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UbicacionesResolver, UbicacionesService],
    }).compile();

    resolver = module.get<UbicacionesResolver>(UbicacionesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
