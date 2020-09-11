import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './data/data.module';
import { LogsModule } from './logs/logs.module';
import { CryptoService } from './crypto/crypto.service';
import { CryptoModule } from './crypto/crypto.module';
import { join } from 'path';

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
          'type': 'postgres',
          'host': configService.get('DATABASE_HOST'),
          'port': configService.get('DATABASE_PORT'),
          'username': configService.get('DATABASE_USER'),
          'database': configService.get('DATABASE_NAME'),
          'autoLoadEntities': true,
          'synchronize': true,
          'ssl': {
            'rejectUnauthorized': false,
          },
        };
      },
      inject: [ConfigService],
    }),
    CryptoModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'documentation'),
    }),
  ],
  providers: [
    CryptoService,
  ]
})
export class AppModule { }
