import { Test, TestingModule } from '@nestjs/testing';
import { ServicioUbicacionController } from './servicio-ubicacion.controller';
import { ServicioUbicacionService } from './servicio-ubicacion.service';

describe('ServicioUbicacionController', () => {
  let controller: ServicioUbicacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicioUbicacionController],
      providers: [ServicioUbicacionService],
    }).compile();

    controller = module.get<ServicioUbicacionController>(ServicioUbicacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
