import { Request } from 'express';

export const mockDataRepository = jest.fn(() => ({
  save: jest.fn((data) => ({
    id: 'testId',
    value: 'U2FsdGVkX19EfAwVXVTfK6pn/6tZdvKIW6ZLfHKaitA='
  })),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn(() => ({
      take: jest.fn(() => ({
        getMany: jest.fn(() => ([
          {
            id: 'testId',
            value: 'U2FsdGVkX19EfAwVXVTfK6pn/6tZdvKIW6ZLfHKaitA='
          }
        ]))
      }))
    }))
  }))
}));

export const mockLogsRepository = jest.fn(() => ({
  insert: jest.fn()
}));

export const mockRequest = {
  get: jest.fn(() => '123.123.12.12')
} as unknown as Request;