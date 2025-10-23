import { Test, TestingModule } from '@nestjs/testing';
import { ProveedoresResolver } from './proveedores.resolver';
import { ProveedoresService } from './proveedores.service';

describe('ProveedoresResolver', () => {
  let resolver: ProveedoresResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProveedoresResolver, ProveedoresService],
    }).compile();

    resolver = module.get<ProveedoresResolver>(ProveedoresResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
