import { Test, TestingModule } from '@nestjs/testing';
import { ComentariosResolver } from './comentarios.resolver';
import { ComentariosService } from './comentarios.service';

describe('ComentariosResolver', () => {
  let resolver: ComentariosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentariosResolver, ComentariosService],
    }).compile();

    resolver = module.get<ComentariosResolver>(ComentariosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
