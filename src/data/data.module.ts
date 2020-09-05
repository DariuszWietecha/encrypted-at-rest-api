import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { Data } from './data.entity';
import { DataService } from './data.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  controllers: [DataController],
  providers: [DataService]
})
export class DataModule {}
