import { Injectable } from '@nestjs/common';
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

  update(id: string, value: string): Promise<Data> {
    const data = new Data();
    data.id = id;
    data.value = value;
    return this.dataRepository.save(data);
  }
}
