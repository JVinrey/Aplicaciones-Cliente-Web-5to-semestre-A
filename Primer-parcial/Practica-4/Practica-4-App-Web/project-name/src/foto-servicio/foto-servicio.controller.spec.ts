import { Test, TestingModule } from '@nestjs/testing';
import { FotoServicioController } from './foto-servicio.controller';
import { FotoServicioService } from './foto-servicio.service';

describe('FotoServicioController', () => {
  let controller: FotoServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FotoServicioController],
      providers: [FotoServicioService],
    }).compile();

    controller = module.get<FotoServicioController>(FotoServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
