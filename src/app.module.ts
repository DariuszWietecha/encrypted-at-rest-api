import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './data/data.module';
import { LogsModule } from './logs/logs.module';
import { CryptoService } from './crypto.service';

@Module({
  imports: [
    DataModule,
    LogsModule,
    TypeOrmModule.forRoot(),
  ],
  providers: [
    CryptoService,
]
})
export class AppModule {}
