import { Injectable } from '@nestjs/common';
import { DataDto } from '../data/dto/data.dto';
// tslint:disable-next-line:no-var-requires
const CryptoJS = require('crypto-js');

@Injectable()
export class CryptoService {
  encrypt(encryptionKey: string, value: object): string {
    // TODO: Serialization and encryption is a heavy computing task,
    // threatening DOS-type attacks - a solution: limiting the size of
    // the entrance object, transferring encryption to worker threads.
    return CryptoJS.AES.encrypt(JSON.stringify(value), encryptionKey).toString();
  }

  decrypt(value: string, decryptionKey: string): object {
    const bytes = CryptoJS.AES.decrypt(value, decryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}