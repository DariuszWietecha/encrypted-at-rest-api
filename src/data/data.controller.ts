import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CryptoService } from '../crypto.service';
import { DataDto } from './dto/data.dto';
import { Data } from './data.entity';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService,
    private readonly cryptoService: CryptoService ,
    ) { }

  @Get(':id/:decryption_key')
  async getById(@Param('id') id: string, @Param('decryption_key') decryption_key: string): Promise<Data[]> {
    const res = await this.dataService.getById(id);

    return res.map((item) => ({
      id: item.id,
      value: this.cryptoService.decrypt(item.value, decryption_key),
    }));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: DataDto) {
    return this.dataService.update(id, this.cryptoService.encrypt(dataDto));
  }
}
