import { Injectable } from '@nestjs/common';
import { DataDto } from './data/dto/data.dto';
const CryptoJS = require('crypto-js');


@Injectable()
export class CryptoService {
  encrypt(dataDto: DataDto): string {
    return CryptoJS.AES.encrypt(JSON.stringify(dataDto.value), dataDto.encryption_key).toString();
  }

  decrypt(value: string, decryption_key: string): string {
    const bytes = CryptoJS.AES.decrypt(value, decryption_key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}