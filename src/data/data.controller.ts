import { CryptoService } from '../crypto/crypto.service';
import { DataDto } from './dto/data.dto';
import { Data } from './data.entity';
import { DataService } from './data.service';
import { Request } from 'express';
import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LogsService } from '../logs/logs.service';

@ApiTags('data')
@Controller('data')
export class DataController {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly dataService: DataService,
    private readonly logsService: LogsService,
  ) { }

  @ApiOperation({
    description: 'Get data',
  })
  @ApiParam({
    name: 'id',
    description: `The exact id to query with or using the special wildcard ‘*’ query for a set of records (e.g. id=“engineering-jobs-*”).<br/>
      Id = '*' is not valid.<br/>
      For id with more than one wildcard, the part after the first wildcard won't be considered (e.g. for  id =“engineering-jobs-*-new*” query will use id="engineering-jobs-*")`,
  })
  @Get(':id/:decryptionKey')
  async getById(
    @Req() request: Request,
    @Param('id') id: string,
    @Param('decryptionKey') decryptionKey: string): Promise<Data[]> {
    const decryptedData = [];

    if (id === '*') {
      return decryptedData;
    }
    const data = await this.dataService.getById(id);

    data.forEach((item) => {
      let value;
      // TODO consider utilizing custom exception filter
      try {
        value = this.cryptoService.decrypt(item.value, decryptionKey);
      } catch (error) {
        // TODO: add monitoring and alerts to recognize brute-force attack
        this.logsService.create(
          'Decryption Error',
          `id: ${id}, decryptionKey: ${decryptionKey}, request.Referrer: ${request.get('Referrer')}`);
        return;
      }
      decryptedData.push({
        id: item.id,
        value,
      });
    });

    return decryptedData;
  }

  @ApiParam({
    name: 'encryptionKey',
    description: `To make encryption safe encryptionKey require with minimum 9 characters, with at least one uppercase letter, one lowercase letter, one number and one symbol.<br/>
    The recommended key length is 64 characters.`,
  })
  @Put(':id/:encryptionKey')
  update(
    @Param('id') id: string,
    @Param('encryptionKey') encryptionKey: string,
    @Body() dataDto: DataDto) {
    return this.dataService.update(id, this.cryptoService.encrypt(encryptionKey, dataDto.value));
  }
}
