import { Test, TestingModule } from '@nestjs/testing';
import { FotoServiciosResolver } from './foto-servicios.resolver';
import { FotoServiciosService } from './foto-servicios.service';

describe('FotoServiciosResolver', () => {
  let resolver: FotoServiciosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FotoServiciosResolver, FotoServiciosService],
    }).compile();

    resolver = module.get<FotoServiciosResolver>(FotoServiciosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
