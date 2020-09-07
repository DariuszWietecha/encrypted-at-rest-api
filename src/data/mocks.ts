export const mockDataRepository = jest.fn(() => ({
  save: jest.fn((data) => ({
    id: "testId",
    value: "U2FsdGVkX19EfAwVXVTfK6pn/6tZdvKIW6ZLfHKaitA="
  })),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn(() => ({
      getMany: jest.fn(() => ([
        {
          id: "testId",
          value: "U2FsdGVkX19EfAwVXVTfK6pn/6tZdvKIW6ZLfHKaitA="
        }
      ]))
    }))
  }))
}))

export const mockLogsRepository = jest.fn(() => ({
  insert: jest.fn()
}));