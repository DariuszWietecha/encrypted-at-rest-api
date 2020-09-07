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
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "database": "nestjs-aes-crypto",
      "autoLoadEntities": true,
      "synchronize": true
    }),
    CryptoModule,
  ],
  providers: [
    CryptoService,
  ]
})
export class AppModule { }
