import { Injectable } from '@nestjs/common';
import { DataDto } from './dto/data.dto';
import { Data } from './data.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Data)
    private dataRepository: Repository<Data>,
  ) { }

  getById(id: string): Promise<Data[]> {
    return this.dataRepository
      .createQueryBuilder("data")
      .where(`id LIKE '${id.replace("*", "%")}'`)
      .getMany();
  }

  update(id: string, dataDto: DataDto): Promise<Data> {
    const data = new Data();
    data.id = id;
    data.value = JSON.stringify(dataDto.value);

    return this.dataRepository.save(data);
  }
}
