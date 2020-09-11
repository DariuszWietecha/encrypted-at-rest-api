import { Injectable } from '@nestjs/common';
import { Log } from './log.entity';
import { Repository, InsertResult } from 'typeorm'
import { InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) { }

  create(type: string, error: string): Promise<InsertResult> {
    const log = new Log(type, error);
    return this.logRepository.insert(log);
  }
}
