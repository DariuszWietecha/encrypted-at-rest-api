import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './data/data.module';
import { LogsModule } from './logs/logs.module';
import { CryptoService } from './crypto/crypto.service';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    DataModule,
    LogsModule,
    TypeOrmModule.forRoot(),
    CryptoModule,
  ],
  providers: [
    CryptoService,
]
})
export class AppModule {}
