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
    // TODO: constructor for log
    const log = new Log();
    log.type = type;
    log.error = error;
    return this.logRepository.insert(log);
  }
}
