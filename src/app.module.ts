import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/r2TsTemplate'),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.17.0.3',
      port: 3306,
      username: 'root',
      password: 'P@ssw0rd',
      database: 'ts-template',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
