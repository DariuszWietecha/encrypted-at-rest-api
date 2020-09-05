import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    DataModule,
  ],
})
export class AppModule {}
