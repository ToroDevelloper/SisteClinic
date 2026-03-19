import { Test, TestingModule } from '@nestjs/testing';
import { PaqueteController } from './paquete.controller';
import { PaqueteService } from './paquete.service';

describe('PaqueteController', () => {
  let controller: PaqueteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaqueteController],
      providers: [
        {
          provide: PaqueteService,
          useValue: {
            crearPaquete: jest.fn(),
            liquidarEnvio: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PaqueteController>(PaqueteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
