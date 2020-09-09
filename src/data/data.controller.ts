import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CryptoService } from '../crypto/crypto.service';
import { DataDto } from './dto/data.dto';
import { Data } from './data.entity';
import { DataService } from './data.service';
import { LogsService } from '../logs/logs.service';

@Controller('data')
export class DataController {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly dataService: DataService,
    private readonly logsService: LogsService,
  ) { }

  @Get(':id/:decryptionKey')
  async getById(@Param('id') id: string, @Param('decryptionKey') decryptionKey: string): Promise<Data[]> {
    const data = await this.dataService.getById(id);

    const decryptedData = [];
    data.forEach((item) => {
      let value;
      try {
        value = this.cryptoService.decrypt(item.value, decryptionKey);
      } catch (error) {
        this.logsService.create('Decryption Error', `decryptionKey: ${decryptionKey}`);
        return;
      }
      decryptedData.push({
        id: item.id,
        value,
      })
    });

    return decryptedData;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: DataDto) {
    return this.dataService.update(id, this.cryptoService.encrypt(dataDto));
  }
}
