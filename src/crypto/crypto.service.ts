import { Injectable } from '@nestjs/common';
import { DataDto } from '../data/dto/data.dto';
// tslint:disable-next-line:no-var-requires
const CryptoJS = require('crypto-js');

@Injectable()
export class CryptoService {
  encrypt(dataDto: DataDto): string {
    return CryptoJS.AES.encrypt(JSON.stringify(dataDto.value), dataDto.encryption_key).toString();
  }

  decrypt(value: string, decryptionKey: string): object {
    const bytes = CryptoJS.AES.decrypt(value, decryptionKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}