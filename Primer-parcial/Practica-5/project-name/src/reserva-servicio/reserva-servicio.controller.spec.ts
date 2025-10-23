import { Test, TestingModule } from '@nestjs/testing';
import { ReservaServicioController } from './reserva-servicio.controller';
import { ReservaServicioService } from './reserva-servicio.service';

describe('ReservaServicioController', () => {
  let controller: ReservaServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservaServicioController],
      providers: [ReservaServicioService],
    }).compile();

    controller = module.get<ReservaServicioController>(ReservaServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
