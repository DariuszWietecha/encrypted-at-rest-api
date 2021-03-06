import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Data } from '../src/data/data.entity';
import { Log } from '../src/logs/log.entity';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const testId1 = 'inputData1';
  const testId2 = 'inputData2';
  const testIdWithWildcard = 'inputData*';
  const key = 'qwerqewr12341*';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('DataModule', () => {
    beforeEach(async () => {
      await getConnection().manager.clear(Data);
      await getConnection().manager.clear(Log);
    });
    afterEach(async () => {
      await getConnection().manager.clear(Data);
      await getConnection().manager.clear(Log);
    });

    it('/data PUT, GET, PUT, GET with *, GET with wrong decryption key, check logs', async () => {
      const inputData1 = {
        'value': {
          'test': 'test'
        }
      };

      const put1Response = await request(app.getHttpServer())
        .put(`/data/${testId1}/${key}`)
        .send(inputData1)
        .expect(200);

      expect(put1Response.body.id).toEqual(testId1);
      expect(put1Response.body.value).toContain('U2FsdGVkX1');

      await request(app.getHttpServer())
        .get(`/data/${testId1}/${key}`)
        .expect(200)
        .expect([{
          id: testId1,
          value: {
            'test': 'test'
          }
        }]);

      await request(app.getHttpServer())
        .put(`/data/${testId2}/${key}`)
        .send(inputData1)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/data/${testIdWithWildcard}/${key}`)
        .expect(200)
        .expect([{
          id: testId1,
          value: {
            'test': 'test'
          }
        },
        {
          id: testId2,
          value: {
            'test': 'test'
          }
        }]);

      await request(app.getHttpServer())
        .get(`/data/${testIdWithWildcard}/qwerqewr1234`)
        .expect(200)
        .expect([]);

      return getConnection().manager.find(Log).then((logs) => {
        expect(logs[0].error).toEqual('id: inputData*, decryptionKey: qwerqewr1234, request.Referrer: undefined');
        expect(logs[0].type).toEqual('Decryption Error');
      });
    });
  });
});
