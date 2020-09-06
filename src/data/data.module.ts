import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { Data } from './data.entity';
import { DataService } from './data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from '../crypto.service';
import { Log } from '../logs/log.entity';
import { LogsService } from '../logs/logs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Data]),
    TypeOrmModule.forFeature([Log]),    
  ],
  controllers: [DataController],
  providers: [
    CryptoService,
    DataService,
    LogsService,
]
})
export class DataModule {}
