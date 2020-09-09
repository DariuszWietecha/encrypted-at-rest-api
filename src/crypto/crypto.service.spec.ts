import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoService,
      ],
    }).compile();

    cryptoService = module.get<CryptoService>(CryptoService);
  });

  it('encrypt', async () => {
    const encryptedData = await cryptoService.encrypt({
      "encryptionKey": "qwerqewr12341",
      "value": {
        "test": "test"
      }
    });
    const decryptedData = await cryptoService.decrypt('U2FsdGVkX19IY8DDU5+j0gfzSoACaWeMygm5GfdF82s=', 'qwerqewr12341');
    expect({
      "test": "test"
    }).toEqual(decryptedData);
  });

  it('decrypt', async () => {
    const result = await cryptoService.decrypt('U2FsdGVkX19IY8DDU5+j0gfzSoACaWeMygm5GfdF82s=', 'qwerqewr12341');
    expect(result).toEqual({
      "test": "test"
    });
  });
});
