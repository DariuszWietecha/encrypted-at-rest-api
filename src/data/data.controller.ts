import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { DataDto } from './dto/data.dto';
import { Data } from './data.entity';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) { }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Data[]> {
    return this.dataService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dataDto: DataDto) {
    return this.dataService.update(id, dataDto);
  }
}
