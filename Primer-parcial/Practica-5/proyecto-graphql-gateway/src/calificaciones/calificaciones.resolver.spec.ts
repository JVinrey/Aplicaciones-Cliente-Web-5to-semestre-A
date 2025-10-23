import { Test, TestingModule } from '@nestjs/testing';
import { CalificacionesResolver } from './calificaciones.resolver';
import { CalificacionesService } from './calificaciones.service';

describe('CalificacionesResolver', () => {
  let resolver: CalificacionesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalificacionesResolver, CalificacionesService],
    }).compile();

    resolver = module.get<CalificacionesResolver>(CalificacionesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
