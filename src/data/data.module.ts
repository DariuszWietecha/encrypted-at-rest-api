import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { Data } from './data.entity';
import { DataService } from './data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from '../crypto/crypto.service';
import { Log } from '../logs/log.entity';
import { LogsService } from '../logs/logs.service';

@Module({
  controllers: [DataController],
  imports: [
    TypeOrmModule.forFeature([Data]),
    TypeOrmModule.forFeature([Log]),
  ],
  providers: [
    CryptoService,
    DataService,
    LogsService,
]
})
export class DataModule {}
