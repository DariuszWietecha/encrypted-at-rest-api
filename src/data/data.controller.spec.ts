import { DataController } from './data.controller';
import { CryptoService } from '../crypto/crypto.service';
import { Data } from './data.entity';
import { DataService } from './data.service';
import { Log } from '../logs/log.entity';
import { LogsService } from '../logs/logs.service';
import { mockDataRepository, mockLogsRepository } from './mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DataController', () => {
  let dataController: DataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        mockDataRepository,
        mockLogsRepository,
      ],
      controllers: [DataController],
      providers: [
        CryptoService,
        DataService,
        {
          provide: getRepositoryToken(Data),
          useValue: mockDataRepository(),
        },
        LogsService,
        {
          provide: getRepositoryToken(Log),
          useValue: mockLogsRepository(),
        },
      ]
    }).compile();

    dataController = module.get<DataController>(DataController);
  });

  describe('getById', () => {
    it('success', async () => {
      const result = await dataController.getById('testId', 'qwerqewr12341');
      expect(result).toEqual([{
        id: 'testId',
        value: { "test": "test" },
      }]);
    });

    it('Decryption Error', async () => {
      const result = await dataController.getById('testId', 'qwerqewr1234');
      expect(result).toEqual([]);
    });
  });

  it('update', async () => {
    const result = await dataController.update(
      'testId',
      {
        "encryption_key": "qwerqewr12341",
        "value": {
          "test": "test"
        }
      },
    );
    expect(result.id).toEqual('testId');
    expect(result.value).toEqual("U2FsdGVkX19EfAwVXVTfK6pn/6tZdvKIW6ZLfHKaitA=");
  });
});
