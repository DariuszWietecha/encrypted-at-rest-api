import { Module } from '@nestjs/common';
import { Log } from './log.entity';
import { LogsService } from './logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Log]),    
  ],
  providers: [
    LogsService
]
})
export class LogsModule {}
