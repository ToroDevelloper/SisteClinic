import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaqueteService } from './paquete.service';
import { Paquete } from '../../Entity/paquete.entity';
import { Envio } from '../../Entity/envio.entity';

describe('PaqueteService', () => {
  let service: PaqueteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaqueteService,
        {
          provide: getRepositoryToken(Paquete),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Envio),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaqueteService>(PaqueteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
