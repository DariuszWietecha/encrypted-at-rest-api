import { Test, TestingModule } from '@nestjs/testing';
import { Data } from './data.entity';
import { DataService } from './data.service';
import { mockDataRepository } from './mocks';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DataService', () => {
  let dataServiceMock: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [mockDataRepository],
      providers: [
        DataService,
        {
          provide: getRepositoryToken(Data),
          useValue: mockDataRepository(),
        }
      ],
    }).compile();

    dataServiceMock = module.get<DataService>(DataService);
});

  it('getById', async () => {
    const result = await dataServiceMock.getById('testId');
    expect(result[0].id).toEqual('testId');
    expect(result[0].value).toEqual("U2FsdGVkX19EfAwVXVTfK6pn/6tZdvKIW6ZLfHKaitA=");
  });

  it('update', async () => {
    const result = await dataServiceMock.update('testId', '{"test": "test"}');
    expect(result.id).toEqual('testId');
    expect(result.value).toEqual("U2FsdGVkX19EfAwVXVTfK6pn/6tZdvKIW6ZLfHKaitA=");
  });
});
