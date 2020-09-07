import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './data/data.module';
import { LogsModule } from './logs/logs.module';
import { CryptoService } from './crypto/crypto.service';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.IGNORE_ENV_FILE as unknown as boolean,
    }),
    DataModule,
    LogsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const passwordObject = configService.get('DATABASE_PASSWORD') ?
          { password: configService.get('DATABASE_PASSWORD') } : {};

        return {
          ...passwordObject,
          "type": "mysql",
          "host": "localhost",
          "port": 3306,
          "username": configService.get('DATABASE_USER'),
          "database": configService.get('DATABASE_NAME'),
          "autoLoadEntities": true,
          "synchronize": true
        }
      },
      inject: [ConfigService],
    }),
    CryptoModule,
  ],
  providers: [
    CryptoService,
  ]
})
export class AppModule { }
